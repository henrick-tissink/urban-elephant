// Document schemas
import { propertySchema } from "./documents/property";
import { tourSchema } from "./documents/tour";
import { reviewSchema } from "./documents/review";
import { siteSettingsSchema } from "./documents/siteSettings";
import { popupSchema } from "./documents/popup";
import { attractionSchema } from "./documents/attraction";
import { carHireSchema } from "./documents/carHire";
import { pageSchema } from "./documents/page";

// Object schemas
import { seoSchema } from "./objects/seo";
import { portableTextSchema } from "./objects/portableText";
import { ctaSchema } from "./objects/cta";

export const schemaTypes = [
  // Documents
  propertySchema,
  tourSchema,
  reviewSchema,
  siteSettingsSchema,
  popupSchema,
  attractionSchema,
  carHireSchema,
  pageSchema,
  // Objects
  seoSchema,
  portableTextSchema,
  ctaSchema,
];

// Re-export individual schemas for convenience
export {
  propertySchema,
  tourSchema,
  reviewSchema,
  siteSettingsSchema,
  popupSchema,
  attractionSchema,
  carHireSchema,
  pageSchema,
  seoSchema,
  portableTextSchema,
  ctaSchema,
};
