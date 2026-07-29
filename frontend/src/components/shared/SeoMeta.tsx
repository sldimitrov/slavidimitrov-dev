import { useEffect } from "react";

interface SeoMetaProps {
  title: string;
  description?: string;
}

const SITE_NAME = "Slavi Dimitrov";

function upsertMetaDescription(content: string) {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = "description";
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function SeoMeta({ title, description }: SeoMetaProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} · ${SITE_NAME}`;

    let previousDescription: string | null = null;
    if (description) {
      const existing = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );
      previousDescription = existing?.content ?? null;
      upsertMetaDescription(description);
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== null) {
        upsertMetaDescription(previousDescription);
      }
    };
  }, [title, description]);

  return null;
}
