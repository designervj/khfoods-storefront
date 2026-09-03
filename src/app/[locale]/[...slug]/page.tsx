import { notFound } from "next/navigation";
import { resolvePermalink } from "@/lib/permalink";
import { store } from "@/redux/store";
import { translateStatic } from "@/lib/i18n/locale";

export default async function DynamicPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params;
  const t = (text: string) => translateStatic(text, locale);
  const pathname = "/" + slug.join("/");

  const permalinks: Record<string, string> = {};

  const resolved = resolvePermalink(pathname, permalinks);

  if (!resolved) notFound();

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-2xl font-bold">{t('Page Not Found')}</h1>
        <p className="text-[var(--text-secondary)] mt-4">{t('The page you are looking for does not exist.')}</p>
      </div>
    </div>
  );
}
