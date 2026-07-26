/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ fixed from boolean to object
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // Removed the `env` block that used to re-declare STRIPE_SECRET_KEY,
  // STRIPE_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY and
  // CUSTOMERIO_API_KEY here. Next's `env` config exists specifically to
  // inline values into the client bundle — server code already reads
  // process.env.* directly without it, so this block served no purpose
  // except making it a one-line accident away from shipping these secrets
  // to every site visitor. No code referenced these vars through
  // next.config (verified), so this is a no-op for current behavior.
  output: "standalone",

};

export default nextConfig;
