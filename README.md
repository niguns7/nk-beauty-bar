# BLUSH — NK Beauty Bar

> 712 W Pipeline Rd Ste 700, Hurst TX 76053

## Backend Pricing & Vagaro Booking Architecture

### HONESTY RULE
> **HONESTY RULE**: Our backend guarantees what the site quotes and records; Vagaro charges. Every bundle must exist as its own bookable Vagaro service at the same price.

The client browser never computes, sends, or alters prices. All prices displayed across the site and inside the reservation flow come exclusively from the PostgreSQL database via our pure pricing engine. When an appointment reservation is confirmed, a guaranteed server `Quote` is recorded with input hashes and time-to-live restrictions before transferring the visitor to Vagaro with campaign tracking parameters attached.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
