---
name: heeve-showcase-builder
description: Create or extend HEEVE storefront showcase examples using the repository's ExampleN/ProductPage/config/CSS pattern, shared catalog components, theme tokens, responsive layouts, and validation workflow.
---

# HEEVE Showcase Builder

Use for creating a new showcase example or materially extending an existing one.

## Repository pattern

Each showcase lives under `src/showcases/exampleN/`:

- `ExampleN.tsx`: landing/storefront page.
- `ProductPage.tsx`: product detail route.
- `config.json`: typed showcase content, theme tokens, contact data, products.
- `exampleN.css`: page-specific layout and responsive styling.
- `product-page.css`: product detail styling.
- `DESIGN.md`: visual/design-system brief when present.

Register new examples in `src/showcases/registry.ts`. Confirm route handling in `src/App.tsx`; product routes use `/showcase/{slug}/product/{number}`.

## Implementation rules

1. Read two nearby examples plus their `DESIGN.md` before writing a new one. Preserve the existing visual concept; do not flatten every showcase into one template.
2. Reuse shared pieces first: `ShowcaseCatalog`, `ShowcaseProductCard`, `ShowcaseInfo`, `ProductGrid`, `ProductGallery`, `useTheme`, and React Bits components already present.
3. Local components are allowed inside `src/showcases/exampleN/` when the design needs showcase-specific structure, interaction, animation, or composition. Keep them small, colocated, and scoped to that example. Do not extract a local component into shared code unless at least two showcases need the same behavior.
4. Keep `config.json` as content, not JSX. Use `ShowcaseConfig` and product fields already defined in `src/types/showcase.ts`.
5. Set page CSS variables from `config.theme[theme]`: `--bg`, `--surface`, `--text`, `--muted`, `--primary`.
6. Use `navigate` for internal navigation. Product CTA URLs must preserve the configured WhatsApp/contact behavior.
7. Import page CSS beside the page component. Scope selectors with the showcase page class to avoid cross-example regressions.
8. Keep product detail pages accessible: labelled back action, visible product title/price, usable CTA, keyboard-closeable dialogs, and meaningful image `alt` text.
9. Make responsive behavior explicit. Test desktop, tablet, and mobile. Preserve two-column grids at tablet widths when the design calls for it; collapse only where content needs it. Keep CTA buttons usable side by side on mobile unless impossible.
10. Avoid new dependencies. Prefer existing components, CSS, browser APIs, and installed React Bits dependencies.
11. Do not copy large third-party components into a showcase when an existing shared or local component already covers the need.
12. Use only `images.unsplash.com` image URLs. Never use images from other hosts, Google thumbnails, Imgur, brand sites, or unverified sources. Before validation, audit every showcase image URL; production releases still require a recorded Unsplash source/license review.

## Minimum workflow

1. Inspect `src/showcases/`, `src/showcases/registry.ts`, `src/App.tsx`, shared catalog/card components, and the target design brief.
2. Add the smallest complete set of files: page, product page, config, scoped CSS, optional local components, and registry entry.
3. Run:

```bash
bun run typecheck
bun run build
git diff --check
```

4. Review mobile layout and theme contrast. Check that images do not overflow, hero art does not cover headings, and light/dark text remains readable.
5. Report changed files and validation results. Do not commit or push unless explicitly requested.

## Content checklist

- Unique `slug`, title, subtitle, company/contact details.
- `showcase` metadata: title, category, description, badge.
- Hero eyebrow/title/description/actions.
- At least one visible product with `number`, category, name, variant, description, price, unit, `photoUrls`, `stockOut`, and `hide`.
- Light and dark theme tokens with adequate contrast.
- Product links resolve to the correct showcase slug and product number.

## Anti-patterns

- Do not hardcode product content inside JSX.
- Do not create a one-off product grid if `ShowcaseCatalog` fits, unless the design requires a genuinely different product interaction or composition.
- Do not create abstractions for one-off behavior; keep showcase-specific components local.
- Do not use absolute positioning for critical mobile content without a tested fallback.
- Do not introduce generic glow/animation effects that conflict with the design brief.
- Do not claim a build, commit, or push succeeded without running the command and checking its output.
