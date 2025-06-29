// DigitalOcean Spaces configuration
export const SPACES_CONFIG = {
  // Your DigitalOcean Spaces endpoint
  endpoint: process.env.NEXT_PUBLIC_SPACES_ENDPOINT || 'https://ams3.digitaloceanspaces.com',
  // Your bucket name
  bucket: process.env.NEXT_PUBLIC_SPACES_BUCKET || 'jobsmate-videos',
  // CDN domain (if you have one configured)
  cdnDomain: process.env.NEXT_PUBLIC_SPACES_CDN || null,
};

// Video URLs mapping
export const VIDEO_URLS = {
  // Job posting videos
  jobpostMobile: `${SPACES_CONFIG.endpoint}/${SPACES_CONFIG.bucket}/videos/jobpost-mobile.mp4`,
  jobpostDesktop: `${SPACES_CONFIG.endpoint}/${SPACES_CONFIG.bucket}/videos/CleanShot-2025-04-04-at-18.37.34.mp4`,
  
  // Timeline videos
  antiCheat: `${SPACES_CONFIG.endpoint}/${SPACES_CONFIG.bucket}/videos/anti-cheat.mp4`,
  review: `${SPACES_CONFIG.endpoint}/${SPACES_CONFIG.bucket}/videos/review.mp4`,
};

// Helper function to get video URL with CDN if available
export function getVideoUrl(videoKey: keyof typeof VIDEO_URLS): string {
  const url = VIDEO_URLS[videoKey];
  
  if (SPACES_CONFIG.cdnDomain) {
    // Replace the endpoint with CDN domain for better performance
    return url.replace(SPACES_CONFIG.endpoint, `https://${SPACES_CONFIG.cdnDomain}`);
  }
  
  return url;
}

// Fallback URLs (local files for development)
export const FALLBACK_VIDEO_URLS = {
  jobpostMobile: '/jobpost-mobile.mp4',
  jobpostDesktop: '/CleanShot 2025-04-04 at 18.37.34.mp4',
  antiCheat: '/anti-cheat.mp4',
  review: '/review.mp4',
};

// Get video URL with fallback
export function getVideoUrlWithFallback(videoKey: keyof typeof VIDEO_URLS): string {
  // In development, use local files
  if (process.env.NODE_ENV === 'development') {
    return FALLBACK_VIDEO_URLS[videoKey];
  }
  
  // In production, use Spaces URLs
  return getVideoUrl(videoKey);
} 