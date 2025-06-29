import { defineField, defineType } from 'sanity'

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'Jobsmate',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isExternal',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              href: 'href',
            },
            prepare({ title, href }) {
              return {
                title: title,
                subtitle: href,
              }
            },
          },
        },
      ],
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
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Aria Label',
              type: 'string',
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
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      logoText: 'logoText',
      logo: 'logo',
    },
    prepare({ logoText, logo }) {
      return {
        title: `Navbar - ${logoText}`,
        media: logo,
      }
    },
  },
})
