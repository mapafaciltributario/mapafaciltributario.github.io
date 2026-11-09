<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- This project is a visual copy of the user's real site (deployed elsewhere); the uploaded ZIP lacked `src/lib`, so `src/lib/cakto.functions.ts` and `src/lib/tracking.ts` here are preview-only stand-ins that never charge — never ship them back to the real project.
- `src/lib/plans.ts` mirrors the live site's offers; prices, bonuses and validators live only there.
- In `src/routes/checkout.tsx`, change presentation only: payment, Pix polling, tracking and Pixel logic must stay byte-identical to the user's original so their integration keeps working.
- `src/routes/__root.tsx` holds the user's Meta Pixel and UTMify scripts; leave them untouched.
- Visual effects (glass, glow-ring, scan-line, aurora, tech-grid) are utilities in `src/styles.css`; reuse them instead of ad-hoc styles.
