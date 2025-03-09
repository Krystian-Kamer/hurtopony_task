## Hurtopony Task
This is a simple project to display videos. A free API is provided by tmdb.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## How to start

First, clone my repository and then run the development server:

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

## What I used

I used Next.js, TypeScript, Framer Motion (for animation), Shadcn/ui (a library with ready-made components), nuqs (for url management), Tailwind (for styling), dotenv (for API key storage).

## How the app works

The application displays downloaded videos. We can search for a movie by name or through a filter. There we can choose sorting options and categories. Below is a pagination to change the page. 

When you click on the video, it takes you to the video page, where you will find more details.