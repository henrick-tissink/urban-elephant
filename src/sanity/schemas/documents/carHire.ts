import { defineField, defineType } from "sanity";

export const carHireSchema = defineType({
  name: "carHireVehicle",
  title: "Car Hire Vehicle",
  type: "document",
  icon: () => "🚗",
  fields: [
    defineField({
      name: "name",
      title: "Vehicle Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Compact", value: "compact" },
          { title: "Sedan", value: "sedan" },
          { title: "SUV", value: "suv" },
          { title: "Luxury", value: "luxury" },
          { title: "Van", value: "van" },
          { title: "Convertible", value: "convertible" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "pricePerDay",
      title: "Price per Day (ZAR)",
      type: "number",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "object",
      fields: [
        { name: "transmission", type: "string", title: "Transmission" },
        { name: "passengers", type: "number", title: "Passengers" },
        { name: "luggage", type: "number", title: "Luggage Capacity" },
        { name: "doors", type: "number", title: "Doors" },
        { name: "fuelType", type: "string", title: "Fuel Type" },
        { name: "airConditioning", type: "boolean", title: "Air Conditioning" },
      ],
    }),
    defineField({
      name: "available",
      title: "Currently Available",
      type: "boolean",
      initialValue: true,
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
  ],
  orderings: [
    {
      title: "Price (Low to High)",
      name: "priceAsc",
      by: [{ field: "pricePerDay", direction: "asc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      price: "pricePerDay",
      media: "image",
    },
    prepare({ title, subtitle, price, media }) {
      return {
        title,
        subtitle: `${subtitle} - R${price}/day`,
        media,
      };
    },
  },
});
