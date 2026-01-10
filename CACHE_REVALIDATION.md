# Cache Revalidation API

This document explains how to use the cache revalidation API endpoint to clear Next.js caches.

## Setup

### Optional: Add a secret token for security

Add this to your `.env` file:

```env
REVALIDATE_SECRET_TOKEN=your-secret-token-here
```

If set, all revalidation requests must include this token for authorization.

## Usage

### Method 1: Clear ALL caches (Recommended after deployment)

```bash
# With secret token
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"type": "all"}'

# Without secret token (if REVALIDATE_SECRET_TOKEN is not set)
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'
```

### Method 2: Clear specific cache types

**Clear only pages:**
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"type": "pages"}'
```

**Clear only blog posts:**
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"type": "posts"}'
```

**Clear only globals (settings, footer, navigation, etc.):**
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"type": "globals"}'
```

### Method 3: Clear specific path

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"path": "/about"}'
```

### Method 4: Clear specific cache tag

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"tag": "global_settings"}'
```

### Method 5: Using GET requests (simpler for quick testing)

```bash
# Clear all caches
curl "https://your-domain.com/api/revalidate?secret=your-secret-token-here"

# Clear specific type
curl "https://your-domain.com/api/revalidate?secret=your-secret-token-here&type=pages"

# Clear specific path
curl "https://your-domain.com/api/revalidate?secret=your-secret-token-here&path=/about"

# Clear specific tag
curl "https://your-domain.com/api/revalidate?secret=your-secret-token-here&tag=global_settings"
```

## Response Format

### Success Response

```json
{
  "revalidated": true,
  "message": "Cache cleared successfully",
  "details": {
    "pages": ["/", "/about", "/contact"],
    "posts": ["/blog/post-1", "/blog/post-2"],
    "globals": ["global_settings", "global_footer", "global_navigation-main", "global_redirects"]
  },
  "now": 1704912345678
}
```

### Error Response

```json
{
  "error": "Unauthorized"
}
```

or

```json
{
  "error": "Failed to revalidate cache",
  "details": "Error message here"
}
```

## Common Cache Tags Used in This Project

- `global_settings` - Site settings
- `global_blog-settings` - Blog settings
- `global_footer` - Footer content
- `global_navigation-main` - Main navigation
- `global_redirects` - Redirects configuration
- `pages_[slug]` - Individual page cache
- `posts_[slug]` - Individual post cache

## Use Cases

### After Coolify Deployment

Run this command after each deployment to ensure all caches are cleared:

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"type": "all"}'
```

### After Environment Variable Changes

If you update environment variables (like reCAPTCHA keys), you need to:
1. Update the environment variables in Coolify
2. Rebuild the application (so Next.js bakes in the new `NEXT_PUBLIC_*` values)
3. Run the cache revalidation command above

### After Content Updates in Payload CMS

The cache should automatically revalidate when you publish/update content through Payload CMS hooks. However, if needed, you can manually trigger revalidation:

```bash
# Revalidate specific page
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-token-here" \
  -d '{"path": "/your-page-path"}'
```

## Integration with Coolify

You can add this curl command as a post-deployment script in Coolify to automatically clear caches after each deployment.

1. Go to your Coolify application settings
2. Add a post-deployment script
3. Add the curl command to clear all caches

## Security Notes

- Always use HTTPS in production
- Keep your `REVALIDATE_SECRET_TOKEN` secure
- Consider using Coolify's environment variables to store the token
- The token can be passed either as `Authorization: Bearer <token>` header or `x-revalidate-token` header
