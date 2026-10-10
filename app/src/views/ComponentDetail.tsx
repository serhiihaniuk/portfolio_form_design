import type { ReactNode } from 'react'
import { benchFor, figures, poolFor, TOP_WEIGHTS, type Component } from '../data/data'
import { f2 } from '../state/portfolio'

/** Component details (summary, figures, benchmark, risk/return, top 10). Used by the Allocation panel and the Learn more modal. */
export function ComponentDetail({ c }: { c: Component }) {
  const f = figures(c)
  return (
    <>
      <p className="mt-3 max-w-205 text-fg-secondary">{c.desc} The currency risk is not hedged.</p>
      <div className="mt-4.5 flex flex-wrap gap-x-12 gap-y-4">
        <Stat label="Benchmark risk" value={f2(f.r3) + '%'} sub="3 years" />
        <Stat label="Benchmark return" value={f2(f.y3) + '%'} sub="3 years" />
        <Stat label="Current investments" value={String(f.n)} sub="Single instruments" />
      </div>
      <div className="mt-5.5 grid grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] items-start gap-x-7 gap-y-5">
        <div className="flex min-w-0 flex-col gap-5">
          <MiniTable caption="Benchmark" heads={['Index', 'Weight']} numFrom={1} rows={benchFor(c).map(([n, w]) => [n, w + '%'])} />
          <MiniTable
            caption="Risk and return"
            heads={['Period', 'Risk', 'Return']}
            numFrom={1}
            rows={[['YTD', '—', f2(f.ytd) + '%'], ['1 year', f2(f.r1) + '%', f2(f.y1) + '%'], ['3 years', f2(f.r3) + '%', f2(f.y3) + '%'], ['5 years', f2(f.r5) + '%', f2(f.y5) + '%']]}
          />
        </div>
        <MiniTable
          caption="Top 10 positions"
          heads={['Name', 'ISIN', 'Weight']}
          numFrom={2}
          rows={poolFor(c).map(([n, isin], i) => [n, <span key="i" className="text-xs text-fg-muted">{isin}</span>, TOP_WEIGHTS[i] + '%'])}
        />
      </div>
    </>
  )
}

export function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="text-xs text-fg-muted">{label}</div>
      <div className="text-2xl tabular-nums">{value}</div>
      <div className="text-xs text-fg-muted">{sub}</div>
    </div>
  )
}

/** Small bordered table with a caption above (details panels). */
export function MiniTable({ caption, heads, rows, numFrom }: { caption: string; heads: string[]; rows: ReactNode[][]; numFrom: number }) {
  const num = (i: number) => (i >= numFrom ? 'text-right tabular-nums' : 'text-left')
  return (
    <table className="w-full border-collapse border border-line bg-surface text-xs">
      <caption className="pb-1.5 text-left text-fg-muted">{caption}</caption>
      <thead>
        <tr>{heads.map((h, i) => <th key={h} className={'border-b border-surface-muted bg-surface-subtle px-2.5 py-1.5 font-normal text-fg-muted ' + num(i)}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>{r.map((v, i) => <td key={i} className={'border-t border-line px-2.5 py-1.5 ' + num(i)}>{v}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}
