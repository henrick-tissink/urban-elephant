import { defineField, defineType } from "sanity";

export const popupSchema = defineType({
  name: "popup",
  title: "Promotional Popup",
  type: "document",
  icon: () => "🎯",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "portableText",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Learn More",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Enable/disable this popup",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "When should this popup start showing",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "When should this popup stop showing",
    }),
    defineField({
      name: "showOnPages",
      title: "Show on Pages",
      type: "array",
      of: [{ type: "string" }],
      description: "Specific pages to show popup (leave empty for all pages)",
      options: {
        list: [
          { title: "Homepage", value: "/" },
          { title: "Properties", value: "/properties" },
          { title: "Tours", value: "/tours" },
          { title: "Contact", value: "/contact" },
        ],
      },
    }),
    defineField({
      name: "dismissable",
      title: "Dismissable",
      type: "boolean",
      description: "Allow users to close the popup",
      initialValue: true,
    }),
    defineField({
      name: "delay",
      title: "Delay (seconds)",
      type: "number",
      description: "Seconds to wait before showing popup",
      initialValue: 3,
    }),
  ],
  preview: {
    select: {
      title: "heading",
      isActive: "isActive",
      media: "image",
    },
    prepare({ title, isActive, media }) {
      return {
        title,
        subtitle: isActive ? "Active" : "Inactive",
        media,
      };
    },
  },
});
