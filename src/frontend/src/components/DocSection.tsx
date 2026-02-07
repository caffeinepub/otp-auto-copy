import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import type { DocSectionType } from '@/docs/docsContent';

interface DocSectionProps {
  section: DocSectionType;
}

export function DocSection({ section }: DocSectionProps) {
  return (
    <section id={section.id} className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{section.title}</CardTitle>
          {section.description && <CardDescription className="text-base">{section.description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-6">
          {section.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className="text-base leading-relaxed">
                    {block.text}
                  </p>
                );

              case 'heading':
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {block.text}
                  </h3>
                );

              case 'list':
                return (
                  <ul key={index} className="space-y-2 ml-6">
                    {block.items?.map((item, i) => (
                      <li key={i} className="text-base leading-relaxed list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                );

              case 'ordered-list':
                return (
                  <ol key={index} className="space-y-2 ml-6">
                    {block.items?.map((item, i) => (
                      <li key={i} className="text-base leading-relaxed list-decimal">
                        {item}
                      </li>
                    ))}
                  </ol>
                );

              case 'code':
                return <CodeBlock key={index} code={block.code || ''} language={block.language || 'kotlin'} />;

              case 'alert':
                const Icon =
                  block.variant === 'warning'
                    ? AlertTriangle
                    : block.variant === 'success'
                      ? CheckCircle2
                      : Info;
                return (
                  <Alert key={index} variant={block.variant === 'warning' ? 'destructive' : 'default'}>
                    <Icon className="h-4 w-4" />
                    <AlertDescription className="text-base">{block.text}</AlertDescription>
                  </Alert>
                );

              case 'table':
                return (
                  <div key={index} className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          {block.headers?.map((header, i) => (
                            <th key={i} className="text-left p-3 font-semibold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows?.map((row, i) => (
                          <tr key={i} className="border-b border-border">
                            {row.map((cell, j) => (
                              <td key={j} className="p-3 text-sm">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );

              default:
                return null;
            }
          })}
        </CardContent>
      </Card>
    </section>
  );
}
