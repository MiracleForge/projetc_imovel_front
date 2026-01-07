/**
 * Centralized configuration for public environment variables.
 * This follows Next.js Data Security best practices by keeping
 * all environment variable access in a single place.
 */

export const config = {
  /**
   * Turnstile (Cloudflare) site key for CAPTCHA verification
   */
  turnstile: {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
  },

  /**
   * API endpoints configuration
   */
  api: {
    dev: process.env.NEXT_PUBLIC_API_DEV!,
    prod: process.env.NEXT_PUBLIC_API_PROD!,
  },

  /**
   * Environment detection
   */
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",

  /**
   * Get the appropriate API URL based on environment
   */
  getApiUrl(): string {
    return this.isDevelopment ? this.api.dev : this.api.prod;
  },
} as const;
