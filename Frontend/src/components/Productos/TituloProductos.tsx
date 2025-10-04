import { logout_action } from '@/actions/usuario/user_action';
import React from 'react'

export default function TituloProductos() {
    const handleLogout = () => {
      logout_action();
    };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestión de Productos</h1>
            <p className="mt-2 text-muted-foreground">Administra tu inventario de productos de forma eficiente</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
    </div>
  )
}
