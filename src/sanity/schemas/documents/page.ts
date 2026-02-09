import { defineField, defineType } from "sanity";

export const pageSchema = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: () => "📄",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portableText",
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSection",
          title: "Hero Section",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "subheading", type: "string", title: "Subheading" },
            { name: "backgroundImage", type: "image", title: "Background Image" },
            { name: "cta", type: "cta", title: "Call to Action" },
          ],
          preview: {
            select: { title: "heading" },
            prepare({ title }) {
              return { title: `Hero: ${title}` };
            },
          },
        },
        {
          type: "object",
          name: "textSection",
          title: "Text Section",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "content", type: "portableText", title: "Content" },
          ],
          preview: {
            select: { title: "heading" },
            prepare({ title }) {
              return { title: `Text: ${title}` };
            },
          },
        },
        {
          type: "object",
          name: "imageGallery",
          title: "Image Gallery",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            {
              name: "images",
              type: "array",
              title: "Images",
              of: [{ type: "image", options: { hotspot: true } }],
            },
            {
              name: "layout",
              type: "string",
              title: "Layout",
              options: {
                list: [
                  { title: "Grid", value: "grid" },
                  { title: "Masonry", value: "masonry" },
                  { title: "Carousel", value: "carousel" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "heading" },
            prepare({ title }) {
              return { title: `Gallery: ${title}` };
            },
          },
        },
        {
          type: "object",
          name: "ctaSection",
          title: "CTA Section",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "description", type: "text", title: "Description" },
            { name: "cta", type: "cta", title: "Call to Action" },
            { name: "backgroundImage", type: "image", title: "Background Image" },
          ],
          preview: {
            select: { title: "heading" },
            prepare({ title }) {
              return { title: `CTA: ${title}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `/${subtitle}`,
      };
    },
  },
});
