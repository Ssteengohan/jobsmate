import { defineField, defineType } from 'sanity'

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Highlight', value: 'highlight' }
            ],
            annotations: []
          }
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Button Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'variant',
              title: 'Button Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (Gold)', value: 'primary' },
                  { title: 'Secondary (Gradient Border)', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Aria Label',
              type: 'string',
            }),
            defineField({
              name: 'isExternal',
              title: 'External Link',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'text',
              variant: 'variant',
            },
            prepare({ title, variant }) {
              return {
                title: title,
                subtitle: `${variant} button`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'showGradientOverlay',
      title: 'Show Gradient Overlay',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      backgroundImage: 'backgroundImage',
    },
    prepare({ title, subtitle, backgroundImage }) {
      // Extract plain text from rich text for preview
      const plainTitle = title && title[0]?.children?.map((child: any) => child.text).join('') || 'Hero Banner';
      
      return {
        title: plainTitle,
        subtitle: subtitle,
        media: backgroundImage,
      }
    },
  },
})
