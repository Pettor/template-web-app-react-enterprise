import { describe, expect, it } from "vitest";
import { profileInfoSchema } from "./Types";

const validProfile = {
  id: "user-123",
  userName: "jdoe",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  isActive: true,
  emailConfirmed: false,
};

describe("profileInfoSchema", () => {
  it("parses a valid profile with all required fields", () => {
    const result = profileInfoSchema.parse(validProfile);
    expect(result.id).toBe("user-123");
    expect(result.userName).toBe("jdoe");
    expect(result.firstName).toBe("John");
    expect(result.lastName).toBe("Doe");
    expect(result.email).toBe("john@example.com");
    expect(result.isActive).toBe(true);
    expect(result.emailConfirmed).toBe(false);
  });

  it("parses a profile with optional phoneNumber", () => {
    const result = profileInfoSchema.parse({ ...validProfile, phoneNumber: "+1-555-0100" });
    expect(result.phoneNumber).toBe("+1-555-0100");
  });

  it("parses a profile with null phoneNumber", () => {
    const result = profileInfoSchema.parse({ ...validProfile, phoneNumber: null });
    expect(result.phoneNumber).toBeNull();
  });

  it("parses a profile with optional imageUrl", () => {
    const result = profileInfoSchema.parse({ ...validProfile, imageUrl: "https://example.com/avatar.png" });
    expect(result.imageUrl).toBe("https://example.com/avatar.png");
  });

  it("parses a profile with null imageUrl", () => {
    const result = profileInfoSchema.parse({ ...validProfile, imageUrl: null });
    expect(result.imageUrl).toBeNull();
  });

  it("rejects data missing required id", () => {
    const { id: _id, ...rest } = validProfile;
    expect(() => profileInfoSchema.parse(rest)).toThrow();
  });

  it("rejects data missing required email", () => {
    const { email: _email, ...rest } = validProfile;
    expect(() => profileInfoSchema.parse(rest)).toThrow();
  });

  it("rejects non-boolean isActive", () => {
    expect(() => profileInfoSchema.parse({ ...validProfile, isActive: "yes" })).toThrow();
  });

  it("rejects non-boolean emailConfirmed", () => {
    expect(() => profileInfoSchema.parse({ ...validProfile, emailConfirmed: 1 })).toThrow();
  });

  it("rejects null for required string fields", () => {
    expect(() => profileInfoSchema.parse({ ...validProfile, userName: null })).toThrow();
  });
});
