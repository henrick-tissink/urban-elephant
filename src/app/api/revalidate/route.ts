import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Webhook secret for verification
const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Parse and verify the webhook
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(request, secret);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Bad request" },
        { status: 400 }
      );
    }

    // Revalidate based on document type
    const type = body._type;
    const slug = body.slug?.current;

    switch (type) {
      case "property":
        revalidatePath("/properties", "page");
        revalidatePath("/", "page");
        if (slug) {
          revalidatePath(`/properties/${slug}`, "page");
        }
        break;
      case "tour":
        revalidatePath("/tours", "page");
        if (slug) {
          revalidatePath(`/tours/${slug}`, "page");
        }
        break;
      case "review":
        revalidatePath("/", "page");
        break;
      case "carHireVehicle":
        revalidatePath("/car-hire", "page");
        break;
      case "siteSettings":
        // Revalidate all pages for site-wide settings
        revalidatePath("/", "layout");
        break;
      case "popup":
        revalidatePath("/", "layout");
        break;
      case "attraction":
        revalidatePath("/properties", "page");
        break;
      case "page":
        if (slug) {
          revalidatePath(`/${slug}`, "page");
        }
        break;
      default:
        // Revalidate homepage for unknown types
        revalidatePath("/", "page");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type,
      slug,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
