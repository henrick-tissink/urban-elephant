import { defineField, defineType } from "sanity";

export const propertySchema = defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: () => "🏨",
  fields: [
    defineField({
      name: "name",
      title: "Property Name",
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
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short catchy description (e.g., 'Luxury in the heart of Cape Town')",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "portableText",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Neighborhood or area (e.g., 'Cape Town CBD')",
    }),
    defineField({
      name: "address",
      title: "Full Address",
      type: "string",
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "geopoint",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
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
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "video",
      title: "Property Video",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            {
              name: "icon",
              type: "string",
              title: "Icon",
              description: "Lucide icon name (e.g., wifi, car, coffee)",
            },
            {
              name: "category",
              type: "string",
              title: "Category",
              options: {
                list: [
                  { title: "General", value: "general" },
                  { title: "Room", value: "room" },
                  { title: "Bathroom", value: "bathroom" },
                  { title: "Kitchen", value: "kitchen" },
                  { title: "Entertainment", value: "entertainment" },
                  { title: "Building", value: "building" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "name", subtitle: "category" },
          },
        },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Property Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description", rows: 2 },
            { name: "icon", type: "string", title: "Icon" },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "nearbyAttractions",
      title: "Nearby Attractions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "attraction" }] }],
    }),
    defineField({
      name: "nightsBridgeUrl",
      title: "NightsBridge Booking URL",
      type: "url",
    }),
    defineField({
      name: "starRating",
      title: "Star Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "location",
      media: "heroImage",
    },
  },
});
