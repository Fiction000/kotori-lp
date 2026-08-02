---
target: LiteraryGutters writing waterfall
total_score: 15
max_score: 20
na_heuristics: 3,5,7,9,10
p0_count: 0
p1_count: 1
timestamp: 2026-08-01T14-22-14Z
slug: src-components-literarygutters-astro
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | The scroll sequence is clear; this surface has little system state. |
| 2 | Match System / Real World | 4 | The paper palette, real reader screens, and vertical prose fit Kotori closely. |
| 3 | User Control and Freedom | n/a | Persuasion page with no reversible workflow. |
| 4 | Consistency and Standards | 3 | The feature system is coherent, but readable prose is treated as disposable texture. |
| 5 | Error Prevention | n/a | No consequential input or transaction. |
| 6 | Recognition Rather Than Recall | 3 | Screenshots, kanji, titles, and short descriptions make features easy to scan. |
| 7 | Flexibility and Efficiency | n/a | No repeated product workflow on this surface. |
| 8 | Aesthetic and Minimalist Design | 2 | Strong center composition; arbitrary text endings weaken the craft. |
| 9 | Error Recovery | n/a | No error state on this surface. |
| 10 | Help and Documentation | n/a | The landing page does not need separate help. |
| **Total** | | **15/20** | **Good, with one release-level craft defect** |

# Design Specificity Verdict

The waterfall is strongly authored for Kotori. It joins the app's real vertical-reader screens, large kanji cues, warm paper palette, and Japanese classics into one clear visual language. The idea is specific; the clipping rule is not finished.

The deterministic detector returned zero findings for `src/components/LiteraryGutters.astro`. That is a blind spot, not proof that the component is sound: the detector does not reason about semantic sentence endings inside generated vertical text. Browser geometry found that every visible stream overflows its own fixed-height box.

No user-visible Impeccable overlay was injected. Mutable injection preflight passed, but the overlay server would have written project-local state during this read-only assessment. Screenshots and computed geometry were used instead.

# Overall Impression

The new wall finally has the abundance and uneven rhythm the concept needed. The remaining flaw is precise: the browser clips complete source passages at arbitrary pixel heights, so most visible excerpts stop mid-thought. For a product promising careful literary reading, that small technical rule carries a large symbolic cost.

# What's Working

- The waterfall unmistakably belongs to Kotori; it does not look like generic Japanese decoration.
- At 1440px, the side fields stay outside the 72rem content column, protecting screenshots and feature copy.
- Mobile shows a smaller eight-stream subset with no horizontal overflow at 390px or 320px.

# Priority Issues

## [P1] Interior streams stop mid-sentence

**Why it matters:** At 1440px, all 24 streams have `scrollHeight > clientHeight`; 20 stop inside their own boxes without touching a section boundary. At 390px and 320px, all eight visible streams do the same. Readable Japanese prose therefore looks broken rather than deliberately continuous.

**Fix:** Preserve the abundance, but author each visible stream as a punctuation-bounded fragment sized for its allotted height. Let only streams that physically enter or leave the Features boundary crop. If an interior fragment must disappear, end it with a short directional fade after punctuation instead of a hard hidden edge.

**Suggested command:** `$impeccable adapt`

## [P2] Four boundary streams are clipped too aggressively

**Why it matters:** `wagahai` crosses the top boundary; `oku-no-hosomichi`, `nekomata`, and `aozora-morning` cross the bottom. Boundary cropping can sell continuity, but starting at 93-96% gives the final streams too little room to form a readable gesture.

**Fix:** Keep one or two boundary crossings as intentional continuation. Move the other late streams upward or shorten them to a complete phrase so the section ends with a composed cadence.

**Suggested command:** `$impeccable layout`

## [P2] The responsive density change is abrupt

**Why it matters:** The component jumps from eight small streams to all 24 at 1280px. That single breakpoint changes the feature section from sparse edge marginalia to a dense wall and risks awkward intermediate laptop widths.

**Fix:** Add a middle density tier or progressively reveal streams between 1280px and the full 1440px composition. Keep the central column protected at every step.

**Suggested command:** `$impeccable adapt`

# Persona Red Flags

- **Jordan, first-time visitor:** The product proof remains readable, but the legible side prose competes for attention and then cuts off, making it unclear whether it is content or decoration.
- **Riley, detail-sensitive literature reader:** Riley will notice that respected texts stop mid-thought. That conflicts directly with Kotori's promise of careful reading.
- **Casey, mobile visitor:** No horizontal overflow occurs, but pale clipped fragments at 320px can resemble a rendering defect instead of deliberate marginalia.

# Minor Observations

- The masks fade horizontally toward the content but do not soften each stream's vertical terminal edge.
- `data-source` preserves provenance in markup, but sighted visitors have no visual contract explaining whether these are quotes or texture.
- The large gaps between feature rows make isolated fragments more noticeable, which amplifies bad cutoffs.

# Questions to Consider

- If a visitor can read the prose, should every interior fragment end with the same editorial care as the product copy?
- Which one or two streams should visibly cross the Features boundary to imply continuation?
- Can the waterfall stay abundant while each visible unit becomes a deliberately chosen phrase rather than an arbitrary slice of a longer passage?
