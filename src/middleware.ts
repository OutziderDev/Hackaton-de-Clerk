import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

 const isProtectedRoute = createRouteMatcher(["/","/formu"])

export const onRequest = clerkMiddleware( (auth, context) => {
  const { userId } = auth();

  if(isProtectedRoute(context.request) && !userId){
    return context.redirect("/login")
  }

}); 


/* export const onRequest = clerkMiddleware() */