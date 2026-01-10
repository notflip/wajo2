import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, recaptchaToken } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token is required" }, { status: 400 })
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
          error: "reCAPTCHA verification failed. Please try again.",
          recaptchaError: recaptchaData["error-codes"],
        },
        { status: 400 }
      )
    }

    // Optional: Check the score (for v3, scores range from 0.0 to 1.0)
    if (recaptchaData.score && recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: "Suspicious activity detected. Please try again." },
        { status: 400 }
      )
    }

    // TODO: Add your Mailchimp API integration here
    // For now, just return success
    // Example Mailchimp integration:
    /*
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX // e.g., "us1"

    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.title || "Failed to subscribe" },
        { status: response.status }
      )
    }
    */

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
