import { supabase } from "../../lib/supabaseClient";
import { verifyWebhook } from "@clerk/astro/webhooks";
import type { APIRoute } from "astro";
import { Webhook } from "svix";

export const prerender = false;

export const POST: APIRoute = async ({request}) => {
  const payload = await request.text();
  console.log('dato es:',payload);
  
  const headers = Object.fromEntries(request.headers.entries())
  console.log('cabezeras: ',headers);
  

  const secret = import.meta.env.CLERK_WEBHOOK_SIGNING_SECRET

  const whook = new Webhook(secret)
  console.log('el whook secreto es:',whook);
  

  let evt: any;
  evt= whook.verify(payload,headers);
  /* try {
  } catch (error) {
    console.error("Verificacion fallida de WebHook");
    return new Response('Señal Invalida', {status: 403})
  } */

  const eventType = evt.type;

  if (eventType=== 'user.created') {
    const { id, email_addresses, first_name, last_name, username, image_url } = evt.data;
    const email = email_addresses[0]?.email_address || "";

    const { error } = await supabase.from('usuarios').insert([{
      id,
      username,
      full_name: `${first_name} ${last_name}`,
      email,
      image_url,
      bio: '',
    }])

    if (error) {
      console.log('Error al insertar usuario: ', error);
      return new Response('Error al insertar el usuario', {status:500})
    }
  }

  if (eventType === "user.updated") {
  const { id, email_addresses, first_name, last_name, username, image_url } = evt.data;
  const email = email_addresses[0]?.email_address || "";

  const { error } = await supabase
    .from("usuarios")
    .update({
      email,
      nombre: first_name,
      apellido: last_name,
      username,
      imagen_url: image_url,
    })
    .eq("clerk_id", id);

  if (error) {
    console.error("Error al actualizar usuario:", error);
    return new Response("Error al actualizar usuario", { status: 500 });
  }
}

if (eventType === "user.deleted") {
  const { id } = evt.data;

  const { error } = await supabase
    .from("usuarios")
    .delete()
    .eq("clerk_id", id);

  if (error) {
    console.error("Error al eliminar usuario:", error);
    return new Response("Error al eliminar usuario", { status: 500 });
  }
}
  
  return new Response("Webhook recibido", { status: 200 });
}