import { defineField, defineType } from "sanity";

export const ctaSchema = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Internal path (e.g., /properties) or external URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Button Style",
      type: "string",
      options: {
        list: [
          { title: "Primary (Gold)", value: "primary" },
          { title: "Secondary (Stone)", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
          { title: "Link", value: "link" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
