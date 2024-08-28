import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	isAuthenticatedNextjs,
	nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

// returns whether the request matches the list of predefined routes t
const isPublicPage = createRouteMatcher(['/auth']);

export default convexAuthNextjsMiddleware((request) => {
	// IF USER IS NOT AUTHENTICATED REDIRECT TO LOGIN
	if (
		!isPublicPage(request) &&
		// Whether the client is authenticated
		!isAuthenticatedNextjs()
	) {
		return nextjsMiddlewareRedirect(request, '/auth');
	}

	// IF USER IS AUTHENTICATED, REDIRECT TO HOME
	if (isPublicPage(request) && isAuthenticatedNextjs()) {
		return nextjsMiddlewareRedirect(request, '/');
	}
});

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
