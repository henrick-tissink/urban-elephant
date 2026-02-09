import { defineField, defineType } from "sanity";

export const attractionSchema = defineType({
  name: "attraction",
  title: "Nearby Attraction",
  type: "document",
  icon: () => "📍",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Dining", value: "dining" },
          { title: "Sightseeing", value: "sightseeing" },
          { title: "Activity", value: "activity" },
          { title: "Shopping", value: "shopping" },
          { title: "Nightlife", value: "nightlife" },
          { title: "Culture", value: "culture" },
        ],
      },
    }),
    defineField({
      name: "distance",
      title: "Distance",
      type: "string",
      description: "e.g., '5 min walk', '10 min drive'",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
