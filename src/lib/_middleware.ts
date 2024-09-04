import {NextResponse} from "next/server";
import {
    ADMIN_FIRST_MENU_ITEM,
    authRoutes,
    BORROWER_FIRST_MENU_ITEM,
    endorserRoutes,
    loginPage,
    OFFICE_FIRST_MENU_ITEM,
    publicRoutes,
    supervisorRoutes,
} from "@/routes";
import {MiddlewareFunctionProps} from "next-easy-middlewares";
import {getParsedAuthCookie, getUserFromAuthCookie} from "@/core/data-access/cookies";

// TODO: Make the protected routes middlewares redirect to an error page

export const protectedOfficeRoutesMiddleware = async ({
                                                          request,
                                                      }: MiddlewareFunctionProps) => {
    const user = await getUserFromAuthCookie();
    const referer = request.headers.get("referer");
    const requestUrl = request.url;
    const redirectUrl = referer
        ? new URL(referer)
        : new URL(loginPage, requestUrl);

    if (user?.department != null) {
        return NextResponse.next();
    }

    return NextResponse.redirect(redirectUrl);

}


/**
 * Ensures that only endorsers can access endorser routes.
 */
export const protectedEndorserRoutesMiddleware = async ({
                                                            request,
                                                        }: MiddlewareFunctionProps) => {
    const user = await getUserFromAuthCookie();

    if (!user?.email) return NextResponse.next();

    const [emailLocalPart, emailDomain] = user?.email?.split("@");

    const [, , secondSlashSplit] = request.nextUrl.pathname.split("/");
    const currentUrl = secondSlashSplit ? `/${secondSlashSplit}` : "/";

    const inEndorserRoute = endorserRoutes.includes(currentUrl)

    const isEndorser = emailDomain === "apc.edu.ph";

    if (!isEndorser && inEndorserRoute) {
        const referer = request.headers.get("referer");
        const requestUrl = request.url;
        const redirectUrl = referer
            ? new URL(referer)
            : new URL(loginPage, requestUrl);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
};

/**
 * Ensures that only supervisors can access supervisor routes.
 */
export const protectedSupervisorRoutesMiddleware = async ({
                                                              request,
                                                          }: MiddlewareFunctionProps) => {
    const user = await getUserFromAuthCookie();

    const isSupervisor = user?.role === "SUPERVISOR";

    const [, , , thirdSlashSplit] = request.nextUrl.pathname.split("/");
    const currentUrl = thirdSlashSplit ? `/${thirdSlashSplit}` : "/";

    if (!isSupervisor && supervisorRoutes.includes(currentUrl)) {
        const referer = request.headers.get("referer");
        const requestUrl = request.url;
        const redirectUrl = referer
            ? new URL(referer)
            : new URL(loginPage, requestUrl);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
};

/**
 * Redirects to the office view if the user is not on the office view.
 */
export const officeViewMiddleware = async ({
                                               request,
                                           }: MiddlewareFunctionProps) => {
    const nextUrl = request.nextUrl || new URL(request.url);
    return NextResponse.redirect(new URL(await OFFICE_FIRST_MENU_ITEM(), nextUrl));
};

/**
 * Redirects to the admin view if the user is not on the admin view.
 */
export const adminViewMiddleware = async ({
                                              request,
                                          }: MiddlewareFunctionProps) => {
    const nextUrl = request.nextUrl || new URL(request.url);
    return NextResponse.redirect(new URL(ADMIN_FIRST_MENU_ITEM, nextUrl));
};

/**
 * Redirects to the borrow view if the user is not on the borrow view.
 */
export const borrowViewMiddleware = async ({
                                               request,
                                           }: MiddlewareFunctionProps) => {
    const nextUrl = request.nextUrl || new URL(request.url);
    return NextResponse.redirect(new URL(BORROWER_FIRST_MENU_ITEM, nextUrl));
};


/**
 * Handles the authentication flow for the app.
 */
export const authMiddleware = async ({request}: MiddlewareFunctionProps) => {
    const auth = await getParsedAuthCookie();
    const isAuthenticated = auth?.isAuthenticated;
    const nextUrl = request.nextUrl || new URL(request.url);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if (isAuthRoute) {
        if (isAuthenticated) {
            if (auth && auth?.user) {
                const nextUrl = request.nextUrl;
                if (auth.user.department != null) {

                    return NextResponse.redirect(new URL(await OFFICE_FIRST_MENU_ITEM(), nextUrl));
                }
                return NextResponse.redirect(new URL(BORROWER_FIRST_MENU_ITEM, nextUrl))
            }
        }
        return NextResponse.next();
    }

    if (!isAuthenticated && !isPublicRoute) {
        // TODO: Instead of redirecting, this should redirect to an error page
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
};

/**
 * Ensures that only admins can access admin routes.
 */
export const protectedAdminRoutesMiddleware = async ({request}: MiddlewareFunctionProps) => {
    const user = await getUserFromAuthCookie();

    const isAdmin = user?.is_admin;

    if (!isAdmin) {
        const referer = request.headers.get("referer");
        const requestUrl = request.url;
        const redirectUrl = referer
            ? new URL(referer)
            : new URL(loginPage, requestUrl);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
};