import { supabase } from "../../lib/supabaseClient";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ( {request, locals}) => {
  try {
    const  userId  = await locals.currentUser()

    const formData = await request.formData();
    const mensaje = formData.get("mensaje");
    let multimedia = formData.get("multimedia");
    if (!multimedia || !(multimedia instanceof File) || multimedia.size === 0) {
      multimedia = null;
    }
    const isPAD = formData.has("isPAD");
    const lenguaje = formData.get("lenguajes");
    const codigo = formData.get("codigo");
        
    if (multimedia === null && codigo === null) {
      try {
        const { error } = await supabase
        .from("posts")
        .insert({
          user_id: userId?.id,
          mensaje: mensaje,
          multimedia: null,
          ispad: false,
          lenguaje: null,
          codigo: null 
        })

        if (error) {
          return new Response("Error al insertar el post", {status: 500});
        }

        return new Response("Post sencillo creado exitosamente", {status: 302, headers: { Location: "/"}})

      } catch (error) {
        return new Response("Error al insertar el post", {status: 500});
      }
    }
    
    if (multimedia !== null && codigo === null) {
      try{
        /* Guardar multimedia en Supa */
        const randomNumberTimestamp = Date.now();
        const { error } = await supabase.storage
          .from("posts")
          .upload(`multimedia/${userId?.id}/${randomNumberTimestamp}`, multimedia, {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) {
          console.log(error);
          
          return new Response("Error al subir el archivo", {status: 500});
        }

        /* Obtener URL media en Supa */
        const { data: urlData } = supabase.storage
          .from("posts")
          .getPublicUrl(`multimedia/${userId?.id}/${randomNumberTimestamp}`);

        if (!urlData || !urlData.publicUrl) {
          return new Response("Error al obtener la URL pública de la multimedia del post", {status: 500});
        }

        /* Guardar Post en supa */
        const multimediaUrl = urlData.publicUrl;

        const { error: postErrorWithMedia } = await supabase
          .from("posts")
          .insert({
            user_id: userId?.id,
            mensaje: mensaje,
            lenguaje: null,
            multimedia: multimediaUrl,
            ispad: false,
            codigo: null
          })
        if ( postErrorWithMedia){
          return new Response("Error al insertar el post multimedia", {status: 500});
        }
        
        /* Respuesta si todo sale bien */
        return new Response("Post multimedia creado correctamente", {status: 302, headers: { Location: "/"}})

      } catch (error){
        return new Response("Error al insertar el post", {status: 500}); 
      }
    }
    
    if (codigo !== null) {
      try {
        const { error: errorWithCode } = await supabase
          .from("posts")
          .insert({
            user_id: userId?.id,
            mensaje: mensaje,
            lenguaje: lenguaje,
            ispad: isPAD,
            multimedia: null,
            codigo: codigo
          })

        if (errorWithCode) {
          return new Response("error al insertar el snippet", {status: 500})
        }

        return new Response("el post con snippet fue creado correctamente", {status: 302, headers: { Location: "/"}})

      } catch (error) {
        return new Response("Error al insertar el post", {status: 500}); 
      }
    }

    return new Response("Tipo de request o post no soportado", {status: 400})
  } catch (error) {
    return new Response("Ah ocurrido algo", {status: 404});
  }
}