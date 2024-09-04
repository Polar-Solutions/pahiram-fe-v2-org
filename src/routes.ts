import {getFirstMenuItemOffice} from "@/lib/menu-list";
import {cookies} from "next/headers";
import {ADMIN_MENULIST} from "./CONSTANTS/SIDEBAR_CONSTANTS/ADMIN_MENULIST";
import {BORROW_MENULIST} from "./CONSTANTS/SIDEBAR_CONSTANTS/BORROW_MENULIST";

/**
 * List of public routes
 * These routes do not require authentication
 * @type {string[]}
 */

export const loginPage = "/auth/login";


export const publicRoutes = ["/", "/auth/new-verification", loginPage];

/**
 * List of private routes
 * These routes require authentication
 * @type {string[]}
 */

export const authRoutes = [
    loginPage,
    "/auth/login/success",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];


export const supervisorRoutes = ["/manage-office-accounts"];
export const endorserRoutes = ["/manage-endorsements"];

/**
 * Returns the first menu item for the office user.
 *
 * @returns {string} The first menu item for the office user.
 */
export const OFFICE_FIRST_MENU_ITEM = () => {
    const cookieHeader = cookies().get('auth');
    const auth = cookieHeader ? JSON.parse(cookieHeader.value) : null;
    const {role, department} = auth.user;
    return getFirstMenuItemOffice(role, department);
};


export const ADMIN_FIRST_MENU_ITEM = ADMIN_MENULIST[0]?.menus[0]?.href;

export const BORROWER_FIRST_MENU_ITEM = BORROW_MENULIST[0]?.menus[0]?.href;

