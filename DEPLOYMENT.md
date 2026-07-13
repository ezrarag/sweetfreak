# Deployment

## Vercel environment variables

### Firebase client

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Firebase Admin

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Stripe

- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_CONNECTED_ACCOUNT_ID`

### Email

- `RESEND_API_KEY`
- `ADMIN_EMAIL`

### Social

- `FACEBOOK_PAGE_ACCESS_TOKEN`
- `FACEBOOK_PAGE_ID`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`

## Stripe webhook setup

- Endpoint: `/api/webhooks/stripe`
- Event: `checkout.session.completed`
- Signature verification: enabled via `STRIPE_WEBHOOK_SECRET`

## Firebase setup checklist

- Enable Google authentication in Firebase Auth.
- Enable Email/Password authentication for customer logins.
- Add your Vercel production domain and preview domains to Firebase Auth authorized domains.
- Create an `adminUsers` collection and add one document per admin using the Firebase auth `uid` as the document ID.
- Create Firestore collections:
  - `products`
  - `orders`
  - `customers`
  - `notifications`
  - `socialPosts`
  - `adminSettings`
- Create a Firebase Storage bucket for product and marketing images.

## Firestore security rules

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return isSignedIn() &&
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }

    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /orders/{orderId} {
      allow create: if isSignedIn();
      allow read: if isAdmin() || (isSignedIn() && resource.data.customerId == request.auth.uid);
      allow update: if isAdmin();
    }

    match /notifications/{notificationId} {
      allow read: if isAdmin() || (isSignedIn() && resource.data.recipientId == request.auth.uid);
      allow create, update: if isAdmin();
    }

    match /customers/{customerId} {
      allow read, write: if isAdmin() || (isSignedIn() && request.auth.uid == customerId);
    }

    match /socialPosts/{postId} {
      allow read, write: if isAdmin();
    }

    match /adminSettings/{docId} {
      allow read, write: if isAdmin();
    }
  }
}
```

## Social media token setup

### Facebook

- Create a Facebook app with Page posting permissions.
- Store `FACEBOOK_PAGE_ID` and `FACEBOOK_PAGE_ACCESS_TOKEN`.
- Optionally save the token through `/admin/marketing/connect`.

### Instagram

- Connect the Instagram business account to the Facebook app.
- Store `INSTAGRAM_BUSINESS_ACCOUNT_ID`.
- Reuse the Facebook Page access token for Graph API calls.

### Twitter / X

- Create a Twitter developer app with write permissions.
- Store:
  - `TWITTER_API_KEY`
  - `TWITTER_API_SECRET`
  - `TWITTER_ACCESS_TOKEN`
  - `TWITTER_ACCESS_SECRET`

## Verification checklist

- Run `next typegen`
- Run `tsc --noEmit`
- Run `next build`
- Confirm `/admin/login`, `/customer/login`, `/admin/dashboard`, `/admin/orders`, `/customer/shop`, and `/customer/orders` all load in the deployed environment
- Confirm Stripe checkout reaches the success page and the webhook creates an order
