import {ILoginApiResponse, ILoginInput} from "@/lib/interfaces";
import {loginUser} from "@/core/data-access/users";

export const logoutUserUseCase = async () => {
    //    TODO: Call the logout api first before deleting the auth cookie
}

/**
 * Asynchronously logs in a user with the provided login information.
 *
 * @param {ILoginInput} input - The login information of the user.
 * @return {Promise<Object>} A Promise that resolves to an object containing the user's data and a success message if the login is successful, or an error message if the login fails.
 * @throws {Error} If the user account is not active or if the password does not meet the minimum length requirement.
 */
export const loginUserUseCase = async (input: ILoginInput): Promise<ILoginApiResponse> => {
    // TODO: Implement business logic here
    // For example, you can check if the user account is active or not
    // You can also check if the user account meets the security requirements
    // For example, you can check if the password meets the minimum length requirement

    // TODO: Implement this use case
    // Here is a sample implementation
    // const user = await fetchUserByEmail(input.email);
    // if (!user) {
    //     throw new Error("Invalid email or password");
    // }

    // If the user account meets the business logic requirements, then you can proceed to log the user in
    // For example, you can call the loginUser function to log the user in
    return await loginUser(input);


}