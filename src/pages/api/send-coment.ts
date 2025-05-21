import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabaseClient";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const comentario = formData.get("comentario");
    const postId = formData.get("postId");
    const usuario = formData.get("usuarioId");
    
    const { error } = await supabase
      .from("comentarios")
      .insert({
        post_id: postId,
        user_id: usuario,
        mensaje: comentario,
      })

    if (error) {
      console.log("el error es: ", error.message);
      return new Response("erro al insertar el comentario", {status: 500}) 
    }
    return new Response("todo bien", {status: 200})

  } catch (error) {
    console.log("el error es:",error);
    return new Response("Error al insertar el comentario", {status: 500})
  }
}