---
title: Supabase Auth.
description: Authenticate and authorize your users with Supabase Auth.
excerpt: Supabase is an open source Firebase alternative. We are building the features of Firebase using scalable, open source products.
coverImage: /assets/blog/dynamic-routing/cover.jpg
date: '2020-08-05T05:35:07.322Z'
author:
  name: Paul Copplestone
  picture: https://github.com/kiwicopple.png
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
tags:
  - supabase
---


Supabase is an open source Firebase alternative. We are building the features of Firebase using scalable, open source products. 

Two months ago a developer discovered Supabase and (unexpectedly) [launched us on Hacker News](https://news.ycombinator.com/item?id=23319901). Although we had completed only 3 months of development the community support was both incredible and humbling.

<!--truncate-->

![This image shows all of the top dev tool launches on Hacker news. The most popular is Stripe, with 1249 upvotes, the next popular is Supabase with 1120 upvotes, and third is Fly.io with 626 upvotes.](/img/supabase-hn-launch.png)

Developers were obviously excited about the prospect of an open source Firebase alternative, but the comments were dominated by one emphatic feature request: Auth.

> " _Just FYI, making a good auth solution in Supabase will instantly make me a customer._ "<br /><small>@pdimitar</small>

> " _For me the MVP, before I could use it for my commercial projects, would be: DB+auth. At that point, I could switch - and probably would._ "<br /><small>@julianeon</small>

> " _This looks great, however at first peek it doesn't mention anything about auth. Do you have any plans for that? For me this is the topic I most want to just delegate to the service._ "<br /><small>@2mol</small>

So we got to work, and today we're ecstatic to launch Supabase Auth. Let's dig into some of the features of the Auth system.

## Supabase Auth 

Supabase Auth provides all the backend services you need to authenticate and authorize your users.

### User management

Supabase makes it simple to onboard your users with our new `supabase.auth.signup()` and `supabase.auth.login()` [functions](/docs/library/user-management).

<video width="99%" autoplay="autoplay" loop muted playsInline controls="true">
<source src="/videos/auth-zoom2.mp4" type="video/mp4" loop muted playsInline />
</video>

### Row Level Security

Authentication only gets you so far. When you need granular authorization rules, nothing beats PostgreSQL's [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html). Supabase makes it simple to turn RLS on and off.

<video width="99%" autoplay="autoplay" loop muted playsInline controls="true">
<source src="/videos/rls-zoom2.mp4" type="video/mp4" loop muted playsInline />
</video>

### Policies

[Policies](https://www.postgresql.org/docs/current/sql-createpolicy.html) are PostgreSQL's rule engine. They are incredibly powerful and flexible, allowing you to write complex SQL rules which fit your unique business needs. 

<video width="99%" autoplay="autoplay" loop muted playsInline controls="true">
<source src="/videos/policies-zoom2.mp4" type="video/mp4" loop muted playsInline />
</video>

With policies, your database becomes the rules engine. Instead of repetitively filtering your queries, like this ...

```js
const loggedInUserId = 'd0714948'
let user = await supabase
    .from('users')
    .select('user_id, name')
    .eq('user_id', loggedInUserId)

// Returns { id: 'd0714948', name: 'Jane' }
```

... you can simply define a rule on your database table, `auth.uid() = user_id`, and your request will return the rows which pass the rule, even when you remove the filter from your middleware:

```js
let user = await supabase
    .from('users')
    .select('user_id, name')

// Still returns { id: 'd0714948', name: 'Jane' }
```

### Open source

Building an open source Firebase alternative is difficult task, made possible by an amazing suite of OSS tools that have forged the way for Supabase. We spent many weeks building Auth POC's with existing OSS tools. Notable mentions go to RedHat's [KeyCloak](https://www.keycloak.org/), and Ory's [Kratos](https://github.com/ory/kratos). 

Ultimately we landed on a system which utilises three amazing open source products: 

- Authorization: [PostgreSQL](https://www.postgresql.org/) and [PostgREST](http://postgrest.org/en/v7.0.0/auth.html).
- Authentication: Netlify's [GoTrue](https://github.com/netlify/gotrue) server, which we forked and will continue to contribute to.

### Next steps

Supabase has a culture of shipping early and often. Our Auth release is another example of this, and we still have a lot of work to do. Next month we have more Auth features planned, including custom email templates and 3rd-party OAuth providers. We also plan to simplify the Policy interface, enabling non-technical users to get started with one of PostgreSQL's best features.

### Get started

Supabase Auth is ready for you to start using today, free of charge: [app.supabase.io](https://app.supabase.io)

To see the full power of our auth system, watch [this demo](https://youtu.be/2oqIZW5S-lQ) where I deploy a secure, real-time slack clone to Vercel in less than 3 minutes.