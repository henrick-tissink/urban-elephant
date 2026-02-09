import type { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title("Site Settings")
        .icon(() => "⚙️")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.divider(),

      // Properties
      S.listItem()
        .title("Properties")
        .icon(() => "🏨")
        .child(
          S.documentTypeList("property")
            .title("Properties")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // Tours
      S.listItem()
        .title("Tours & Experiences")
        .icon(() => "🗺️")
        .child(
          S.documentTypeList("tour")
            .title("Tours")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // Reviews
      S.listItem()
        .title("Reviews")
        .icon(() => "⭐")
        .child(
          S.documentTypeList("review")
            .title("Reviews")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),

      // Car Hire
      S.listItem()
        .title("Car Hire")
        .icon(() => "🚗")
        .child(
          S.documentTypeList("carHireVehicle")
            .title("Vehicles")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      // Attractions
      S.listItem()
        .title("Nearby Attractions")
        .icon(() => "📍")
        .child(S.documentTypeList("attraction").title("Attractions")),

      // Promotional Popups
      S.listItem()
        .title("Promotional Popups")
        .icon(() => "🎯")
        .child(S.documentTypeList("popup").title("Popups")),

      S.divider(),

      // Custom Pages
      S.listItem()
        .title("Pages")
        .icon(() => "📄")
        .child(S.documentTypeList("page").title("Pages")),
    ]);
