# 0004. Tailwind CSS for the essentials, plain CSS for custom animations

## Context

The site combines a fairly standard layout (spacing, typography, colors, grids) with very specific animations: a 3D page turn rotation for the cover, a spinning tomoe, a custom canvas cursor, an ink hover effect.

## Decision

**Tailwind CSS** for the whole layout and design system (custom kraft/ink/red color theme, spacing, typography), and a **separate CSS file** (`animations.css`) for the keyframes and effects that cannot be expressed cleanly with utility classes.

## Why not just one of the two?

- **All Tailwind** would have forced arbitrary values (`[transform:rotateY(-150deg)]`) everywhere for the more complex animations. Past a certain point, utility classes lose their advantage (readability, autocomplete) compared to a real `@keyframes` block.
- **All plain CSS** would have given up Tailwind's iteration speed on everything that is basic layout (90% of the site's visual work), for a level of control that was only needed on a handful of elements.

## Consequences / accepted trade-offs

- Two systems to maintain in parallel instead of one, which requires a clear convention: everything that is *layout* goes through Tailwind classes directly in the JSX, everything that is *choreographed animation* goes through targeted classes defined in `animations.css`, never the other way around.
- The Tailwind theme (`tailwind.config.ts`) reuses the site's exact tokens (colors, fonts) so both systems stay visually consistent with each other.