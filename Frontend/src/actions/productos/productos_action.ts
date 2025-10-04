"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Acción para obtener los productos
export const obtener_productos = async () => {
  // Obtener el token de las cookies
  const token = (await cookies()).get("Token_auth")?.value;

  // Si no hay token, redirigir al login
  if (!token) {
    redirect("/Inicio-sesion");
    return;
  }

  // URL de la API para obtener los productos
  const url = `${process.env.API_URL}/productos`;

  try {
    // Llamada a la API
    const req = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Manejo de errores de conexión
    if (!req.ok) {
      throw new Error("Por favor verifica tu conexión de internet");
    }

    // Parsear la respuesta JSON
    const res = await req.json();

    // Manejo de errores en la respuesta de la API
    if (res.ok === false) {
      return {
        errors: res.errors || ["Error al obtener los tipos de usuario"],
      };
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

// Acción para crear un nuevo producto
export const crear_producto = async (data: {
  nombre: string;
  stock: number;
  precio: number;
  categoria: string;
}) => {
  // Obtener el token de las cookies
  const token = (await cookies()).get("Token_auth")?.value;

  // Si no hay token, redirigir al login
  if (!token) {
    redirect("/Inicio-sesion");
    return;
  }

  // URL de la API para crear un nuevo producto
  const url = `${process.env.API_URL}/productos/crear`;

  try {
    // Llamada a la API
    const req = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Manejo de errores de conexión
    if (!req.ok) {
      throw new Error("Por favor verifica tu conexión de internet");
    }

    // Parsear la respuesta JSON
    const res = await req.json();

    // Manejo de errores en la respuesta de la API
    if (res.ok === false) {
      return {
        errors: res.errors || ["Error al crear el producto"],
      };
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

//Acción para eliminar un producto
export const eliminar_producto = async (id: number) => {
  // Obtener el token de las cookies
  const token = (await cookies()).get("Token_auth")?.value;

  // Si no hay token, redirigir al login
  if (!token) {
    redirect("/Inicio-sesion");
    return;
  }

  // URL de la API para eliminar un producto
  const url = `${process.env.API_URL}/productos/eliminar/${id}`;
  try {
    // Llamada a la API
    const req = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Manejo de errores de conexión
    if (!req.ok) {
      throw new Error("Por favor verifica tu conexión de internet");
    }

    // Parsear la respuesta JSON
    const res = await req.json();
    // Manejo de errores en la respuesta de la API
    if (res.ok === false) {
      return {
        errors: res.errors || ["Error al eliminar el producto"],
      };
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const actualizar_stock_producto = async (id: number, stock: number) => {
  // Obtener el token de las cookies
  const token = (await cookies()).get("Token_auth")?.value;

  // Si no hay token, redirigir al login
  if (!token) {
    redirect("/Inicio-sesion");
    return;
  }

  // URL de la API para actualizar el stock del producto
  const url = `${process.env.API_URL}/productos/actualizar-stock/${id}`;

  try {
    // Llamada a la API
    const req = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    });

    // Manejo de errores de conexión
    if (!req.ok) {
      throw new Error("Por favor verifica tu conexión de internet");
    }

    // Parsear la respuesta JSON
    const res = await req.json();

    // Manejo de errores en la respuesta de la API
    if (res.ok === false) {
      return {
        errors: res.errors || ["Error al actualizar el stock del producto"],
      };
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

