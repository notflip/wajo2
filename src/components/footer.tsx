import { getCachedGlobal } from "@/utils/getGlobals"
import { CmsLink } from "./CmsLink"
import Link from "next/link"
import NewsletterForm from "./newsletter-form"
import SocialMediaIcon from "./social-media-icon"

export async function Footer() {
  const siteSettings = await getCachedGlobal("settings")()
  const footer = await getCachedGlobal("footer")()

  return (
    <footer className="pt-[3rem] pb-[3rem]">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {(footer.columns || []).map((column, index) => (
            <div key={index} className="mt-4 lg:mt-0">
              <h2 className="h5 mb-4">{column.title}</h2>
              <ul className="space-y-4">
                {(column.links || []).map(({ link }, index) => (
                  <li key={index}>
                    <CmsLink
                      {...link}
                      type="reference"
                      className="hover:underline"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2 lg:ml-16 mt-4 lg:mt-0">
            <h2 className="h5 mb-4">Blijf op de hoogte</h2>
            <p className="mb-4">
              Meld je aan voor onze nieuwsbrief om op de hoogte te blijven van
              alle nieuwe informatie omtrent Esthetiek Margot.
            </p>

            <NewsletterForm />

            <p className="text-xs mt-2">
              Door je te abonneren ga je akkoord met ons{" "}
              <Link href="/privacy-policy" className="underline">
                Privacybeleid
              </Link>{" "}
              en geef je toestemming om updates van ons bedrijf te ontvangen.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-primary">
          <div className="flex flex-col md:flex-row items-center justify-between pt-8">
            <div className="flex items-center gap-8 text-sm">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} {siteSettings.website_title}
              </p>
              {footer.privacyPolicyLink && (
                <CmsLink
                  label="Privacy Policy"
                  type="reference"
                  reference={footer.privacyPolicyLink}
                />
              )}
              {footer.cookiePolicyLink && (
                <CmsLink
                  label="Cookie Policy"
                  type="reference"
                  reference={footer.cookiePolicyLink}
                />
              )}
              {footer.termsAndConditionsLink && (
                <CmsLink
                  label="Terms and conditions"
                  type="reference"
                  reference={footer.termsAndConditionsLink}
                />
              )}
            </div>

            <div className="flex space-x-4">
              {(siteSettings.social_links || []).map((link, index) => (
                <div className="bg-white p-2 rounded-full" key={index}>
                  <SocialMediaIcon url={link.url} className="text-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
