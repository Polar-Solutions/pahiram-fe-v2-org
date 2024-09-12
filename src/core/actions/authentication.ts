"use server";

import { flattenValidationErrors } from "next-safe-action";
import { LoginSchema } from "@/lib/form-schemas/form-schemas";
import { actionClient } from "@/lib/safe-action";
import { loginUserUseCase } from "@/core/use-cases/users";
import { cookies } from "next/headers";
import { loginUser } from "@/core/data-access/users";
import { setAuthCookie } from "@/core/data-access/cookies";

// TODO: Implement zsa
/**
 * Handles login action.
 *
 * @remarks
 * This action is used to handle login request from the client.
 * It uses the {@link loginUserUseCase} use case to perform the business logic for logging in.
 *
 * @param {LoginInput} input - The login input.
 * @returns {Promise<LoginOutput>} - The login output.
 */
export const loginUserAction = actionClient
  .schema(LoginSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password, remember } }) => {
    const response = await loginUser({ email, password, remember });

    // Handle the successful response here
    const isSetSuccessful = await setAuthCookie(response);

    if (!isSetSuccessful) {
      return {
        success: false,
        message: "There was an error on our end. Please try again later. ",
      };
    }

    return response;
  });

export const logoutUserAction = actionClient.action(async () => {
  return new Promise((resolve, reject) => {
    try {
      const cookiesToDelete = cookies().getAll();
      cookiesToDelete.forEach((cookie) => {
        cookies().delete(cookie.name);
      });
      setTimeout(() => {
        resolve(!cookies().has("auth"));
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
});
