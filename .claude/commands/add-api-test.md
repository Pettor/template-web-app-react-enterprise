# Add API Test

Add unit tests for API services in `packages/api/`.

## Input

$ARGUMENTS

## Requirements

### Overview

API tests in this project use **Vitest** with a Node.js environment. Tests validate Zod schemas, DTO converters, service error handling, and other API utilities. Tests are co-located with the source files as `<FileName>.test.ts`.

### Test File Location

Tests are placed next to the file they test:
- `packages/api/src/Api/<EndpointName>/Schema.test.ts` — tests for Zod schemas
- `packages/api/src/Api/<EndpointName>/Convert.test.ts` — tests for DTO converters
- `packages/api/src/Service/<FileName>.test.ts` — tests for service utilities
- `packages/api/src/Client/<FileName>.test.ts` — tests for client utilities
- `packages/api/src/Worker/<FileName>.test.ts` — tests for worker utilities
- `packages/api/src/Token/<FileName>.test.ts` — tests for token utilities

### Schema Test Pattern

Test that Zod schemas correctly validate, reject, and strip data:

```typescript
import { describe, expect, it } from "vitest";
import { myEndpointSchema } from "./Schema";

describe("myEndpointSchema", () => {
  it("parses valid data", () => {
    const result = myEndpointSchema.parse({ field: "value", count: 42 });
    expect(result.field).toBe("value");
    expect(result.count).toBe(42);
  });

  it("rejects data with missing required fields", () => {
    expect(() => myEndpointSchema.parse({})).toThrow();
  });

  it("rejects data with wrong field types", () => {
    expect(() => myEndpointSchema.parse({ field: 123 })).toThrow();
  });

  it("rejects null", () => {
    expect(() => myEndpointSchema.parse(null)).toThrow();
  });

  it("strips extra fields", () => {
    const result = myEndpointSchema.parse({ field: "value", count: 1, extra: "ignored" });
    expect(result).not.toHaveProperty("extra");
  });
});
```

### Converter Test Pattern

Test that DTO-to-domain converters correctly map fields:

```typescript
import { describe, expect, it } from "vitest";
import { myEndpointConvertFromDto } from "./Convert";

describe("myEndpointConvertFromDto", () => {
  it("maps all fields from the DTO", () => {
    const dto = { field: "value", count: 42 };
    const result = myEndpointConvertFromDto(dto);
    expect(result.field).toBe("value");
    expect(result.count).toBe(42);
  });

  it("returns an object with only the expected fields", () => {
    const dto = { field: "value", count: 1 };
    const result = myEndpointConvertFromDto(dto);
    expect(Object.keys(result)).toEqual(["field", "count"]);
  });

  it("preserves edge case values", () => {
    const dto = { field: "", count: 0 };
    const result = myEndpointConvertFromDto(dto);
    expect(result.field).toBe("");
    expect(result.count).toBe(0);
  });
});
```

### Service / Utility Test Pattern

Test error handling, type guards, and utility functions:

```typescript
import { describe, expect, it } from "vitest";
import { myUtilityFunction } from "./MyUtility";

describe("myUtilityFunction", () => {
  it("returns expected result for valid input", () => {
    expect(myUtilityFunction("input")).toBe("expected");
  });

  it("handles edge cases", () => {
    expect(myUtilityFunction("")).toBe("");
  });

  it("throws for invalid input", () => {
    expect(() => myUtilityFunction(null)).toThrow();
  });
});
```

### Key Patterns

- **Imports**: Always use `describe`, `expect`, `it` from `"vitest"`
- **Test structure**: Use `describe` to group tests by function/class name, `it` for individual cases
- **Naming**: Test descriptions should read as sentences: `it("parses valid data with a string version")`
- **No mocking of external APIs**: These are pure unit tests — test schemas, converters, and utilities in isolation
- **Coverage targets**: Test valid input, invalid input, edge cases, missing fields, wrong types, null values
- **Vitest config**: Located at `packages/api/vitest.config.ts`, uses Node environment with V8 coverage

### What to Test for Each File Type

| File Type | What to Test |
|---|---|
| `Schema.ts` | Valid parse, missing fields, wrong types, null, extra field stripping |
| `Convert.ts` | Field mapping, output shape, edge case values (empty strings, zeros) |
| `Post.ts` / `Get.ts` | Skip (these depend on Web Worker — tested via E2E instead) |
| `Classes.ts` | Skip (type-only files have no runtime behavior) |
| Service utilities | Return values, error conditions, type guards, edge cases |

### After Creating Tests

1. Run `pnpm lint:fix` to ensure code quality
2. Run tests for the API package: `pnpm --filter=@package/api test`
3. Run with coverage: `pnpm --filter=@package/api test -- --coverage`

## Checklist

- [ ] Created `.test.ts` file co-located with the source file
- [ ] Used `describe`, `expect`, `it` from `"vitest"`
- [ ] Tested valid input parsing/mapping
- [ ] Tested rejection of invalid/missing data
- [ ] Tested edge cases (empty strings, zeros, null)
- [ ] Tested extra field stripping for schemas
- [ ] Verified output shape for converters
- [ ] Ran `pnpm lint:fix`
- [ ] Ran `pnpm --filter=@package/api test` and all tests pass
