import {
  IApiResponse,
  IHandleApiServerSideErrorResponse,
  ILoginApiResponse,
  ILoginInput,
} from "@/lib/interfaces";
import {
  PahiramAxiosConfig,
  ApcisAxiosConfig,
} from "@/config/api/BackendAxiosConfig";
import { loginRoute } from "@/config/api/backend-routes/auth-routes";
import { AxiosResponse } from "axios";
import { apcisSearchUserByName } from "@/config/api/backend-routes/apcis-routes";
import { handleApiServerSideErrorResponse } from "../handle-api-server-side-error-response";
import { IEndorserSearch } from "@/lib/interfaces/search-endorser";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

export const searchApcisUser = async (name: string) => {
  const request = async (): Promise<
    AxiosResponse<IApiResponse<IEndorserSearch[]>>
  > => {
    return ApcisAxiosConfig.get<IApiResponse<IEndorserSearch[]>>(
      apcisSearchUserByName(name)
    );
  };

  return await handleApiServerSideErrorResponse<
    IApiResponse<IEndorserSearch[]>
  >({
    request,
  });
};

export const useSearchApcisUser = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, status } = useQuery({
    queryKey: ["apcisUsers"], // Unique key for this query
    queryFn: () => Promise.resolve({ success: false, data: [] }), // Default fetch when no name is provided
    staleTime: 60000,
    refetchOnWindowFocus: false,
    enabled: false, // Prevent automatic fetching
  });

  // Custom function to refetch with a name
  const refetchWithQuery = async (name: string) => {
    // Call the searchApcisUser function and update the query
    const result: IHandleApiServerSideErrorResponse<
      IApiResponse<IEndorserSearch[]>
    > = await searchApcisUser(name);

    // Update the query cache with the new result
    queryClient.setQueryData(["apcisUsers"], result);
    return result; // Return the result for further use if needed
  };

  return {
    status,
    data,
    refetch: refetchWithQuery, // Expose the refetch function
    isLoading,
  };
};
