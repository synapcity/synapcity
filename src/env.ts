export const env = {
  NEXT_PUBLIC_SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL || 'https://official-synapcity.vercel.app').replace(/\/$/, ''),
};