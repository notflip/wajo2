interface RecaptchaVerificationResult {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  "error-codes"?: string[]
}

export async function verifyRecaptcha(token: string): Promise<{
  success: boolean
  score?: number
  error?: string
}> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to verify reCAPTCHA",
      }
    }

    const result: RecaptchaVerificationResult = await response.json()

    console.log("reCAPTCHA verification result:", {
      success: result.success,
      score: result.score,
      action: result.action,
      hostname: result.hostname,
      errorCodes: result["error-codes"],
    })

    if (!result.success) {
      return {
        success: false,
        error: result["error-codes"]?.join(", ") || "reCAPTCHA verification failed",
      }
    }

    // For reCAPTCHA v3, check the score (0.0 to 1.0)
    // 0.5 is the recommended threshold
    if (result.score !== undefined && result.score < 0.5) {
      return {
        success: false,
        score: result.score,
        error: "Security verification failed. Please try again.",
      }
    }

    return {
      success: true,
      score: result.score,
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return {
      success: false,
      error: "Network error during security verification",
    }
  }
}
