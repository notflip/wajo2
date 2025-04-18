"use client"

import { useEffect, useState } from "react"

export const EmbedSender: React.FC = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const scriptTag = document.createElement("script")
    scriptTag.src = "https://cdn.sender.net/accounts_resources/universal.js"
    scriptTag.addEventListener("load", () => {
      // 1) Expose the global name constant
      window.Sender = "sender"

      // 2) Stub function: queue up calls until the real script loads
      if (!window.sender) {
        window.sender = function (...args: any[]) {
          ;(window.sender.q = window.sender.q || []).push(args)
        } as any
      }
      window.sender.l = new Date().getTime()

      if (window.sender) {
        window.sender("3ffc32b8041860")
      }
    })
    document.body.appendChild(scriptTag)
  }, [])

  return (
    <div>
      <div className="sender-form-field" data-sender-form-id="m9lcliofelymlr1nuzl"></div>
    </div>
  )
}
