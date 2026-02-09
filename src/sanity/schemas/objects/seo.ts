import { defineField, defineType } from "sanity";

export const seoSchema = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta Title",
      type: "string",
      description: "Override the page title for SEO (max 60 characters)",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Page description for search engines (max 160 characters)",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social sharing (1200x630 recommended)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Hide this page from search engines",
      initialValue: false,
    }),
  ],
});
