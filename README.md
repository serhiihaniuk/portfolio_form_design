# portfolio_form_design

Redesign proposal for the **New model portfolio** flow, plus the design system behind it.

Live page: https://serhiihaniuk.github.io/portfolio_form_design/

A single standalone HTML file (`index.html`): no build step, no dependencies apart from a web font. Everything is clickable; data is illustrative.

## Screens

| Tab | Link | What it does |
|---|---|---|
| Model portfolio data | [#data](https://serhiihaniuk.github.io/portfolio_form_design/#data) | Code, name, currency; benchmark picked from a searchable list with a joined details panel |
| Preferences | [#preferences](https://serhiihaniuk.github.io/portfolio_form_design/#preferences) | Exclusions: search + suggestion chips, threshold scales for rating and ESG, excluded instruments |
| Component selection | [#components](https://serhiihaniuk.github.io/portfolio_form_design/#components) | Catalogue cards with live conflict tags; portfolio components column with instruments and cash |
| Component allocation | [#allocation](https://serhiihaniuk.github.io/portfolio_form_design/#allocation) | Weights per component (typed, ↑/↓ steps), allocation bar, fill remaining / distribute evenly, component details |
| Simulation | [#simulation](https://serhiihaniuk.github.io/portfolio_form_design/#simulation) | Current vs new overview, positions in four views, conflict resolution, redistribute to 100% |
| Design system | [#design](https://serhiihaniuk.github.io/portfolio_form_design/#design) | Tokens, components (variants × states, specs, usage) and patterns |

## Design system

All colours are CSS custom properties in `:root`, mapped to the UBS design-system tokens used on ubs.com (`--col-*`). The Design system page lets you edit any token and see the whole app restyle live; **Copy tokens as CSS** exports the result.
