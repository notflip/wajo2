import { NextRequest, NextResponse } from "next/server"
import { verifyRecaptcha } from "@/lib/recaptcha"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recaptchaToken, form, data } = body

    if (!recaptchaToken) {
      return NextResponse.json({ errors: [{ message: "reCAPTCHA token is required" }] }, { status: 400 })
    }

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)

    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          errors: [{ message: recaptchaResult.error || "reCAPTCHA verification failed" }]
        },
        { status: 400 }
      )
    }

    // Forward the submission to Payload CMS
    const payloadResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form,
          data,
        }),
      }
    )

    const payloadData = await payloadResponse.json()

    if (!payloadResponse.ok) {
      return NextResponse.json(payloadData, { status: payloadResponse.status })
    }

    return NextResponse.json(payloadData, { status: 200 })
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json(
      { errors: [{ message: "Internal server error" }] },
      { status: 500 }
    )
  }
}
