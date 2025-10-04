"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login_actions(email: string, password: string) {
  const url = `${process.env.API_URL}/login`;



  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  

  const res = await req.json();

  if (res.ok === false) {
    return {
      errors: res.errors || ["Error al iniciar sesión"],
    };
  }

 
  // Si todo va bien, guardar el token en una cookie
  if (res.token) {
    const token = decodeURIComponent(res.token);

    const cookieStore = cookies();
    (await cookieStore).set({
      name: "Token_auth",// nombre de la cookie
      value: token,// token de autenticación
      httpOnly: true,// sirve para que la cookie no sea accesible desde JavaScript
      secure: false,//sirve para que la cookie solo se envie por HTTPS
      sameSite: "lax",// sirve para proteger contra ataques CSRF
      path: "/", // Cookie disponible en toda la aplicación
      maxAge: 60 * 60 * 24, // 1 día
    });

    return redirect("/");
  }else{
    return {
      errors: true
    };
  }
}


// Acción para cerrar sesión
export async function logout_action() {
  const cookieStore = cookies();
  (await cookieStore).delete({ name: "Token_auth", path: "/" }); // Eliminar la cookie
  redirect("/Inicio-sesion");
}