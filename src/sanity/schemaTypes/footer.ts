import { defineField, defineType } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand Section',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              description: 'Upload the footer logo image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for the logo',
              initialValue: 'Jobsmate Logo',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'width',
              title: 'Logo Width',
              type: 'number',
              description: 'Logo width in pixels',
              initialValue: 140,
              validation: (Rule) => Rule.min(50).max(300),
            }),
            defineField({
              name: 'height',
              title: 'Logo Height',
              type: 'number',
              description: 'Logo height in pixels',
              initialValue: 40,
              validation: (Rule) => Rule.min(20).max(150),
            }),
          ],
        }),
        defineField({
          name: 'description',
          title: 'Brand Description',
          type: 'text',
          description: 'Brief description about the company',
          initialValue: 'Hire the best applicants for your tech positions. Focus on skills, not just resumes.',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'poweredBy',
          title: 'Powered By Section',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Powered By Text',
              type: 'string',
              initialValue: 'Powered by',
            }),
            defineField({
              name: 'company',
              title: 'Company Name',
              type: 'string',
              initialValue: 'NextShift',
            }),
            defineField({
              name: 'email',
              title: 'Contact Email',
              type: 'email',
              initialValue: 'contact@nextshift.com',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'navigationSections',
      title: 'Navigation Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL/Anchor',
                      type: 'string',
                      description: 'URL or anchor link (e.g., #features, https://...)',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'isExternal',
                      title: 'Is External Link',
                      type: 'boolean',
                      description: 'Toggle for external links (opens in new tab)',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'ariaLabel',
                      title: 'Accessibility Label',
                      type: 'string',
                      description: 'Aria label for accessibility (optional)',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'href',
                      isExternal: 'isExternal',
                    },
                    prepare(selection) {
                      const { title, subtitle, isExternal } = selection;
                      return {
                        title: title || 'Untitled Link',
                        subtitle: `${subtitle || 'No URL'} ${isExternal ? '(External)' : ''}`,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).max(8),
            }),
            defineField({
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this section appears (1, 2, 3...)',
              validation: (Rule) => Rule.min(1).max(10),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
              order: 'displayOrder',
            },
            prepare(selection) {
              const { title, links, order } = selection;
              const linkCount = Array.isArray(links) ? links.length : 0;
              return {
                title: title || 'Untitled Section',
                subtitle: `${linkCount} links • Order: ${order || 'Not set'}`,
              };
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Platform',
          displayOrder: 1,
          links: [
            { label: 'Features', href: '#features', isExternal: false },
            { label: 'Pricing', href: '#pricing-card', isExternal: false },
            { label: 'About us', href: 'https://jobsmate.global/why-jobsmate/', isExternal: true },
          ],
        },
        {
          title: 'Contact',
          displayOrder: 2,
          links: [
            {
              label: 'Abberdaan 56, 1064 AA Amsterdam',
              href: 'https://maps.app.goo.gl/Z1YWD6nBfJsPJt776',
              isExternal: true,
              ariaLabel: 'View our location on Google Maps',
            },
            {
              label: '+31 6 38 27 51 70',
              href: 'tel:+31638275170',
              isExternal: true,
              ariaLabel: 'Call us',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'LinkedIn URL',
              type: 'url',
              initialValue: 'https://www.linkedin.com/company/jobsmate?originalSubdomain=nl',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Accessibility Label',
              type: 'string',
              initialValue: 'LinkedIn',
            }),
            defineField({
              name: 'isActive',
              title: 'Show LinkedIn Link',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Instagram URL',
              type: 'url',
              initialValue: 'https://www.instagram.com/jobsmateglobal/',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Accessibility Label',
              type: 'string',
              initialValue: 'Instagram',
            }),
            defineField({
              name: 'isActive',
              title: 'Show Instagram Link',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
        defineField({
          name: 'email',
          title: 'Email Contact',
          type: 'object',
          fields: [
            defineField({
              name: 'address',
              title: 'Email Address',
              type: 'email',
              initialValue: 'info@jobsmate.nl',
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Accessibility Label',
              type: 'string',
              initialValue: 'Email us',
            }),
            defineField({
              name: 'isActive',
              title: 'Show Email Link',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
        defineField({
          name: 'customSocials',
          title: 'Additional Social Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'ariaLabel',
                  title: 'Accessibility Label',
                  type: 'string',
                }),
                defineField({
                  name: 'iconSvg',
                  title: 'Custom SVG Icon',
                  type: 'text',
                  description: 'Paste SVG code for custom social icon',
                }),
                defineField({
                  name: 'isActive',
                  title: 'Show This Link', 
                  type: 'boolean',
                  initialValue: true,
                }),
              ],
              preview: {
                select: {
                  title: 'platform',
                  subtitle: 'url',
                  isActive: 'isActive',
                },
                prepare(selection) {
                  const { title, subtitle, isActive } = selection;
                  return {
                    title: title || 'Custom Social',
                    subtitle: `${subtitle || 'No URL'} ${isActive ? '(Active)' : '(Inactive)'}`,
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(5),
        }),
      ],
    }),
    defineField({
      name: 'styling',
      title: 'Footer Styling',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color Theme',
          type: 'string',
          options: {
            list: [
              { title: 'Default (Light Cream)', value: 'default' },
              { title: 'Dark Theme', value: 'dark' },
              { title: 'Brand Primary', value: 'primary' },
              { title: 'White', value: 'white' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'default',
        }),
        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'color',
          description: 'Only used when "Custom" background is selected',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),
        defineField({
          name: 'borderStyle',
          title: 'Top Border Style',
          type: 'string',
          options: {
            list: [
              { title: 'Default Border', value: 'default' },
              { title: 'No Border', value: 'none' },
              { title: 'Thick Border', value: 'thick' },
              { title: 'Gradient Border', value: 'gradient' },
            ],
          },
          initialValue: 'default',
        }),
      ],
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO & Technical Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'footerId',
          title: 'Footer HTML ID',
          type: 'string',
          description: 'Custom ID for the footer element (optional)',
          validation: (Rule) => Rule.regex(/^[a-zA-Z0-9-_]*$/, 'Only letters, numbers, hyphens, and underscores allowed'),
        }),
        defineField({
          name: 'structuredData',
          title: 'Include Structured Data',
          type: 'boolean',
          description: 'Include JSON-LD structured data for better SEO',
          initialValue: true,
        }),
        defineField({
          name: 'cookieNotice',
          title: 'Cookie Notice',
          type: 'object',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Show Cookie Notice',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'text',
              title: 'Cookie Notice Text',
              type: 'text',
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: 'linkText',
              title: 'Privacy Policy Link Text',
              type: 'string',
              initialValue: 'Privacy Policy',
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: 'linkUrl',
              title: 'Privacy Policy URL',
              type: 'url',
              hidden: ({ parent }) => !parent?.enabled,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide the footer',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      brandDescription: 'brand.description',
      sections: 'navigationSections',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { brandDescription, sections, isActive } = selection;
      const sectionCount = Array.isArray(sections) ? sections.length : 0;
      const shortDesc = brandDescription ? brandDescription.substring(0, 50) + '...' : 'Footer Configuration';
      
      return {
        title: 'Footer',
        subtitle: `${shortDesc} • ${sectionCount} sections • ${isActive ? 'Active' : 'Inactive'}`,
      };
    },
  },
})
