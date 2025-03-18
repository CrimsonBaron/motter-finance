# Motter Finance

A personal finance tracker built with Next.js and PocketBase.

## Features

* **Account Management:** Add, edit, and track your various financial accounts (e.g., checking, savings, credit cards).
* **Goal Setting:** Define financial goals, set target amounts, and monitor your progress.
* **Transaction Tracking:** (To be implemented) Record income and expenses to get a clear overview of your spending habits.
* **Reporting and Visualization:** (To be implemented) Generate reports and charts to visualize your financial data and trends.

## Tech Stack

* [Next.js](https://nextjs.org/): React framework for building performant web applications.
* [PocketBase](https://pocketbase.io/): Open-source backend with a built-in database, file storage, and user authentication.
* [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
* [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript that adds static typing.
* [Radix UI](https://www.radix-ui.com/): Set of unstyled, accessible components

## Prerequisites

* [Node.js](https://nodejs.org/) (>=18)
* [pnpm](https://pnpm.io/installation)
* [PocketBase](https://pocketbase.io/): Make sure you have the PocketBase executable. You can download it from the official website.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd motter-finance
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up PocketBase:**

    * Go to the `pocketbase` directory
    * Run PocketBase:

        ```bash
        ./pocketbase serve
        ```

    * Create an admin user in PocketBase
    * Go to `http://127.0.0.1:8090/_/` to view the PocketBase admin UI.

4.  **Copy `.env.example` to `.env.local`**

    ```bash
    cp .env.example .env.local
    ```

5.  **Add your PocketBase URL to `.env.local`**

    ```bash
    NEXT_PUBLIC_POCKETBASE_URL=[http://127.0.0.1:8090](https://www.google.com/search?q=http://127.0.0.1:8090)
    ```

6.  **Run the development server:**

    ```bash
    pnpm dev
    ```

7.  **Open your browser:**

    * Go to `http://localhost:3000` to view the application.

## Development

###   Directory Structure

    ```
    ├── app
    │   ├── accounts
    │   │   └── actions.ts       # Server actions for account management
    │   ├── goals
    │   │   └── actions.ts          # Server actions for goal management
    │   ├── page.tsx              # Home page
    │   └── globals.css           # Global styles
    ├── components              # Reusable UI components
    ├── lib
    │   ├── utils.ts              # Utility functions
    │   ├── types
    │   │   ├── account-types.ts  # TypeScript types for accounts
    │   │   └── goal-types.ts     # TypeScript types for goals
    ├── middleware.ts           # Middleware configuration
    ├── pocketbase              # PocketBase files
    │   ├── pb_data             # Data directory (not tracked)
    │   ├── pb_migrations       # Database schema migrations
    │   └── pocketbase          # PocketBase executable (not tracked)
    ├── public                  # Static assets
    ├── .env.local              # Local environment variables
    ├── next.config.mjs         # Next.js configuration
    ├── package.json            # Project dependencies and scripts
    ├── pnpm-lock.yaml          # Lockfile for pnpm
    ├── postcss.config.mjs      # PostCSS configuration
    ├── README.md               # Project documentation
    ├── tailwind.config.ts      # Tailwind CSS configuration
    └── tsconfig.json           # TypeScript configuration
    ```

###   Key Files and Their Purpose

* `app/accounts/actions.ts`:   Next.js server actions for handling account-related operations (create, update, delete).
* `app/goals/actions.ts`:   Next.js server actions for handling financial goal-related operations.
* `lib/types/`:   Contains TypeScript types for data structures used in the application, such as `account-types.ts` and `goal-types.ts`.
* `pocketbase/`:   Directory containing PocketBase configuration, data, and migrations.
* `middleware.ts`:   Next.js middleware for handling authentication and authorization (if implemented).

###   Dependencies

    * Core
        ```json
        "next": "^14.1.0",
        "react": "^18",
        "react-dom": "^18",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.0",
        "tailwind-merge": "^2.2.1",
        "tailwindcss-animate": "^1.0.7"
        ```
    * UI
        ```json
        "@radix-ui/react-dialog": "^1.0.5",
        "@radix-ui/react-label": "^2.0.2",
        "@radix-ui/react-slot": "^1.0.2",
        "@radix-ui/react-toast": "^1.1.5",
        "@tanstack/react-query": "^5.17.10",
        "cmdk": "^0.2.0",
        "lucide-react": "^0.303.0",
        "sonner": "^1.3.1"
        ```
    * Database
        ```json
        "pocketbase": "^0.19.0"
        ```
    * Zod
        ```json
        "zod": "^3.22.4"
        ```
    * Dev Dependencies
        ```json
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        "autoprefixer": "^10.0.1",
        "eslint": "^8",
        "eslint-config-next": "14.1.0",
        "postcss": "^8",
        "prettier": "^3.1.1",
        "prettier-plugin-tailwindcss": "^0.5.10",
        "tailwindcss": "^3.3.0",
        "typescript": "^5"
        ```

