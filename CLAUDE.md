# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `pnpm dev` - Start development server (main app at localhost:5173)
- `pnpm dev:mocks` - Start development with mock server enabled
- `pnpm dev:mocks:cli` - Start standalone mock server
- `pnpm storybook` - Start Storybook development server

### Build & Deploy
- `pnpm build` - Build all apps for production
- `pnpm deploy` - Build and prepare deployment artifacts
- `pnpm storybook:build` - Build Storybook static files

### Testing
- `pnpm test` - Run all unit tests with Vitest
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm test:e2e` - Run Playwright end-to-end tests (requires dev server running)
- `pnpm test:e2e:headless` - Run E2E tests in headless mode

### Code Quality
- `pnpm lint` - Run ESLint across all packages
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm format` - Format code with Prettier

### Utilities
- `pnpm clean` - Clean build artifacts
- `pnpm generate:exports` - Generate barrel exports for packages

## Architecture Overview

This is a **Turborepo monorepo** with a layered architecture:

### Apps Structure
- `apps/web/` - Main React application (Vite + React 19)
- `apps/storybook/` - Storybook configuration and stories
- `apps/e2e/` - Playwright end-to-end tests
- `apps/mock/` - Mock server configuration using Mocks Server

### Packages Structure
- `packages/ui/` - Shared UI components with Storybook stories
- `packages/api/` - API client, data fetching, and authentication logic
- `packages/react/` - React utilities and custom hooks
- `packages/mocks/` - Mock data and test utilities
- `packages/storybook/` - Storybook decorators and utilities

### Configs Structure
- `configs/eslint/` - Shared ESLint configurations
- `configs/tailwind/` - Shared Tailwind CSS configurations
- `configs/typescript/` - Shared TypeScript configurations

## Key Architectural Patterns

### Web App Architecture (`apps/web/src/`)
- **Core**: Application setup, providers, theming, routing, and authentication
- **Pages**: Route-level components with loaders and hooks
- **Components**: Reusable UI components organized by category (actions, forms, views, etc.)
- **Classes**: TypeScript interfaces and business logic
- **Atoms**: Jotai state management atoms

### Authentication Flow
- Uses JWT tokens with refresh token mechanism
- AuthProvider manages global authentication state via useReducer
- PrivateRouteLogic/PublicRouteLogic handle route protection
- Token refresh attempted on app initialization

### Routing Strategy
- Hash-based routing with React Router v6
- Lazy-loaded routes for code splitting
- Separate route definitions for public/private routes
- Route-level data loading with React Query

### State Management
- **Global State**: Jotai atoms for theme and app-level state
- **Server State**: React Query for API data fetching and caching
- **Authentication**: React Context with useReducer pattern
- **Component State**: React hooks for local component state

### Styling Approach
- Tailwind CSS for utility-first styling
- HeroUI component library for consistent design system
- CSS-in-JS via Tailwind for dynamic theming
- Responsive design with mobile-first approach

## Development Workflow

### Making Changes
1. Work in feature branches from `main`
2. Use TypeScript for all new code
3. Follow existing naming conventions and file structure
4. Add Storybook stories for new UI components
5. Write tests for new functionality

### Testing Requirements
- Unit tests with Vitest for utilities and hooks
- Component tests via Storybook testing
- E2E tests with Playwright for critical user flows
- Visual regression testing via Storybook

### Build Process
- Turborepo orchestrates builds across all packages
- Vite handles web app bundling and optimization
- Automatic barrel exports generation for packages
- Deployment artifacts generated in `output/` directory

## Important Notes

### Package Management
- Uses pnpm with workspace configuration
- Specific package versions locked via pnpm overrides
- Node.js 18+ required, < 23.0.0

### Environment Setup
- Enable corepack for automatic pnpm usage
- Mock server runs on different port for API mocking
- PWA configuration for offline functionality

### Code Organization
- Barrel exports auto-generated via barrelsby
- Consistent folder structure across packages
- TypeScript strict mode enabled
- Husky pre-commit hooks for code quality