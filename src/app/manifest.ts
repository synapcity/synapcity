import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SynapCity -- Your Second Brain',
    short_name: 'SynapCity',
    description: 'Capture, connect, and create with your digital thoughtspace.',
    start_url: '/',
    display: 'standalone',
    background_color: 'var(--background)',
    theme_color: 'var(--primary)',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}