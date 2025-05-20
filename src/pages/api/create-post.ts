import { supabase } from "../../lib/supabaseClient";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ( {request, locals}) => {
  try {
    const  userId  = await locals.currentUser()
    //console.log("User ID:", userId?.id);

    const formData = await request.formData();
    const mensaje = formData.get("mensaje");
    const multimedia = formData.get("multimedia");
    const isPAD = formData.has("isPAD");
    const lenguaje = formData.get("lenguajes");
    const codigo = formData.get("codigo");
    /* console.log("el form tiene: ", formData);   */
    
    console.log("el mensaje fue: ", mensaje);
    console.log("el isPad fue: ", isPAD);
    console.log("el codigo fue: ", codigo);
    console.log(" y su lenguaje fue: ", lenguaje); 
    
    
    /* if (!multimedia) {
      console.log("pasa algo con multimedia");
      
    } else{
      console.log("la media fue.. ", multimedia);
    } */
    
    
    return new Response("todo maso bien", {status: 200, statusText: JSON.stringify(userId) });


  } catch (error) {
    console.log("El problema es:", error);
    return new Response("Ah ocurrido algo", {status: 404});
  }
}