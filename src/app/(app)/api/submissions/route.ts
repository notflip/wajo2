import { NextRequest, NextResponse } from "next/server"
import { verifyRecaptcha } from "@/lib/recaptcha"
import { getPayload } from "payload"
import config from "@payload-config"

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

    // Submit to Payload CMS directly
    const payload = await getPayload({ config })

    console.log("Creating submission in Payload...")
    const submission = await payload.create({
      collection: "submissions",
      data: {
        form,
        data,
      },
    })

    console.log("Submission created successfully:", submission.id)
    return NextResponse.json(submission, { status: 200 })
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json(
      { errors: [{ message: "Internal server error" }] },
      { status: 500 }
    )
  }
}
