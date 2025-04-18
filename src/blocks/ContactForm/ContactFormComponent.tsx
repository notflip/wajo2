import { BlockContainer } from "@/blocks/BlockContainer"
import { ContactForm } from "@/components/contact-form"
import EmbedTally from "@/components/embed-tally"
import { getCachedGlobal } from "@/utils/getGlobals"
import { ContactForm as ContactFormType } from "@payload-types"
import Link from "next/link"
import Script from "next/script"

export const ContactFormComponent: React.FC<ContactFormType> = async (props) => {
  const { script, html } = props

  const siteSettings = await getCachedGlobal("settings")()
  const inlineScript = script
    .replace(/^<script[^>]*>/i, "")
    .replace(/<\/script>$/i, "")
    .trim()

  return (
    <BlockContainer {...props}>
      <div className="lg:flex lg:justify-between gap-32">
        <div className="mt-8 lg:mt-0 lg:w-3/5 order-1 lg:order-2">
          <EmbedTally formId="3l42kW" />
        </div>
        <div className="lg:w-2/5">
          <div className="bg-beige-50 rounded-[16px] p-8">
            <ul className="space-y-8">
              <li>
                <p className="font-medium text-beige-400 text-2xl">Address</p>
                <p className="font-medium text-foreground whitespace-pre">
                  {siteSettings.company_info}
                </p>
              </li>
              {siteSettings.website_emails?.length > 0 && (
                <li>
                  <p className="font-medium text-beige-400 text-2xl">E-mail</p>
                  <p className="font-medium text-foreground whitespace-pre">
                    <Link href={`mailto:${siteSettings.website_emails[0].email}`}>
                      {siteSettings.website_emails[0].email}
                    </Link>
                  </p>
                </li>
              )}
              {siteSettings.website_phone && (
                <li>
                  <p className="font-medium text-beige-400 text-2xl">Telefoon</p>
                  <p className="font-medium text-foreground whitespace-pre">
                    <Link
                      href={`tel:${siteSettings.website_phone.replace(/[^+\d]/g, "")}`}
                    >
                      {siteSettings.website_phone}
                    </Link>
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
