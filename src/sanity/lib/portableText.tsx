import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';

// Define custom components for Portable Text
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <h1 className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(42,151,219,0.3)]">
        {children}
      </h1>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    highlight: ({ children }) => <span className="text-[var(--primary-gold)]">{children}</span>,
  },
};

// Convert Portable Text to React components
export const renderPortableText = (content: PortableTextBlock[] | null | undefined) => {
  if (!content) return null;

  return <PortableText value={content} components={portableTextComponents} />;
};

// Convert Portable Text to plain text for SEO/meta purposes
export const portableTextToPlainText = (
  content: PortableTextBlock[] | null | undefined,
): string => {
  if (!content) return '';

  return content
    .map((block: PortableTextBlock) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children
        .map((child) => {
          if ('text' in child) {
            return child.text || '';
          }
          return '';
        })
        .join('');
    })
    .join(' ');
};
