import { defineField, defineType } from 'sanity'

export const freeTrialCard = defineType({
  name: 'freeTrialCard',
  title: 'Free Trial Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'object',
      fields: [
        defineField({
          name: 'line1',
          title: 'First Line',
          type: 'string',
          description: 'First line of the title (e.g., "Start with a 14-day")',
          initialValue: 'Start with a 14-day',
        }),
        defineField({
          name: 'line2',
          title: 'Second Line',
          type: 'string',
          description: 'Second line of the title (e.g., "free trial of Pro")',
          initialValue: 'free trial of Pro',
        }),
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryButton',
          title: 'Primary Button (Start for free)',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Start for free',
            }),
            defineField({
              name: 'href',
              title: 'Button URL',
              type: 'url',
              description: 'URL for the free trial (e.g., Calendly link)',
              initialValue: 'https://calendly.com/info-jtq/jobsmate-introduction',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Accessibility Label',
              type: 'string',
              initialValue: 'Start free trial - opens Calendly scheduling page',
            }),
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button (See our plans)',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'See our plans',
            }),
            defineField({
              name: 'href',
              title: 'Button URL/Anchor',
              type: 'string',
              description: 'URL or anchor link (e.g., #pricing-card)',
              initialValue: '#pricing-card',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Accessibility Label',
              type: 'string',
              initialValue: 'View pricing plans',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Cards',
      type: 'object',
      fields: [
        defineField({
          name: 'timeSaved',
          title: 'Time Saved Stat',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Time saved',
            }),
            defineField({
              name: 'percentage',
              title: 'Percentage',
              type: 'number',
              initialValue: 68,
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: 'increase',
              title: 'Increase Percentage',
              type: 'number',
              description: 'Percentage increase (e.g., 12 for +12%)',
              initialValue: 12,
            }),
          ],
        }),
        defineField({
          name: 'hireQuality',
          title: 'Hire Quality Stat',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Hire quality',
            }),
            defineField({
              name: 'percentage',
              title: 'Percentage',
              type: 'number',
              initialValue: 94,
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: 'increase',
              title: 'Increase Percentage',
              type: 'number',
              description: 'Percentage increase (e.g., 8 for +8%)',
              initialValue: 8,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Bottom Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Metric Text',
              type: 'string',
            }),
          ],
        },
      ],
      initialValue: [
        { text: 'Faster Hiring' },
        { text: 'More Candidates' },
        { text: 'Higher ROI' },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'progressBar',
      title: 'Progress Bar',
      type: 'object',
      fields: [
        defineField({
          name: 'percentage',
          title: 'Progress Percentage',
          type: 'number',
          description: 'Progress bar fill percentage (0-100)',
          initialValue: 85,
          validation: (Rule) => Rule.min(0).max(100),
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this free trial card section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title.line1',
      subtitle: 'title.line2',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${title} ${subtitle}` || 'Free Trial Card',
        subtitle: `${isActive ? 'Active' : 'Inactive'}`,
      };
    },
  },
})
