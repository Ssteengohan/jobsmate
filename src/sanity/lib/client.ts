import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for immediate updates during development
  perspective: 'published', // or 'previewDrafts' for even faster draft updates
})

// Development client with even faster updates
export const devClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts', // See changes instantly, even drafts
  ignoreBrowserTokenWarning: true,
})
