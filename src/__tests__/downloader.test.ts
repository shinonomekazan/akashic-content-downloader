import { validateUrl, validatePath } from "../downloader";

describe("downloader", () => {
	describe("validateUrl", () => {
		it("should return true for valid HTTP URL", () => {
			expect(validateUrl("http://example.com")).toBe(true);
		});

		it("should return true for valid HTTPS URL", () => {
			expect(validateUrl("https://example.com")).toBe(true);
		});

		it("should return false for invalid URL", () => {
			expect(validateUrl("not a url")).toBe(false);
		});

		it("should return false for empty string", () => {
			expect(validateUrl("")).toBe(false);
		});
	});

	describe("validatePath", () => {
		it("should return true for valid path", () => {
			expect(validatePath("/path/to/file")).toBe(true);
		});

		it("should return true for relative path", () => {
			expect(validatePath("./downloads")).toBe(true);
		});

		it("should return false for empty string", () => {
			expect(validatePath("")).toBe(false);
		});

		it("should return false for whitespace only", () => {
			expect(validatePath("   ")).toBe(false);
		});
	});
});
