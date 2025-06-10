import { defineField, defineType } from 'sanity'

export const sliderSection = defineType({
  name: 'sliderSection',
  title: 'Slider Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for the slider section',
    }),
    defineField({
      name: 'headingText',
      title: 'Heading Text',
      type: 'text',
      description: 'Main heading text with HTML support for styling',
      initialValue: 'Integration with 15+ ATS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingPrefix',
      title: 'Heading Prefix',
      type: 'string',
      description: 'Text that appears before the main heading',
      initialValue: 'Integration with',
    }),
    defineField({
      name: 'highlightText',
      title: 'Highlight Text',
      type: 'string',
      description: 'Text to be highlighted in gold',
      initialValue: '15+ ATS',
    }),
    defineField({
      name: 'logos',
      title: 'Company Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'companyName',
              title: 'Company Name',
              type: 'string',
              description: 'Name of the company/ATS system',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this logo should appear (1, 2, 3, etc.)',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'isVisible',
              title: 'Show Logo',
              type: 'boolean',
              description: 'Whether to display this logo',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'companyName',
              order: 'order',
              isVisible: 'isVisible',
              media: 'image',
            },
            prepare({ title, order, isVisible, media }) {
              return {
                title: `${order}. ${title}`,
                subtitle: isVisible ? 'Visible' : 'Hidden',
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'animationSettings',
      title: 'Animation Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'enableAnimations',
          title: 'Enable Animations',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'animationDuration',
          title: 'Animation Duration (seconds)',
          type: 'number',
          description: 'Duration for text generation effect',
          initialValue: 0.5,
          validation: (Rule) => Rule.min(0.1).max(3),
        }),
        defineField({
          name: 'enableTiltEffect',
          title: 'Enable Logo Tilt Effect',
          type: 'boolean',
          description: 'Enable 3D tilt effect on logo hover',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'backgroundSettings',
      title: 'Background Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showBackground',
          title: 'Show Background Pattern',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'backgroundOpacity',
          title: 'Background Opacity',
          type: 'number',
          description: 'Opacity of the background pattern (0-1)',
          initialValue: 0.5,
          validation: (Rule) => Rule.min(0).max(1),
        }),
      ],
    }),
    defineField({
      name: 'isEnabled',
      title: 'Enable Section',
      type: 'boolean',
      description: 'Whether to display this section on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      headingText: 'headingText',
      logoCount: 'logos',
      isEnabled: 'isEnabled',
    },
    prepare({ title, headingText, logoCount, isEnabled }) {
      const count = logoCount ? logoCount.length : 0;
      return {
        title: title || 'Slider Section',
        subtitle: `${headingText} - ${count} logo${count !== 1 ? 's' : ''} ${isEnabled ? '(Enabled)' : '(Disabled)'}`,
      }
    },
  },
})
