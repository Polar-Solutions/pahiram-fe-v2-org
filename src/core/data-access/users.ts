import { ILoginInput, ILoginOutput } from "@/lib/interfaces";

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
export const loginUser = async (input: ILoginInput): Promise<ILoginOutput> => {
  const { email, password, remember } = input;
  // TODO: Call the server api in the env for prod
  const loginApi = "http://127.0.0.1/api" + "/login";

  try {
    const response = await fetch(loginApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        remember_me: remember,
      }),
    });

    const loginApiResponseJson = await response.json();

    if (response.status !== 200) {
      return {
        success: false,
        message: loginApiResponseJson?.message,
        errors: loginApiResponseJson?.errors,
      };
    }

    return {
      success: true,
      data: { ...loginApiResponseJson?.data },
      message: "User logged in successfully! 🎉",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error on our end. Please try again later. ",
    };
  }
};
