"use server";
// TODO: Secure cookie, don't expose user data and tokens on cookie [security risk]
import {cookies} from "next/headers";
import {IAuthCookie, ILoginApiResponse, ILoginOutput, IUser} from "@/lib/interfaces";

const auth = "auth";

/**
 * Retrieves the authentication cookie from the user's browser.
 *
 * @return {Promise<string | null>} - A Promise that resolves with the value of the authentication cookie,
 * or null if the cookie is not found.
 */
export const getParsedAuthCookie = async (): Promise<IAuthCookie> => {
    const cookieHeader = cookies().get("auth");
    return cookieHeader ? JSON.parse(cookieHeader.value) : null;
}

/**
 * Sets the authentication cookie with the provided login data.
 *
 * @param {ILoginApiResponse} response - The login data from the API response.
 * @return {Promise<void>} - A Promise that resolves when the cookie is successfully set.
 */
export const setAuthCookie = async (response: ILoginApiResponse): Promise<boolean> => {
    const authCookie = JSON.stringify({
        ...response?.data,
        is_authenticated: "true",
    });
    const isAuthCookieSet = cookies().set("auth", authCookie, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24,
    });
    return !!isAuthCookieSet;
}

/**
 * Function to get the user object from the auth cookie.
 *
 * @return {Promise<IUser | null>} The user object from the auth cookie, or null if the cookie is not present.
 */
export const getUserFromAuthCookie = async (): Promise<IUser | null> => {
    const cookie = cookies().get(auth);
    return cookie ? JSON.parse(cookie.value).user : null;
}

/**
 * Function to delete the auth cookie.
 *
 * @return {Promise<void>} Promise that resolves when the cookie is deleted.
 */
export const deleteAuthCookie = async (): Promise<boolean> => {
    const isDeleted = cookies().delete(auth);
    return !!isDeleted;
};

/**
 * Function to get the Pahiram Token from the auth cookie.
 *
 * @return {Promise<string>} The user object from the auth cookie, or null if the cookie is not present.
 */
export const getPahiramTokenFromAuthCookie = async (): Promise<string | null> => {
    const cookie = cookies().get(auth);
    return cookie ? JSON.parse(cookie.value).pahiram_token : "";
}

/**
 * Function to get the APCIS Token from the auth cookie.
 *
 * @return {Promise<string>} The user object from the auth cookie, or null if the cookie is not present.
 */
export const getApcisTokenFromAuthCookie = async (): Promise<string> => {
    const cookie = await cookies().get(auth);
    return cookie ? await JSON.parse(cookie.value).apcis_token : "";
}

