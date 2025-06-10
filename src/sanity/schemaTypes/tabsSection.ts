import { defineField, defineType } from 'sanity'

export const tabsSection = defineType({
  name: 'tabsSection',
  title: 'Tabs Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for the tabs section',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Tab Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Tab Value',
              type: 'string',
              description: 'Unique identifier for the tab (lowercase, no spaces)',
              validation: (Rule) => Rule.required().regex(/^[a-z0-9]+$/, {
                name: 'lowercase-alphanumeric',
                invert: false
              }).error('Tab value must be lowercase alphanumeric characters only'),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Dashboard (MdDashboard)', value: 'MdDashboard' },
                  { title: 'Work/Job (MdWork)', value: 'MdWork' },
                  { title: 'User Check (FaUserCheck)', value: 'FaUserCheck' },
                  { title: 'Analytics (MdAnalytics)', value: 'MdAnalytics' },
                  { title: 'Settings (MdSettings)', value: 'MdSettings' },
                  { title: 'Person (MdPerson)', value: 'MdPerson' },
                  { title: 'Business (MdBusiness)', value: 'MdBusiness' },
                  { title: 'Assessment (MdAssessment)', value: 'MdAssessment' },
                  { title: 'Search (MdSearch)', value: 'MdSearch' },
                  { title: 'Group (MdGroup)', value: 'MdGroup' },
                ],
              },
              initialValue: 'MdDashboard',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'componentType',
              title: 'Component Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Dashboard', value: 'dashboard' },
                  { title: 'Job Posting', value: 'jobposting' },
                  { title: 'Match and Rank', value: 'matchandrank' },
                ],
              },
              validation: (Rule) => Rule.required(),
              description: 'Which component to render for this tab',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this tab should appear (lower numbers first)',
              initialValue: 1,
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              value: 'value',
              icon: 'icon',
              order: 'order',
              componentType: 'componentType',
            },
            prepare({ title, value, icon, order, componentType }) {
              return {
                title: `${order}. ${title}`,
                subtitle: `${value} (${componentType}) - Icon: ${icon}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tabs: 'tabs',
    },
    prepare({ title, tabs }) {
      const tabCount = tabs ? tabs.length : 0;
      return {
        title: title || 'Tabs Section',
        subtitle: `${tabCount} tab${tabCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
