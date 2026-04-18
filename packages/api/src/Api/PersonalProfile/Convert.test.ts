import { describe, expect, it } from "vitest";
import { personalProfileConvertFromDto } from "./Convert";
import type { ProfileInfoDto } from "./Types";

const validDto: ProfileInfoDto = {
  id: "user-456",
  userName: "jsmith",
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  isActive: true,
  emailConfirmed: true,
  phoneNumber: "+1-555-0199",
  imageUrl: "https://example.com/jane.png",
};

describe("personalProfileConvertFromDto", () => {
  it("maps all required fields from the DTO", () => {
    const result = personalProfileConvertFromDto(validDto);
    expect(result.id).toBe("user-456");
    expect(result.userName).toBe("jsmith");
    expect(result.firstName).toBe("Jane");
    expect(result.lastName).toBe("Smith");
    expect(result.email).toBe("jane@example.com");
    expect(result.isActive).toBe(true);
    expect(result.emailConfirmed).toBe(true);
  });

  it("maps optional phoneNumber when present", () => {
    const result = personalProfileConvertFromDto(validDto);
    expect(result.phoneNumber).toBe("+1-555-0199");
  });

  it("maps optional imageUrl when present", () => {
    const result = personalProfileConvertFromDto(validDto);
    expect(result.imageUrl).toBe("https://example.com/jane.png");
  });

  it("converts null phoneNumber to undefined", () => {
    const result = personalProfileConvertFromDto({ ...validDto, phoneNumber: null });
    expect(result.phoneNumber).toBeUndefined();
  });

  it("converts null imageUrl to undefined", () => {
    const result = personalProfileConvertFromDto({ ...validDto, imageUrl: null });
    expect(result.imageUrl).toBeUndefined();
  });

  it("converts undefined phoneNumber to undefined", () => {
    const result = personalProfileConvertFromDto({ ...validDto, phoneNumber: undefined });
    expect(result.phoneNumber).toBeUndefined();
  });

  it("converts undefined imageUrl to undefined", () => {
    const result = personalProfileConvertFromDto({ ...validDto, imageUrl: undefined });
    expect(result.imageUrl).toBeUndefined();
  });

  it("unwraps boolean valueOf for isActive", () => {
    const result = personalProfileConvertFromDto({ ...validDto, isActive: false });
    expect(result.isActive).toBe(false);
  });

  it("unwraps boolean valueOf for emailConfirmed", () => {
    const result = personalProfileConvertFromDto({ ...validDto, emailConfirmed: false });
    expect(result.emailConfirmed).toBe(false);
  });
});
