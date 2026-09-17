# Next.js Persian & Jalali Date Guide (App Router & SSR)

> How to render Persian (Shamsi) dates seamlessly in Next.js Server Components, Client Components, and Edge Middleware without hydration mismatch.

## Why `persian-date-native` in Next.js?
- **SSR & Server Components Ready**: Works on Node.js and Edge runtimes with 0 native C++ dependencies or browser-only APIs.
- **Zero Hydration Mismatch**: Predictable ISO and timestamp parsing guarantees identical server and client outputs.
- **Micro-Bundle**: Tree-shakeable ESM export under 5.7 KB Gzipped.

## Installation
```bash
npm install persian-date-native
```

## Server Component Example (App Router)
```tsx
// app/posts/[slug]/page.tsx
import { persianDate } from "persian-date-native";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  const publishDate = persianDate(new Date(post.publishedAt));

  return (
    <article className="post">
      <h1>{post.title}</h1>
      <div className="meta" dir="rtl">
        <span>تاریخ انتشار: </span>
        <time dateTime={publishDate.toISOString()}>
          {publishDate.formatFa("dddd D MMMM YYYY - ساعت HH:mm")}
        </time>
      </div>
      <div className="content">{post.content}</div>
    </article>
  );
}
```

## Client Component Example (`"use client"`)
```tsx
"use client";

import React, { useState } from "react";
import { persianDate } from "persian-date-native";

export function DateSelector() {
  const [selected, setSelected] = useState(() => persianDate());

  return (
    <div className="date-picker-container">
      <p>تاریخ انتخاب شده: {selected.formatFa("YYYY/MM/DD")}</p>
      <button onClick={() => setSelected(selected.add(1, "day"))}>
        روز بعد (+1)
      </button>
      <button onClick={() => setSelected(selected.subtract(1, "day"))}>
        روز قبل (-1)
      </button>
    </div>
  );
}
```
