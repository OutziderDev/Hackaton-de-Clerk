import { clerkMiddleware,createRouteMatcher } from "@clerk/astro/server";

/* const isProtectedRoute = createRouteMatcher(["/"])

export const onRequest = clerkMiddleware( (auth, context) => {
  const { userId, redirectToSignIn } = auth();

  if(isProtectedRoute(context.request) && !userId){
    return redirectToSignIn()
  }
}); */

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn } = auth();
  /*
  if (!userId) {
    return redirectToSignIn();
  } */
  console.log("middleware: userId:", userId);

  // Aquí puedes agregar lógica adicional si es necesario
  return undefined;
});