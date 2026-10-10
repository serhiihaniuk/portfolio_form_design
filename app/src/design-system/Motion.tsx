import { addTransitionType, startTransition, useState, ViewTransition } from 'react'
import { Button } from '../components/ui/button'
import { RemoveButton } from '../components/ui/chip'
import { C, Code, Demo, DocSection, DocTable, H3 } from './doc'

const POOL = ['LUX KEY – EUR Equity Value', 'HOLT – MSCI World Proxy', 'LUX IM – Global Bond', 'LUX IM – Active Defender', 'HOLT – S&P 500 Proxy', 'LUX FS – Physical Gold']

export function MotionDoc() {
  const [items, setItems] = useState(POOL.slice(0, 3))
  const [page, setPage] = useState(0)
  const [instant, setInstant] = useState(false)
  // Same state change, with or without startTransition — the only difference between "animated" and "instant".
  const run = (fn: () => void) => (instant ? fn() : startTransition(fn))
  const add = () => run(() => setItems((l) => [POOL.find((p) => !l.includes(p)) ?? POOL[0], ...l.filter((x) => x !== (POOL.find((p) => !l.includes(p)) ?? POOL[0]))]))
  const go = (dir: 1 | -1) => run(() => { addTransitionType(dir > 0 ? 'forward' : 'back'); setPage((p) => (p + dir + 3) % 3) })

  return (
    <DocSection
      id="motion"
      kicker="Foundations"
      title="Motion (View Transitions)"
      badge="React <ViewTransition>"
      lead={<>Animations between two states of the page, done by the browser (View Transitions API) and triggered by React. You mark <i>what</i> may animate with <C>&lt;ViewTransition&gt;</C>, and an update animates when it runs inside <C>startTransition</C>. The look of each animation is plain CSS in <C>src/styles/motion.css</C>.</>}
    >
      <H3>How one animation happens</H3>
      <ol className="flex max-w-200 list-decimal flex-col gap-1 pl-5 text-fg-secondary">
        <li>An update runs inside <C>startTransition(() =&gt; setState(…))</C> (in this app: <C>animate(recipe)</C> from the store).</li>
        <li>React finds the <C>&lt;ViewTransition&gt;</C> boundaries the update touches and calls the browser’s <C>document.startViewTransition()</C>.</li>
        <li>The browser takes a picture of each boundary, React applies the update, the browser takes the “after” picture.</li>
        <li>The browser animates between them with pseudo-elements you style in CSS: <C>::view-transition-old(.class)</C> (leaving) and <C>::view-transition-new(.class)</C> (arriving).</li>
      </ol>

      <H3>Try it</H3>
      <label className="mb-2 inline-flex cursor-pointer items-center gap-2 text-xs">
        <input type="checkbox" checked={instant} onChange={(e) => setInstant(e.target.checked)} className="accent-accent" />
        Instant (same updates without <C>startTransition</C>)
      </label>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4">
        <Demo className="flex-col items-stretch">
          <div className="flex items-center justify-between"><span className="text-xs text-fg-muted">enter · exit · move</span><Button size="sm" onClick={add}>Add to top</Button></div>
          <div className="flex flex-col gap-0.5 border border-line bg-surface p-2">
            {items.map((it) => (
              <ViewTransition key={it} enter="item-in" exit="item-out" update="item-move">
                <div className="flex min-h-7.5 items-center justify-between gap-2 bg-surface px-1">
                  {it}
                  <RemoveButton label={'Remove ' + it} onClick={() => run(() => setItems((l) => l.filter((x) => x !== it)))} />
                </div>
              </ViewTransition>
            ))}
          </div>
        </Demo>
        <Demo className="flex-col items-stretch">
          <div className="flex items-center justify-between">
            <span className="text-xs text-fg-muted">transition types: forward / back</span>
            <span className="flex gap-1"><Button size="sm" onClick={() => go(-1)}>Back</Button><Button size="sm" variant="primary" onClick={() => go(1)}>Next</Button></span>
          </div>
          <div className="overflow-hidden border border-line bg-surface">
            <ViewTransition update={{ forward: 'step-forward', back: 'step-back', default: 'none' }} default="none">
              <div className="flex h-24 flex-col justify-center px-4">
                <span className="text-xs text-fg-muted">Step {page + 1} of 3</span>
                <span className="text-lg">{['Model portfolio data', 'Preferences', 'Component selection'][page]}</span>
              </div>
            </ViewTransition>
          </div>
        </Demo>
      </div>

      <H3>Where the app uses it</H3>
      <DocTable heads={['What', 'Boundary', 'CSS classes']} rows={[
        ['Changing step (tabs, Back / Next, links)', <C key="1">{'<ViewTransition update={{ forward: "step-forward", back: "step-back", default: "none" }}>'}</C>, <C key="1b">step-forward · step-back</C>],
        ['Rows in Portfolio components, excluded instruments, exclusion chips', <C key="2">{'<ViewTransition key={id} enter="item-in" exit="item-out" update="item-move">'}</C>, <C key="2b">item-in · item-out · item-move</C>],
        ['Groups in Portfolio components (heading, field, list) below a change', <C key="4">{'<ViewTransition update="group-move">'}</C>, <C key="4b">group-move (glides, no stretch)</C>],
        ['Benchmark details when picking another benchmark', <C key="3">{'<ViewTransition key={id} name="bench-detail" share="swap">'}</C>, <C key="3b">swap (cross-fade)</C>],
      ]} />

      <H3>The pieces</H3>
      <Code>{`
// 1. mark what may animate (class names are yours, styled in CSS)
<ViewTransition enter="item-in" exit="item-out" update="item-move">
  <Row … />
</ViewTransition>

// 2. run the change in a transition (optionally tagged with a type)
startTransition(() => {
  addTransitionType('forward')        // picks update={{ forward: … }}
  setStep(next)
})

/* 3. describe the animation (src/styles/motion.css) */
::view-transition-new(.item-in):only-child { animation: 220ms ease-out both vt-item-in; }
@keyframes vt-item-in { from { opacity: 0; transform: translateX(-12px); } }
`}</Code>

      <H3>Rules</H3>
      <ul className="list-disc pl-5 text-fg-secondary">
        <li>Animate structure changes (add, remove, switch step, swap content), never typing or dragging — those must feel instant, so they use <C>update</C>, not <C>animate</C>.</li>
        <li>Short: 150–250ms, ease-out in, ease-in out, at most 24px of movement. The UI is a tool, not a show.</li>
        <li><C>prefers-reduced-motion</C> turns every view transition off (in motion.css).</li>
        <li>The <b className="font-semibold text-fg">Reduce motion</b> checkbox in the header (on by default) does the same for everything: it sets <C>data-reduce-motion</C> on <C>&lt;html&gt;</C>. Uncheck it to see the demos above move.</li>
        <li>Browsers without View Transitions simply apply the update instantly — nothing breaks.</li>
      </ul>
    </DocSection>
  )
}
