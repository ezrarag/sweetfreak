# SF-06 Summary

Completed:

- Added `src/app/admin/marketing/page.tsx` with a promotion composer and past posts list.
- Added `src/app/api/admin/social/post/route.ts` to save queued/scheduled social posts to Firestore.
- Added `src/lib/social/facebook.ts`, `src/lib/social/instagram.ts`, and `src/lib/social/twitter.ts`.
- Added `src/app/admin/marketing/connect/page.tsx` and a server route to save encrypted social credentials in `adminSettings/social`.
- Added `src/components/admin/PromotionTemplates.tsx` with reusable promotion presets.

Notes:

- Social credential encryption uses a server-side symmetric key derived from existing protected env vars.
- The posting helpers are wired for direct API usage but are not yet attached to a background worker or scheduler.
