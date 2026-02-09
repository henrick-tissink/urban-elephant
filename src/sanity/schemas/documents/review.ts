import { defineField, defineType } from "sanity";

export const reviewSchema = defineType({
  name: "review",
  title: "Review",
  type: "document",
  icon: () => "⭐",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Review Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "Booking.com", value: "booking" },
          { title: "TripAdvisor", value: "tripadvisor" },
          { title: "Direct Client", value: "client" },
          { title: "Airbnb", value: "airbnb" },
        ],
      },
    }),
    defineField({
      name: "property",
      title: "Property",
      type: "reference",
      to: [{ type: "property" }],
      description: "Link to specific property (optional)",
    }),
    defineField({
      name: "date",
      title: "Review Date",
      type: "date",
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
    }),
  ],
  orderings: [
    {
      title: "Rating (High to Low)",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
    {
      title: "Date (Newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "content",
      rating: "rating",
    },
    prepare({ title, subtitle, rating }) {
      return {
        title: `${title} ${"⭐".repeat(rating || 0)}`,
        subtitle: subtitle?.substring(0, 80) + "...",
      };
    },
  },
});
