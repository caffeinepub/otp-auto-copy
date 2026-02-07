interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'kotlin' }: CodeBlockProps) {
  return (
    <div className="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
