import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Urban Elephant",
    }),
    defineField({
      name: "logo",
      title: "Logo (Icon)",
      type: "image",
      description: "Square logo/icon for favicon and small displays",
    }),
    defineField({
      name: "logoFull",
      title: "Logo (Full)",
      type: "image",
      description: "Full logo with text for header",
    }),
    defineField({
      name: "elephantIcon",
      title: "Elephant Icon",
      type: "image",
      description: "Elephant icon for branding elements",
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Phone" },
        { name: "whatsapp", type: "string", title: "WhatsApp Number" },
        { name: "operationsHours", type: "string", title: "Operations Hours" },
        { name: "afterHoursPhone", type: "string", title: "After Hours Phone" },
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "street", type: "string", title: "Street" },
        { name: "city", type: "string", title: "City" },
        { name: "country", type: "string", title: "Country" },
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        { name: "facebook", type: "url", title: "Facebook URL" },
        { name: "instagram", type: "url", title: "Instagram URL" },
        { name: "twitter", type: "url", title: "Twitter/X URL" },
        { name: "linkedin", type: "url", title: "LinkedIn URL" },
        { name: "youtube", type: "url", title: "YouTube URL" },
        { name: "tripadvisor", type: "url", title: "TripAdvisor URL" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links (Legacy)",
      type: "array",
      hidden: true,
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TripAdvisor", value: "tripadvisor" },
                ],
              },
            },
            { name: "url", type: "url", title: "URL" },
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "mainNavigation",
      title: "Main Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
            {
              name: "children",
              type: "array",
              title: "Dropdown Items",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "href", type: "string", title: "Link" },
                    { name: "description", type: "string", title: "Description" },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string", title: "Column Heading" },
            {
              name: "links",
              type: "array",
              title: "Links",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "href", type: "string", title: "Link" },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: "heading" },
          },
        },
      ],
    }),
    defineField({
      name: "bookNowUrl",
      title: "Book Now URL",
      type: "url",
      description: "Default booking URL for CTAs",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global site configuration",
      };
    },
  },
});
