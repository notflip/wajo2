import Link from "next/link"
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"
import { IconType } from "react-icons"

interface IconMapping {
  Icon: IconType
  domain: string
}

const iconMap: IconMapping[] = [
  { domain: "facebook.com", Icon: FaFacebook },
  { domain: "instagram.com", Icon: FaInstagram },
  { domain: "twitter.com", Icon: FaXTwitter },
  { domain: "x.com", Icon: FaXTwitter },
  { domain: "linkedin.com", Icon: FaLinkedin },
  { domain: "youtube.com", Icon: FaYoutube },
  { domain: "tiktok.com", Icon: FaTiktok },
]

const getSocialIcon = (url: string, className: string) => {
  const mapping = iconMap.find(({ domain }) => url.includes(domain))
  const IconComponent = mapping ? mapping.Icon : FaGlobe
  return <IconComponent className={className} />
}

interface SocialMediaIconProps {
  className: string
  url: string
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({
  url,
  className,
}) => (
  <Link
    aria-label="Social link"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {getSocialIcon(url, className)}
  </Link>
)

export default SocialMediaIcon
