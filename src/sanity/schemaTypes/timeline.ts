import { defineField, defineType } from 'sanity'

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'Main title for the timeline section (e.g., "A Tech Platform")',
      validation: (Rule) => Rule.required(),
      placeholder: 'A Tech Platform',
    }),
    defineField({
      name: 'highlightedTitle',
      title: 'Highlighted Title',
      type: 'string',
      description: 'Highlighted part of the title with gradient styling (e.g., "Created to Save Time")',
      placeholder: 'Created to Save Time',
    }),
    defineField({
      name: 'subtitle',
      title: 'Timeline Subtitle/Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description of the timeline section',
    }),
    defineField({
      name: 'items',
      title: 'Timeline Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'timelineItem',
          title: 'Timeline Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Item Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'emoji',
              title: 'Emoji',
              type: 'string',
              description: 'Single emoji to display with the item (e.g., 🔍, 💻, 🎯)',
              placeholder: '💻',
              initialValue: '💻',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  placeholder: 'Describe this image for accessibility...',
                }),
              ],
              description: 'Upload an image file - leave empty if you don\'t want to show an image',
            }),
            defineField({
              name: 'video',
              title: 'Video File',
              type: 'file',
              description: 'Upload a video file (MP4, MOV, etc.) - leave empty if you don\'t want video',
              options: {
                accept: 'video/*'
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Video Description',
                  type: 'string',
                  description: 'Describe what happens in the video for accessibility',
                }),
              ],
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL (Alternative)',
              type: 'string',
              description: 'Use a video URL path (e.g., /anti-cheat.mp4) instead of uploading',
              placeholder: '/your-video.mp4',
            }),
            defineField({
              name: 'showCodeBlock',
              title: 'Show Code Block',
              type: 'boolean',
              description: 'Toggle to show/hide the VS Code demo component',
              initialValue: false,
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Order of appearance in timeline (1, 2, 3...)',
              initialValue: 1,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
              order: 'order',
              image: 'image',
              video: 'video',
              showCodeBlock: 'showCodeBlock',
            },
            prepare(selection) {
              const { title, emoji, order, image, video, showCodeBlock } = selection;
              
              // Auto-detect media types based on what's present
              const mediaTypes = [];
              if (image?.asset) mediaTypes.push('image');
              if (video?.asset) mediaTypes.push('video');
              if (showCodeBlock) mediaTypes.push('code');
              
              const mediaText = mediaTypes.length > 0 ? mediaTypes.join(' + ') : 'text only';
              const media = video?.asset ? video : image;
              
              return {
                title: `${order}. ${emoji || '💻'} ${title}`,
                subtitle: `Media: ${mediaText}`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this timeline',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, itemCount, isActive } = selection;
      const count = Array.isArray(itemCount) ? itemCount.length : 0;
      return {
        title: title || 'Timeline',
        subtitle: `${count} items${!isActive ? ' (Inactive)' : ''}`,
      };
    },
  },
})
