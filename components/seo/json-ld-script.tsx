interface JsonLdScriptProps {
  data: Record<string, unknown>;
}

/** Renders schema.org JSON-LD for crawlers and AI systems. */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
