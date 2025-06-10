import { defineField, defineType } from 'sanity'

export const pricingCard = defineType({
  name: 'pricingCard',
  title: 'Pricing Card Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeader',
      title: 'Section Header',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'object',
          fields: [
            defineField({
              name: 'beforeHighlight',
              title: 'Text Before Highlight',
              type: 'string',
              description: 'Text before the highlighted word',
              initialValue: 'Simple, transparent',
              placeholder: 'Simple, transparent'
            }),
            defineField({
              name: 'highlightedWord',
              title: 'Highlighted Word',
              type: 'string',
              description: 'Word that gets the golden highlight',
              initialValue: 'pricing',
              placeholder: 'pricing'
            }),
            defineField({
              name: 'afterHighlight',
              title: 'Text After Highlight',
              type: 'string',
              description: 'Text after the highlighted word (optional)',
              placeholder: 'for everyone'
            })
          ]
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          description: 'Subtitle text below the main title',
          initialValue: 'Choose the plan that\'s right for your business',
          placeholder: 'Choose the plan that\'s right for your business'
        })
      ]
    }),
    defineField({
      name: 'pricingTiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingTier',
          title: 'Pricing Tier',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              description: 'Name of the pricing plan (e.g., Free, Business, Enterprise)',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'price',
              title: 'Price Display',
              type: 'object',
              fields: [
                defineField({
                  name: 'amount',
                  title: 'Price Amount',
                  type: 'string',
                  description: 'Price display (e.g., $0, $49, Custom)',
                  placeholder: '$49'
                }),
                defineField({
                  name: 'period',
                  title: 'Billing Period',
                  type: 'string',
                  description: 'Billing period (e.g., /month, /year, one-time)',
                  initialValue: '/month',
                  options: {
                    list: [
                      { title: 'Per Month', value: '/month' },
                      { title: 'Per Year', value: '/year' },
                      { title: 'One Time', value: 'one-time' },
                      { title: 'Custom', value: 'custom' }
                    ]
                  }
                }),
                defineField({
                  name: 'originalPrice',
                  title: 'Original Price (Optional)',
                  type: 'string',
                  description: 'Strike-through price for discounts (e.g., $99)',
                  placeholder: '$99'
                }),
                defineField({
                  name: 'discountBadge',
                  title: 'Discount Badge',
                  type: 'string',
                  description: 'Discount badge text (e.g., "50% OFF", "MOST POPULAR")',
                  placeholder: 'MOST POPULAR'
                })
              ]
            }),
            defineField({
              name: 'description',
              title: 'Plan Description',
              type: 'text',
              rows: 2,
              description: 'Brief description of who this plan is for',
              placeholder: 'Perfect for small teams just getting started'
            }),
            defineField({
              name: 'isHighlighted',
              title: 'Highlight This Plan',
              type: 'boolean',
              description: 'Mark this plan as featured/recommended',
              initialValue: false
            }),
            defineField({
              name: 'features',
              title: 'Features List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'feature',
                  title: 'Feature',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'string',
                      description: 'Description of the feature',
                      validation: (Rule) => Rule.required()
                    }),
                    defineField({
                      name: 'included',
                      title: 'Included in Plan',
                      type: 'boolean',
                      description: 'Whether this feature is included (✓) or not (✗)',
                      initialValue: true
                    }),
                    defineField({
                      name: 'highlight',
                      title: 'Highlight Feature',
                      type: 'boolean',
                      description: 'Make this feature stand out with special styling',
                      initialValue: false
                    }),
                    defineField({
                      name: 'tooltip',
                      title: 'Tooltip/Help Text',
                      type: 'text',
                      rows: 2,
                      description: 'Additional information shown on hover'
                    })
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      included: 'included',
                      highlight: 'highlight'
                    },
                    prepare(selection) {
                      const { title, included, highlight } = selection;
                      const icon = included ? '✓' : '✗';
                      const status = highlight ? ' (⭐ Featured)' : '';
                      return {
                        title: `${icon} ${title}${status}`,
                        subtitle: included ? 'Included' : 'Not included'
                      };
                    }
                  }
                }
              ],
              validation: (Rule) => Rule.required().min(1)
            }),
            defineField({
              name: 'ctaButton',
              title: 'Call-to-Action Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  description: 'Text displayed on the button',
                  initialValue: 'Get Started',
                  placeholder: 'Get Started'
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                  description: 'Link destination for the button',
                  placeholder: 'https://platform.jobsmate.global/signup'
                }),
                defineField({
                  name: 'style',
                  title: 'Button Style',
                  type: 'string',
                  description: 'Visual style of the button',
                  initialValue: 'gradient',
                  options: {
                    list: [
                      { title: 'Primary (Golden)', value: 'primary' },
                      { title: 'Gradient Border', value: 'gradient' },
                      { title: 'Outline', value: 'outline' },
                      { title: 'Ghost', value: 'ghost' }
                    ]
                  }
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  description: 'Open the link in a new browser tab',
                  initialValue: true
                }),
                defineField({
                  name: 'ariaLabel',
                  title: 'Accessibility Label',
                  type: 'string',
                  description: 'Screen reader label for accessibility',
                  placeholder: 'Get started with Business plan'
                })
              ]
            }),
            defineField({
              name: 'additionalInfo',
              title: 'Additional Information',
              type: 'object',
              fields: [
                defineField({
                  name: 'freeTrialDays',
                  title: 'Free Trial Days',
                  type: 'number',
                  description: 'Number of free trial days (0 for no trial)',
                  initialValue: 0,
                  validation: (Rule) => Rule.min(0).max(365)
                }),
                defineField({
                  name: 'setupFee',
                  title: 'Setup Fee',
                  type: 'string',
                  description: 'One-time setup fee (leave empty if none)',
                  placeholder: '$99 setup fee'
                }),
                defineField({
                  name: 'minimumUsers',
                  title: 'Minimum Users',
                  type: 'number',
                  description: 'Minimum number of users required',
                  validation: (Rule) => Rule.min(1)
                }),
                defineField({
                  name: 'maxUsers',
                  title: 'Maximum Users',
                  type: 'string',
                  description: 'Maximum users (use "unlimited" for no limit)',
                  placeholder: 'unlimited'
                })
              ]
            }),
            defineField({
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this tier appears (1, 2, 3...)',
              initialValue: 1,
              validation: (Rule) => Rule.required().min(1)
            })
          ],
          preview: {
            select: {
              name: 'name',
              price: 'price.amount',
              period: 'price.period',
              isHighlighted: 'isHighlighted',
              order: 'displayOrder'
            },
            prepare(selection) {
              const { name, price, period, isHighlighted, order } = selection;
              const highlight = isHighlighted ? ' ⭐' : '';
              const priceDisplay = price && period ? `${price}${period}` : 'No price set';
              return {
                title: `${order}. ${name}${highlight}`,
                subtitle: priceDisplay
              };
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'sectionSettings',
      title: 'Section Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Style',
          type: 'string',
          description: 'Background color scheme for the section',
          initialValue: 'gradient',
          options: {
            list: [
              { title: 'White to Cream Gradient', value: 'gradient' },
              { title: 'Solid White', value: 'white' },
              { title: 'Solid Dark', value: 'dark' },
              { title: 'Transparent', value: 'transparent' }
            ]
          }
        }),
        defineField({
          name: 'showComparison',
          title: 'Show Feature Comparison',
          type: 'boolean',
          description: 'Display a detailed feature comparison table below cards',
          initialValue: false
        }),
        defineField({
          name: 'showAnnualDiscount',
          title: 'Show Annual Discount Toggle',
          type: 'boolean',
          description: 'Add monthly/annual pricing toggle',
          initialValue: false
        }),
        defineField({
          name: 'annualDiscountPercent',
          title: 'Annual Discount Percentage',
          type: 'number',
          description: 'Discount percentage for annual billing',
          initialValue: 20,
          validation: (Rule) => Rule.min(0).max(50),
          hidden: ({ parent }) => !parent?.showAnnualDiscount
        })
      ]
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO & Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionId',
          title: 'Section ID',
          type: 'string',
          description: 'HTML ID for the pricing section (for anchor links)',
          initialValue: 'pricing-card',
          validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/, {
            name: 'kebab-case',
            invert: false
          })
        }),
        defineField({
          name: 'trackingEvents',
          title: 'Analytics Events',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'eventName',
                  title: 'Event Name',
                  type: 'string',
                  placeholder: 'pricing_plan_clicked'
                }),
                defineField({
                  name: 'trigger',
                  title: 'Trigger',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Button Click', value: 'button_click' },
                      { title: 'Section View', value: 'section_view' },
                      { title: 'Plan Hover', value: 'plan_hover' }
                    ]
                  }
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this pricing section',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'sectionHeader.title.beforeHighlight',
      highlighted: 'sectionHeader.title.highlightedWord',
      tierCount: 'pricingTiers',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, highlighted, tierCount, isActive } = selection;
      const count = Array.isArray(tierCount) ? tierCount.length : 0;
      const sectionTitle = title && highlighted ? `${title} ${highlighted}` : 'Pricing Section';
      return {
        title: sectionTitle,
        subtitle: `${count} pricing tiers${!isActive ? ' (Inactive)' : ''}`
      };
    }
  }
})
