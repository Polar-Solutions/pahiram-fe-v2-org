import {loginUser} from "../../src/core/data-access/users";
import {describe, expect, it, vi} from "vitest";

describe("loginUser", () => {
    let mock = vi.fn();

    it("should return a user object on successful login", async () => {

        const mockInput = {
            email: "jbberbon@student.apc.edu.ph",
            password: "12345678",
            remember_me: false,
        };
        const mockResponse = {
            success: true,
            data: {},
            message: "User logged in successfully! 🎉",
        };

        mock.mockResolvedValueOnce(JSON.stringify(mockResponse));

        const result = await loginUser(mockInput);

        expect(result).toMatchObject(mockResponse);
    }, { timeout: 10000 })

    it("should return an error message on failed login", async () => {
        const mockInput = {
            email: "test@apc.edu.ph",
            password: "wrongpassword",
            remember_me: false,
        };
        const mockResponse = {
            success: false,
            message: "Wrong credentials",
        };

        mock.mockResolvedValueOnce(JSON.stringify(mockResponse));

        const result = await loginUser(mockInput);

        expect(result).toEqual(mockResponse);
    });

    it("should return an errors object", async () => {
        const mockInput = {
            email: "test@apc.edu.ph",
            password: "password",
            remember_me: false,
        };


        const result = await loginUser(mockInput);

        expect(result).toEqual({
            success: false,
            message: "Wrong credentials",
        });
    });

    it("should return an error message on invalid input", async () => {
        const mockInput = {
            email: "",
            password: "",
            remember_me: false,
        };

        const result = await loginUser(mockInput);

        expect(result).toEqual({
            success: false,
            message: "Login Failed",
            errors: {
                "email": "The email field is required.",
                "password": "The password field is required."
            }
        });
    });
});