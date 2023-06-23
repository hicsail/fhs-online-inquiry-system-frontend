# FHS Online Inquiry System (frontend)

The Online Inquiry System is a platform that allows users to browse data available from the FHS BROC program. This repo is the frontend part of the whole plateform

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version 14 or later)
- npm (Node Package Manager)

_Note: Node version 14 is the least requirement. Version 16 or above is recommended._

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your/repo.git
   ```
2. Navigate into the project directory:
   ```bash
   cd fhs-online-inquiry-system-frontend
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server, run the following command:

```bash
npm run dev
```

This will launch the development server provided by Vite. You can access your application in your browser at `http://localhost:5173`.

As you make changes to your code, the development server will automatically reload and reflect the updates in the browser.

## Building for Production

To build your project for production, run the following command:

```bash
npm run build
```

This command will execute the TypeScript compiler (`tsc`) to compile your TypeScript code and then build the project using Vite. The output will be generated in the `dist` folder.

## Linting

To lint your code and ensure code quality, you can run the following command:

```bash
npm run prettier
```

This command will use the `prettier` linter to analyze your TypeScript and TypeScript React files in the `src` folder. It will report any linting issues and enforce coding standards.

You can also run the following command to automatically fix formatting issues:

```bash
npm run prettier:fix
```
