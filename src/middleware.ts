import { clerkMiddleware } from "@clerk/astro/server";

/* const isProtectedRoute = createRouteMatcher(["/"])

export const onRequest = clerkMiddleware( (auth, context) => {
  const { userId, redirectToSignIn } = auth();

  if(isProtectedRoute(context.request) && !userId){
    return redirectToSignIn()
  }
}); */


export const onRequest = clerkMiddleware()