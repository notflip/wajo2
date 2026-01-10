import { NextRequest, NextResponse } from "next/server"
import { verifyRecaptcha } from "@/lib/recaptcha"

export async function POST(request: NextRequest) {
  try {
    console.log("=== API ROUTE: /api/submissions ===")
    const body = await request.json()
    console.log("Request body received:", {
      hasRecaptchaToken: !!body.recaptchaToken,
      recaptchaTokenLength: body.recaptchaToken?.length,
      recaptchaTokenPreview: body.recaptchaToken?.substring(0, 20),
      hasForm: !!body.form,
      formId: body.form,
      hasData: !!body.data,
      dataKeys: body.data ? Object.keys(body.data) : [],
      fullBody: body,
    })

    const { recaptchaToken, form, data } = body

    if (!recaptchaToken) {
      console.error("ERROR: No recaptchaToken in request!")
      return NextResponse.json({ errors: [{ message: "reCAPTCHA token is required" }] }, { status: 400 })
    }

    // Verify reCAPTCHA token
    console.log("Verifying reCAPTCHA token...")
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)
    console.log("reCAPTCHA verification result:", recaptchaResult)

    if (!recaptchaResult.success) {
      console.error("reCAPTCHA verification failed:", recaptchaResult.error)
      return NextResponse.json(
        {
          errors: [{ message: recaptchaResult.error || "reCAPTCHA verification failed" }]
        },
        { status: 400 }
      )
    }

    console.log("reCAPTCHA verified successfully!")

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
