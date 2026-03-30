# 🍔 Food Delivery App

A full-stack food delivery web application built with **Next.js**, demonstrating real-world architecture, UX patterns, and scalable frontend practices.

---

# 🚀 Project Overview

This project implements an online food ordering system where users can:

* Browse shops and products
* Add items to cart
* Place orders
* View order history
* Reorder previous purchases
* Apply discount coupons

The application focuses on **clean architecture**, **state management**, and **production-like UX**.

---

# 🌐 Live Demo & Deployment

## 🔗 Live App

👉 https://delivery-app-henna-zeta.vercel.app

---

## ☁️ Infrastructure

### Frontend & Backend

* Hosted on **Vercel**
* Built with **Next.js App Router**
* Backend implemented via **Next.js API routes**

### Database

* Hosted on **Neon (PostgreSQL)**
* Connected via Prisma ORM

---

## ⚙️ Deployment Details

* Automatic deployments via Vercel
* Environment variables configured in Vercel
* Database connection via `DATABASE_URL`
* Production build:

```bash id="h3g8z2"
npm run build
```

---

## 📦 Production Stack

* Next.js (Vercel)
* PostgreSQL (Neon)
* Prisma ORM
* Redux Toolkit + RTK Query
* Material UI

---

## ✅ Requirement Compliance

✔ Backend built and hosted самостоятельно (без Firebase)
✔ Full-stack решение (frontend + API + DB)
✔ Production deployment

---

# 🧠 Tech Stack

## Frontend

* Next.js (App Router)
* React
* TypeScript
* Material UI (MUI)

## State Management

* Redux Toolkit
* RTK Query

## Forms & Validation

* react-hook-form
* zod
* validator

## Backend

* Next.js API routes

## Database

* PostgreSQL (Neon)
* Prisma ORM

---

# 🗄 Database Models

* `Shop`
* `Product`
* `Order`
* `OrderItem`
* `Coupon`

---

# ⚙️ Setup Instructions

## 1. Install dependencies

```bash id="7y6g4h"
npm install
```

## 2. Setup environment

```env id="z9p3ka"
DATABASE_URL=your_database_url
```

## 3. Run migrations

```bash id="t2m9df"
npx prisma migrate dev
```

## 4. Seed database

```bash id="w8x1bn"
npx prisma db seed
```

## 5. Run project

```bash id="p0k2lm"
npm run dev
```

---

# 📊 Task Completion Level

## 🟢 Base Level (Core Functionality)

* Shops list
* Products list by shop
* Add to cart
* Cart management
* Checkout form
* Create order
* Data persistence in database

---

## 🟡 Middle Level (Extended Features)

* Product filtering (categories)
* Sorting (price, name)
* Shop filtering (rating)
* Pagination
* Form validation (zod)
* Order history
* Reorder functionality

---

## 🔴 Advanced Level (UX & Architecture)

* Coupon system
* Toast notifications
* Loading states (skeletons, buttons)
* Dynamic UI states (cart status)
* Debounced filters
* UX polish and feedback
* Navigation flows (reorder → cart)

---

# 🔄 Key Functional Flows

## 🛒 Add to Cart

* Adds product to Redux store
* Updates UI state
* Shows toast notification

---

## 📦 Create Order

* Validates form
* Sends request to backend
* Stores order in DB
* Clears cart
* Shows success message

---

## 🔁 Reorder

* Loads previous order
* Adds items to cart
* Redirects to cart

---

## 🎟 Apply Coupon

* Validates coupon code
* Applies discount
* Updates total dynamically

---

# ✨ UX Highlights

* Responsive UI
* Loading skeletons
* Toast notifications
* Disabled states
* Clear feedback loops
* Smooth filtering experience

---

# 📁 Project Structure

```id="9k3l2p"
prisma/
src/
  app/
    api/
    cart/
    coupons/
    orders/
    shops/
  components/
  hooks/
  lib/
  store/
```

---

# 🧠 Architecture Decisions

* Redux Toolkit + RTK Query → scalable state & API layer
* App Router → modern Next.js architecture
* Prisma → type-safe database access
* Custom hooks → reusable logic (debounce)
* Separation of concerns across layers

---

# ⚠️ Known Limitations

* Coupon logic is handled on frontend (should be validated on backend in production)
* No authentication system (orders are anonymous)
* No payment integration
* Pagination is client-side (could be server-side for large datasets)
* Minimal error boundary handling

---

# 🚀 Future Improvements

* 🔐 Add authentication (JWT / NextAuth)
* 💳 Integrate payment system (Stripe)
* 🧠 Move coupon validation to backend
* ⚡ Server-side pagination & filtering
* 📱 Improve mobile UX further
* 🧪 Add unit and integration tests
* 🧩 Extract reusable UI components
* 📊 Add analytics / tracking

---

# 🎯 Summary

This project demonstrates:

* Full-stack development using Next.js
* Real-world state management patterns
* Clean and scalable architecture
* Strong UX focus
* Practical e-commerce functionality

---

# 👨‍💻 Author

Myroslav Kolomiiets — Frontend Developer (React / TypeScript)

---


# 📁 Project Structure

```
prisma/
src/
  app/
    api/
    cart/
    coupons/
    orders/
    shops/
  components/
  hooks/
  lib/
  store/
```
# 👨‍💻 Author

Myroslav Kolomiiets — Frontend Developer (React / TypeScript)

---
