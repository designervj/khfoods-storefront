import { notFound } from "next/navigation";
import { resolvePermalink } from "@/lib/permalink";
import { store } from "@/redux/store";

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pathname = "/" + slug.join("/");

  const permalinks: Record<string, string> = {};

  const resolved = resolvePermalink(pathname, permalinks);

  if (!resolved) notFound();

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-[var(--text-secondary)] mt-4">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
