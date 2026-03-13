import { cn } from '@/lib/utils'
import type { DatasetField } from '@/lib/types'

export function SchemaSection({ fields }: { fields: DatasetField[] }) {
  return (
    <section id="schema" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Data Dictionary
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Schema & Fields
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        Complete field reference with types, nullability, and example values.
      </p>

      <div className="border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th
                scope="col"
                className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-3"
              >
                Field
              </th>
              <th
                scope="col"
                className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-3"
              >
                Type
              </th>
              <th
                scope="col"
                className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-3 hidden md:table-cell"
              >
                Description
              </th>
              <th
                scope="col"
                className="text-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-3"
              >
                Nullable
              </th>
              <th
                scope="col"
                className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-3"
              >
                Example
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, i) => (
              <tr
                key={field.name}
                className={cn(
                  'border-b border-border last:border-0',
                  i % 2 === 0 ? '' : 'bg-muted/10'
                )}
              >
                <td className="p-3 font-mono text-xs text-primary">
                  {field.name}
                </td>
                <td className="p-3 font-mono text-xs text-foreground">
                  {field.type}
                </td>
                <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">
                  {field.description}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={cn(
                      'text-[10px] font-mono px-1.5 py-0.5',
                      field.nullable
                        ? 'text-muted-foreground bg-muted/30'
                        : 'text-primary bg-primary/10'
                    )}
                  >
                    {field.nullable ? 'YES' : 'NO'}
                  </span>
                </td>
                <td className="p-3 font-mono text-xs text-muted-foreground">
                  {field.example}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
