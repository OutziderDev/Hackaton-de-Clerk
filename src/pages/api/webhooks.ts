const  signingSecret = import.meta.env.CLERK_WEBHOOK_SIGNING_SECRET;
import { verifyWebhook } from "@clerk/astro/webhooks";
import { supabase } from "../../lib/supabaseClient";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({request}) => {
  try {
    const evt = await verifyWebhook( request,{
      signingSecret: signingSecret,
    })

    if (evt.type=== 'user.created') {
      const { id, email_addresses, first_name, last_name, username, image_url,created_at } = evt.data;
      const email = email_addresses[0]?.email_address || "";
      const fullName = `${first_name} ${last_name}`;

      const { data, error } = await supabase
        .from('usuarios')
        .insert([{
        id: id,
        username: username,
        full_name: fullName,
        user_email:email,
        bio: '',
        image_url:image_url,
      }]).select()
      
      if (error) {
        console.error('Error al insertar:', error);
        return new Response('Error al insertar el usuario', {status:500})
      }
    } 
    return new Response('Webhook received, usuario creado', { status: 200 })
    
  } catch (error) {
    console.error('Error verifying webhook:', error)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
  /* const payload = await request.text();
  const headers = Object.fromEntries(request.headers.entries())
  const secret = import.meta.env.CLERK_WEBHOOK_SIGNING_SECRET

  const whook = new Webhook(secret) */

  /*let evt: any;
  evt= whook.verify(payload,headers);
   try {
  } catch (error) {
    console.error("Verificacion fallida de WebHook");
    return new Response('Señal Invalida', {status: 403})
  } */


  /* 

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
} */