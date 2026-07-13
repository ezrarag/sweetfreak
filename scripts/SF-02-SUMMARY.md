# SF-02 Summary

Completed:

- Added `src/middleware.ts` to gate `/admin/**` and `/customer/**` routes based on the Firebase session cookie.
- Created `src/app/admin/login/page.tsx` with Google sign-in and Firestore `adminUsers/{uid}` verification.
- Created `src/app/customer/login/page.tsx` with Google and email/password auth flows.
- Added `src/app/api/auth/session/route.ts` to create and clear a 14-day Firebase session cookie.
- Added `src/lib/auth.ts` with `getServerSession()` and `isAdmin(uid)`.
- Added `src/app/admin/layout.tsx` and `src/app/customer/layout.tsx` with server-side session checks.
- Added minimal placeholder dashboard routes so the login flows have valid redirect targets.

Implementation note:

- The prompt requested admin role checks in middleware, but Firebase Admin + Firestore role checks are not a valid fit for Edge middleware. The implemented split is:
  - middleware: cookie presence + redirect routing
  - server layouts: verified session + Firestore admin role check

Blockers:

- Dependency installation is still blocked by low disk space, so the new Firebase imports could not be executed or type-checked locally.
