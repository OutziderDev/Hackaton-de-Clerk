import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  console.log('locale:',context.preferredLocale);
  
})