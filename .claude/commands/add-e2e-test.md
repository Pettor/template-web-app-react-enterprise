# Add E2E Test

Add a new end-to-end test using Playwright. This may involve adding new API services, mock definitions, and test specs.

## Input

$ARGUMENTS

## Requirements

### Test Structure

E2E tests are located in `apps/e2e/src/specs/`. Follow the existing pattern:

```typescript
import { mocksClient } from "@package/mocks";
import { test, expect } from "@playwright/test";

test.describe("<feature-name>.<scenario>", () => {
  test.beforeEach(async () => {
    // Control mock server behavior for this test group
    await mocksClient.useRouteVariant("<OperationId>:<variant-name>");
    // OR restore defaults:
    // await mocksClient.restoreRouteVariants();
  });

  test("<description of what is being tested>", async ({ page }) => {
    await page.goto("/");

    // Use async assertions with .toPass() for navigation/state changes
    await expect(async () => {
      expect(await page.title()).toBe("Expected Title");
    }).toPass();

    // Interact with elements using data-testid selectors
    await page.getByTestId("component__element").fill("value");
    await page.getByTestId("component__button").click();

    // Assert final state
    await expect(async () => {
      expect(await page.title()).toBe("New Title");
    }).toPass();
  });
});
```

### Key Patterns

- **Selectors**: Use `page.getByTestId("component__element")` as the primary selector strategy
- **Assertions**: Wrap navigation/async state assertions in `await expect(async () => { ... }).toPass()`
- **Mock control**: Use `mocksClient.useRouteVariant(id)` to set specific API responses per test
- **Route variant IDs**: Format is `<OperationId>:<example-name>` matching the OpenAPI definition
- **Base URL**: Tests run against `https://localhost:5173` with hash-based routing (`#/`)
- **File naming**: `<feature>.spec.ts` in `apps/e2e/src/specs/`

### If a New API Endpoint Is Needed

When the feature under test requires a new API endpoint, you must update multiple packages:

#### 1. Add API Service in `packages/api/src/Api/`

Create a new folder `packages/api/src/Api/<EndpointName>/` with these files:

**Classes.ts** - Domain types and query keys:
```typescript
export const QUERY_KEY_<NAME> = ["<name>"] as const;

export interface <EndpointName> {
  // domain fields
}
```

**Schema.ts** - Zod validation schema for the DTO:
```typescript
import { z } from "zod";

export const <endpointName>Schema = z.object({
  // fields matching the API response
});

export type <EndpointName>Dto = z.infer<typeof <endpointName>Schema>;
```

**Convert.ts** - DTO to domain type converter:
```typescript
import type { <EndpointName> } from "./Classes";
import type { <EndpointName>Dto } from "./Schema";

export function <endpointName>ConvertFromDto(dto: <EndpointName>Dto): <EndpointName> {
  return {
    // map fields
  };
}
```

**Post.ts / Get.ts** - Service function and React Query hook:
```typescript
import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../Client/ApiClient";
import { ServiceErrorFactory } from "../../Service/ServiceErrorFactory";
import type { ApiError } from "../../Worker/ApiWorkerReponse";
import type { <EndpointName>Data } from "./Classes";

export async function post<EndpointName>(data: <EndpointName>Data): Promise<void> {
  try {
    await apiClient.post("/api/<endpoint>", data);
  } catch (e: unknown) {
    throw ServiceErrorFactory.create(e);
  }
}

export function usePost<EndpointName>Mutate(): UseMutationResult<void, ApiError, <EndpointName>Data> {
  return useMutation<void, ApiError, <EndpointName>Data>({
    mutationFn: async (data) => await post<EndpointName>(data),
  });
}
```

#### 2. Add Mock Definition in `tools/mock/mocks/fixtures/openapi.json`

Add the new endpoint path under `paths` and any new schemas under `components.schemas`. Include response examples under `components.examples` so variant routes are automatically generated.

The mock server uses the OpenAPI definition to generate route variants. Each response example becomes a route variant with the ID format: `<OperationId>:<example-name>`.

#### 3. Update Mock Utilities if Needed

If new helper functions are needed for test setup, add them to `packages/mocks/src/`.

#### 4. Update Package Barrels

If you added any new files to a `packages/*` package, add an `export * from "./Path/To/File"` line to that package's `src/index.ts`.

### After Creating Files

1. Update the package `src/index.ts` barrel for any new files added to `packages/*`
2. Run `pnpm lint:fix` to ensure code quality
3. Start mock server and dev server: `pnpm dev:mocks`
4. Run the specific test: `pnpm test:e2e` or target a specific file with `pnpm --filter=@app/e2e exec playwright test src/specs/<file>.spec.ts`

## Checklist

- [ ] Created test spec file in `apps/e2e/src/specs/`
- [ ] Used `mocksClient` to control API responses per test scenario
- [ ] Used `data-testid` selectors for element interaction
- [ ] Used `.toPass()` wrapper for async navigation assertions
- [ ] If new API needed: created service files in `packages/api/src/Api/<Name>/`
- [ ] If new API needed: added endpoint + schemas + examples to `tools/mock/mocks/fixtures/openapi.json`
- [ ] Updated any relevant `src/index.ts` barrels in `packages/*`
- [ ] Ran `pnpm lint:fix`
- [ ] Verified tests pass with `pnpm test:e2e`
