import { supabase } from "../../lib/supabaseClient";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({request, locals}) => {
  try {
    
    const  userId  = await locals.currentUser()
    console.log("User ID:", userId?.id);
    return new Response("todo maso bien", {status: 200})
  } catch (error) {
    
    return new Response("Ah ocurrido algo", {status: 404});
  }
  
}