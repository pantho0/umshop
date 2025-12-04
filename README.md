# 🛒 UMSHOP: Role-Based E-commerce Platform

A comprehensive e-commerce solution built with a Next.js frontend, focusing on secure role-based access control and integrated multi-channel payment processing.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ADD%20LINK%20HERE-blue?style=for-the-badge)](https://umshop.vercel.app/)
[![Requirement Analysis](https://img.shields.io/badge/Requirement%20Analysis-View%20Docs-lightgrey?style=for-the-badge)](./docs/UMSHOP.png)

UMSHOP features a robust product management interface powered by a rich text editor, enabling Admins to effortlessly manage product listings and secure transactions via Stripe and SSLCommerz.

---

## 💻 Tech Stack

This project leverages modern frontend technologies and integrated tools to deliver a fast, reliable, and maintainable e-commerce experience.

### Core Technologies

| Component            | Technologies Used                |
| :------------------- | :------------------------------- |
| **Framework**        | Next.js (Frontend)               |
| **State Management** | Redux JS Toolkit                 |
| **Rich Text Editor** | Tiptap Editor                    |
| **Access Control**   | Role-Based Access Control (RBAC) |

### Tools & Libraries

|                                                                                                                                   |                                                                                                                                            |                                                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) |        [![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)         |            [![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)             |
|   [![Tiptap](https://img.shields.io/badge/Tiptap-F59E0B?style=for-the-badge&logo=tiptap&logoColor=white)](https://tiptap.dev/)    | [![SSLCommerz](https://img.shields.io/badge/SSLCommerz-2E8B57?style=for-the-badge&logo=none&logoColor=white)](https://www.sslcommerz.com/) | [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) |

---

## 🚀 Key Features

### 👤 Role-Based Access Control (RBAC)

- **Admin Role:** Full administrative privileges, including product management, user management, and viewing sales analytics.
- **Customer Role:** Can browse products, manage shopping cart, and complete checkout.
- Protected routes ensuring only authorized users can access specific pages (e.g., `/admin/*`).

### 📦 Product Management (Admin)

- **CRUD Operations:** Create, Read, Update, and Delete product listings.
- **Rich Text Descriptions:** Use the **Tiptap editor** to create detailed, visually appealing product descriptions, specifications, and features (as required by **FR-PROD-02** in the Requirement Analysis).
- Categorization and inventory tracking.

### 💳 Secure Payment Gateways

- **Stripe Integration:** For international, card-based transactions (**FR-PAY-01**).
- **SSLCommerz Integration:** For localized payment solutions (**FR-PAY-02**).
- Secure checkout flow managed by **Redux** state (**FR-CART-02**).

### 🖼️ Seamless Shopping Experience (Customer)

- Intuitive product browsing and search functionality.
- Redux-powered persistent shopping cart management.
- One-page checkout process.

---

<p align="center">
    <img src="https://img.shields.io/badge/SETUP%20REQUIRED-Create%20.env.local%20from%20example.env.local-red?style=for-the-badge&labelColor=black"/>
</p>

## 🛠️ Project Setup

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone [https://github.com/pantho0/umshop.git]
cd umshop-client

# Install dependencies
npm install

# Run the development server
npm run dev

```
