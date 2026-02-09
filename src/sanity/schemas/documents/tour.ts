import { defineField, defineType } from "sanity";

export const tourSchema = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  icon: () => "🗺️",
  fields: [
    defineField({
      name: "name",
      title: "Tour Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Adventure", value: "adventure" },
          { title: "Wildlife", value: "wildlife" },
          { title: "Cultural", value: "cultural" },
          { title: "Wine & Food", value: "wine-food" },
          { title: "Sightseeing", value: "sightseeing" },
          { title: "Water Sports", value: "water-sports" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "portableText",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief description for cards (max 160 characters)",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
          ],
        },
      ],
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g., 'Full Day', '4-5 hours', '2 days'",
    }),
    defineField({
      name: "price",
      title: "Price (ZAR)",
      type: "number",
    }),
    defineField({
      name: "priceNote",
      title: "Price Note",
      type: "string",
      description: "e.g., 'per person', 'for 2 guests', 'starting from'",
    }),
    defineField({
      name: "highlights",
      title: "Tour Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "includes",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "excludes",
      title: "What's Not Included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "meetingPoint",
      title: "Meeting Point",
      type: "string",
    }),
    defineField({
      name: "groupSize",
      title: "Group Size",
      type: "object",
      fields: [
        { name: "min", type: "number", title: "Minimum" },
        { name: "max", type: "number", title: "Maximum" },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
