import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Transform Sanity image reference to optimized URL
export const transformToImageUrl = (imageRef: string | SanityImageSource | null): string => {
  if (!imageRef) return '';
  
  if (typeof imageRef === 'string' && imageRef.startsWith('http')) {
    return imageRef;
  }
  
  return urlFor(imageRef).url();
};

// Generate blur data URL for image placeholder
export const getBlurDataURL = (imageRef: string | SanityImageSource | null, size: number = 20): string => {
  if (!imageRef) return '';
  
  try {
    return urlFor(imageRef)
      .width(size)
      .height(size)
      .blur(50)
      .format('webp')
      .quality(20)
      .url();
  } catch (error) {
    console.warn('Failed to generate blur data URL:', error);
    return '';
  }
};
