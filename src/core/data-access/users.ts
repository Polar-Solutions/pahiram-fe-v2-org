import { ILoginApiResponse, ILoginInput } from "@/lib/interfaces";
import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
import { loginRoute } from "@/config/api/backend-routes/auth-routes";

export const getUserByEmail = async (email: string) => {
  //  TODO: Call the get user by email api and pass the email
};

export const logoutUser = async () => {
  //  TODO: Call the logout api and pass the tokens
};

/**
 * Logs in a user with the given credentials.
 * @param input The input from the user containing the email, password and remember flag.
 * @returns A Promise that resolves when the user is logged in successfully.
 * @throws An error if there is an issue with the login process.
 */
export const loginUser = async (
  input: ILoginInput
): Promise<ILoginApiResponse> => {
  const { email, password, remember_me } = input;
  try {
    const response = await PahiramAxiosConfig.post(loginRoute, {
      email,
      password,
      remember_me,
    });

    if (!response.status || response.status >= 400) {
      const errorBody = response?.data?.message;
      console.error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
      throw new Error(errorBody);
    }
    return await response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    if (error instanceof Error) {
      throw new Error(`Wrong credentials`);
    } else {
      throw new Error(`Failed to login, please try again`);
    }
  }
};
