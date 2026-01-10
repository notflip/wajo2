import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recaptchaToken, form, data } = body

    if (!recaptchaToken) {
      return NextResponse.json({ errors: [{ message: "reCAPTCHA token is required" }] }, { status: 400 })
    }

    // Verify reCAPTCHA token with Google
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    )

    const recaptchaData = await recaptchaResponse.json()

    // Check if reCAPTCHA verification was successful
    if (!recaptchaData.success) {
      return NextResponse.json(
        {
          errors: [{ message: "reCAPTCHA verification failed. Please try again." }],
          recaptchaError: recaptchaData["error-codes"]
        },
        { status: 400 }
      )
    }

    // Optional: Check the score (for v3, scores range from 0.0 to 1.0)
    // Lower scores indicate likely bot behavior
    if (recaptchaData.score && recaptchaData.score < 0.5) {
      return NextResponse.json(
        { errors: [{ message: "Suspicious activity detected. Please try again." }] },
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
