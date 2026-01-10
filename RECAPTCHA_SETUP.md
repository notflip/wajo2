# Google reCAPTCHA v3 Setup Guide

This document explains the Google reCAPTCHA v3 implementation in this project.

## Overview

Google reCAPTCHA v3 has been integrated to protect all forms in the application from spam submissions. It works invisibly in the background without requiring users to solve challenges.

## Implementation Details

### Package Used
- **next-recaptcha-v3** (v1.5.3) - A Next.js-specific library for Google reCAPTCHA v3

### What's Protected
All forms in the application are now protected:
1. **Dynamic Forms** ([form.tsx](src/components/form/form.tsx)) - Forms built with Payload CMS form builder
2. **Contact Form** ([contact-form.tsx](src/components/contact-form.tsx)) - Static contact form
3. **Newsletter Form** ([newsletter-form.tsx](src/components/newsletter-form.tsx)) - Email subscription form

## Setup Instructions

### 1. Environment Variables

Add these to your `.env` file:

```env
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeKS0YsAAAAAPSeyt2TyKzYEcupY4wprH9HrdAQ
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important:** Replace `your_secret_key_here` with your actual reCAPTCHA secret key from the Google reCAPTCHA admin console.

### 2. Get Your Secret Key

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Select your site (or create a new one if you haven't already)
3. Copy the **Secret Key**
4. Update the `RECAPTCHA_SECRET_KEY` in your `.env` file

### 3. Verify Your Site Key

The site key is already configured: `6LeKS0YsAAAAAPSeyt2TyKzYEcupY4wprH9HrdAQ`

Make sure this matches your Google reCAPTCHA admin console settings.

## How It Works

### Frontend Flow

1. **ReCaptchaProvider** wraps the entire app in [layout.tsx](src/app/(app)/layout.tsx)
2. When a user submits a form, `executeRecaptcha()` is called with an action name
3. Google evaluates the interaction and returns a token
4. The token is sent along with form data to the API

### Backend Verification

1. API endpoints receive the reCAPTCHA token
2. Server makes a request to Google's siteverify API
3. Google returns a verification result with a score (0.0-1.0)
4. If score is below 0.5, the submission is rejected as suspicious
5. If verification passes, the form data is processed normally

### API Endpoints

- [/api/submissions](src/app/(app)/api/submissions/route.ts) - Handles Payload CMS form submissions
- [/api/mailchimp](src/app/(app)/api/mailchimp/route.ts) - Handles newsletter subscriptions

## Score Threshold

Currently set to **0.5** (configurable in API routes):
- **1.0** = Very likely a human
- **0.5** = Threshold (suspicious)
- **0.0** = Very likely a bot

You can adjust this threshold based on your needs:
- **Higher threshold (0.7+)**: More strict, may block some legitimate users
- **Lower threshold (0.3-)**: More lenient, may allow some bots

## Testing

To test the implementation:

1. **Development**: reCAPTCHA works on localhost automatically
2. **Production**: Ensure your domain is registered in Google reCAPTCHA admin
3. **Monitoring**: Check Google reCAPTCHA admin console for analytics

### Testing Tips

- reCAPTCHA v3 runs automatically when forms are submitted
- Check browser console for any reCAPTCHA errors
- View Network tab to confirm token is being sent
- Check API responses for verification results

## Troubleshooting

### Common Issues

1. **"reCAPTCHA verification failed"**
   - Check if `RECAPTCHA_SECRET_KEY` is correctly set
   - Verify the secret key matches your site key in Google admin

2. **"Suspicious activity detected"**
   - User's interaction score was below 0.5
   - Consider adjusting the threshold or investigating the user's behavior

3. **Token missing**
   - Ensure `ReCaptchaProvider` wraps your app in layout.tsx
   - Check if `useReCaptcha` hook is properly imported in form components

4. **Domain mismatch errors**
   - Add your domain to the allowed domains list in Google reCAPTCHA admin
   - localhost is allowed by default for testing

## Additional Resources

- [Google reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [next-recaptcha-v3 on npm](https://www.npmjs.com/package/next-recaptcha-v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

## Security Notes

- **Never expose your secret key** - Keep it in `.env` file (not committed to git)
- **Always verify on the server** - Client-side verification can be bypassed
- **Monitor scores** - Regularly check Google admin console for patterns
- **Adjust thresholds** - Based on your specific use case and spam levels
