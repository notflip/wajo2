"use client"

import { BlockContainer } from "@/blocks/BlockContainer"
import { SharedBlockProps } from "@/blocks/types"
import { useState } from "react"

interface CalculatorProps {
  title?: string
  description?: string
  bgColor?: string
}

export const CalculatorComponent: React.FC<CalculatorProps & SharedBlockProps> = (props) => {
  const { title, description, bgColor } = props

  // State for form inputs
  const [providers, setProviders] = useState<number>(1)
  const [followupsPerYear, setFollowupsPerYear] = useState<number>(0)
  const [price, setPrice] = useState<number>(75)

  // State for checkboxes
  const [agenda, setAgenda] = useState<boolean>(false)
  const [phone, setPhone] = useState<boolean>(false)
  const [form, setForm] = useState<boolean>(false)
  const [seo, setSeo] = useState<boolean>(false)
  const [ads, setAds] = useState<boolean>(false)
  const [video, setVideo] = useState<boolean>(false)
  const [chatgpt, setChatgpt] = useState<boolean>(false)

  // State for results
  const [showResults, setShowResults] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [results, setResults] = useState<{
    appointments: number
    revenue: number
    breakdown: string
  }>({
    appointments: 0,
    revenue: 0,
    breakdown: "",
  })

  // Formatters
  const LOCALE = "nl-BE"
  const CURRENCY = "EUR"
  const currencyFmt = new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  })
  const priceFmt = new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 2,
  })
  const numberFmt = new Intl.NumberFormat(LOCALE)

  const showError = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(""), 4000)
  }

  const calculateRevenue = () => {
    // Reset UI
    setShowResults(false)
    setErrorMessage("")

    let visitors = providers * 500

    // Extra bezoekers via video
    if (video) visitors += 150

    // Validatie
    if (providers <= 0) {
      showError("Voer een geldig aantal zorgverleners in (minimaal 1)")
      return
    }
    if (price <= 0) {
      showError("Voer een geldige prijs per consultatie in (moet groter zijn dan 0)")
      return
    }

    // Afspraakkanalen (basisconversie)
    let baseConversion = 0
    const selectedChannels: string[] = []
    if (agenda) {
      baseConversion += 5
      selectedChannels.push("Online agenda (5%)")
    }
    if (phone) {
      baseConversion += 3
      selectedChannels.push("Telefonisch (3%)")
    }
    if (form) {
      baseConversion += 2
      selectedChannels.push("Contactformulier (2%)")
    }
    if (baseConversion === 0) {
      showError("Selecteer minimaal één afspraakkanaal")
      return
    }

    // Marketing boost
    let marketingBoost = 0
    const selectedMarketing: string[] = []
    if (seo) {
      marketingBoost += 20
      selectedMarketing.push("SEO (+20%)")
    }
    if (ads) {
      marketingBoost += 15
      selectedMarketing.push("Advertenties (+15%)")
    }
    if (video) {
      marketingBoost += 35
      selectedMarketing.push("Promotievideo (+150 bezoekers +35%)")
    }
    if (chatgpt) {
      marketingBoost += 25
      selectedMarketing.push("ChatGPT (+25%)")
    }

    // Vervolgafspraken per jaar (mag 0) -> maandfactor
    const followupsPerMonthFactor = followupsPerYear / 12

    // Formules
    const effectiveConversion = (baseConversion / 100) * (1 + marketingBoost / 100)
    const firstConsults = Math.round(visitors * effectiveConversion) // nieuwe patiënten/maand
    const followupConsults = Math.round(firstConsults * followupsPerMonthFactor) // maandgemiddelde vervolg
    const totalAppointments = firstConsults + followupConsults
    const totalRevenue = totalAppointments * price

    // Breakdown
    const baseVisitors = providers * 500
    let breakdown = `<strong>Berekeningsoverzicht:</strong><br>`
    breakdown += `Zorgverleners: ${numberFmt.format(providers)}<br>`
    breakdown += video
      ? `Basis bezoekers: ${numberFmt.format(providers)} × 500 + promotievideo = ${numberFmt.format(baseVisitors)} + 150 = ${numberFmt.format(visitors)}<br>`
      : `Basis bezoekers: ${numberFmt.format(providers)} × 500 = ${numberFmt.format(visitors)}<br>`
    breakdown += `Geselecteerde kanalen: ${selectedChannels.join(", ")}<br>`
    breakdown += `Basis conversieratio: ${baseConversion}%<br>`
    if (marketingBoost > 0) {
      breakdown += `Marketing boost: ${selectedMarketing.join(", ")} (totaal +${marketingBoost}%)<br>`
    }
    breakdown += `Effectieve conversieratio: ${(effectiveConversion * 100).toFixed(2)}%<br>`
    breakdown += `Eerste consulten (nieuw): ${numberFmt.format(firstConsults)}<br>`
    breakdown += `Vervolgafspraken/jaar per patiënt: ${numberFmt.format(followupsPerYear)} ⇒ per maand: ${followupsPerMonthFactor.toFixed(3)}×<br>`
    breakdown += `Verwachte vervolgafspraken (maandelijks): ${numberFmt.format(followupConsults)} = ${numberFmt.format(firstConsults)} × ${followupsPerMonthFactor.toFixed(3)}<br>`
    breakdown += `<strong>Totaal maandelijkse afspraken: ${numberFmt.format(firstConsults)} + ${numberFmt.format(followupConsults)} = ${numberFmt.format(totalAppointments)}</strong><br>`
    breakdown += `Prijs per consultatie of ingreep: ${priceFmt.format(price)}`

    setResults({
      appointments: totalAppointments,
      revenue: totalRevenue,
      breakdown,
    })
    setShowResults(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      calculateRevenue()
    }
  }

  const handleNumberInput = (
    value: string,
    setter: (val: number) => void,
    type: "providers" | "followups" | "price",
  ) => {
    let numValue = parseFloat(value) || 0
    if (type === "providers") {
      if (numValue < 1) numValue = 1
      numValue = Math.floor(numValue)
    } else if (type === "followups") {
      if (numValue < 0) numValue = 0
      numValue = Math.floor(numValue)
    } else if (type === "price") {
      if (numValue < 0) numValue = 0
    }
    setter(numValue)
  }

  const CheckboxItem = ({
    id,
    checked,
    onChange,
    label,
    rate,
  }: {
    id: string
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    rate: string
  }) => (
    <div
      className={`flex cursor-pointer items-center rounded-lg border-2 bg-slate-50 p-4 transition-all duration-300 hover:border-blue-500 hover:bg-slate-100 ${
        checked
          ? "border-blue-500 bg-blue-50 shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
          : "border-slate-200"
      }`}
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => {
          e.stopPropagation()
          onChange(e.target.checked)
        }}
        className="mr-3 h-[18px] w-[18px] cursor-pointer"
      />
      <label className="flex-1 cursor-pointer font-medium text-slate-800" htmlFor={id}>
        {label}
      </label>
      <span
        className={`rounded px-2 py-1 text-sm font-semibold ${
          checked ? "bg-blue-500 text-white" : "bg-slate-300 text-slate-600"
        }`}
      >
        {rate}
      </span>
    </div>
  )

  return (
    <div className="lg:mt-4 py-16 lg:bg-blue-500">
      <div className="mx-auto max-w-2xl">
        {/* Calculator Container */}
        <div className="overflow-hidden rounded-[20px] bg-blue-500 px-16 py-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-white/90">{description}</p>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-9 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            {/* Providers Input */}
            <div className="mb-8">
              <label
                htmlFor="providers"
                className="mb-3 block text-base font-semibold text-slate-800"
              >
                Aantal zorgverleners
              </label>
              <input
                type="number"
                id="providers"
                placeholder="bijv. 2"
                min="1"
                step="1"
                value={providers}
                onChange={(e) => handleNumberInput(e.target.value, setProviders, "providers")}
                onKeyDown={handleKeyDown}
                className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 p-4 text-base transition-all duration-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
              />
              <div className="mt-2 text-sm text-slate-600">
                Elke zorgverlener genereert ongeveer 500 websitebezoekers per maand
              </div>
            </div>

            {/* Appointment Channels */}
            <div className="mb-8">
              <div className="mb-4 border-b-2 border-blue-500 pb-2 text-lg font-semibold text-slate-800">
                Afspraakkanalen
              </div>
              <div className="space-y-4">
                <CheckboxItem
                  id="agenda"
                  checked={agenda}
                  onChange={setAgenda}
                  label="Online agenda boekingen"
                  rate="5% conversie"
                />
                <CheckboxItem
                  id="phone"
                  checked={phone}
                  onChange={setPhone}
                  label="Telefonische boekingen"
                  rate="3% conversie"
                />
                <CheckboxItem
                  id="form"
                  checked={form}
                  onChange={setForm}
                  label="Contactformulier aanvragen"
                  rate="2% conversie"
                />
              </div>
            </div>

            {/* Marketing Efforts */}
            <div className="mb-8">
              <div className="mb-4 border-b-2 border-blue-500 pb-2 text-lg font-semibold text-slate-800">
                Marketing inspanningen
              </div>
              <div className="space-y-4">
                <CheckboxItem
                  id="seo"
                  checked={seo}
                  onChange={setSeo}
                  label="Zoekmachine optimalisatie (SEO)"
                  rate="+20% boost"
                />
                <CheckboxItem
                  id="ads"
                  checked={ads}
                  onChange={setAds}
                  label="Online advertenties (Google Ads, Facebook)"
                  rate="+15% boost"
                />
                <CheckboxItem
                  id="video"
                  checked={video}
                  onChange={setVideo}
                  label="Promotievideo"
                  rate="+150 bezoekers +35% boost"
                />
                <CheckboxItem
                  id="chatgpt"
                  checked={chatgpt}
                  onChange={setChatgpt}
                  label="ChatGPT"
                  rate="+25% boost"
                />
              </div>
            </div>

            {/* Follow-up Appointments */}
            <div className="mb-8">
              <label
                htmlFor="followups"
                className="mb-3 block text-base font-semibold text-slate-800"
              >
                Gemiddeld aantal vervolgafspraken per patiënt per jaar
              </label>
              <input
                type="number"
                id="followups"
                value={followupsPerYear}
                min="0"
                step="1"
                onChange={(e) =>
                  handleNumberInput(e.target.value, setFollowupsPerYear, "followups")
                }
                onKeyDown={handleKeyDown}
                className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 p-4 text-base transition-all duration-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
              />
              <div className="mt-2 text-sm text-slate-600">
                Mag 0 zijn. Wordt omgerekend naar een maandgemiddelde (÷ 12).
              </div>
            </div>

            {/* Price per Consultation */}
            <div className="mb-8">
              <label htmlFor="price" className="mb-3 block text-base font-semibold text-slate-800">
                Prijs per consultatie of ingreep (€)
              </label>
              <input
                type="number"
                id="price"
                placeholder="bijv. 75"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => handleNumberInput(e.target.value, setPrice, "price")}
                onKeyDown={handleKeyDown}
                className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 p-4 text-base transition-all duration-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)]"
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateRevenue}
              className="mt-5 w-full rounded-xl bg-green-500 px-6 py-5 text-lg font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Bereken omzetpotentieel
            </button>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-3 rounded border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Results */}
            {showResults && (
              <div className="mt-8 animate-[slideIn_0.5s_ease-out] rounded-2xl bg-green-600 p-6">
                <h3 className="mb-5 text-center text-xl font-bold text-white">
                  📊 Uw omzetpotentieel
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-white/20 p-5 backdrop-blur-sm">
                    <span className="text-base font-semibold text-white">
                      Maandelijkse afspraken:
                    </span>
                    <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      {numberFmt.format(results.appointments)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/20 p-5 backdrop-blur-sm">
                    <span className="text-base font-semibold text-white">Maandelijkse omzet:</span>
                    <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      {currencyFmt.format(results.revenue)}
                    </span>
                  </div>
                </div>
                <div
                  className="mt-4 rounded-lg bg-white/10 p-4 text-sm leading-relaxed text-white/90"
                  dangerouslySetInnerHTML={{ __html: results.breakdown }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
