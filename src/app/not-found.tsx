import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center px-4">
        <h1 className="text-8xl font-serif text-[var(--color-brand-anchor)] mb-4">404</h1>
        <h2 className="text-3xl font-serif text-[#24272a] mb-4">
          Page Not Found
        </h2>
        <p className="text-stone-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
