"use client"

import "react-toastify/dist/ReactToastify.css"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Package, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { eliminar_producto, obtener_productos, actualizar_stock_producto } from "@/actions/productos/productos_action"
import { CrearProductoModal } from "./modal/CrearProductoModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast } from "react-toastify"
import TituloProductos from "./TituloProductos"

// Modal de confirmación para eliminar producto
function EliminarProductoModal({
  open,
  onOpenChange,
  onConfirm,
  producto
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  producto: Producto | null
}) {
  if (!open || !producto) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-2 text-card-foreground">¿Eliminar producto?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          ¿Estás seguro que deseas eliminar <span className="font-bold">{producto.nombre}</span>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-destructive text-destructive-foreground text-white hover:text-white cursor-pointer hover:bg-destructive/80" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}

// Modal para actualizar el stock
function ActualizarStockModal({
  open,
  onOpenChange,
  producto,
  onConfirm
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  producto: Producto | null
  onConfirm: (nuevoStock: number) => void
}) {
  const [nuevoStock, setNuevoStock] = useState(producto?.stock ?? 0)

  useEffect(() => {
    setNuevoStock(producto?.stock ?? 0)
  }, [producto])

  if (!open || !producto) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-2 text-card-foreground">Actualizar stock</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Producto: <span className="font-bold">{producto.nombre}</span>
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-card-foreground mb-1">Nuevo stock</label>
          <input
            type="number"
            min={0}
            value={nuevoStock}
            onChange={e => setNuevoStock(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onConfirm(nuevoStock)}
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}

// Interfaz para el producto
interface Producto {
  id: number
  nombre: string
  stock: number
  precio: number
  categoria: string
}

export function TablaProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(null)
  const [isStockOpen, setIsStockOpen] = useState(false)
  const [productoAActualizar, setProductoAActualizar] = useState<Producto | null>(null)

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductos()
  }, [])

  // Función para obtener productos
  async function fetchProductos() {
    try {
      const resultado = await obtener_productos();
      if (resultado && resultado.data) {
        setProductos(resultado.data)
      }
    }
    catch (error) {
      console.error("Error al obtener los productos:", error);
      toast.error("Error al obtener los productos")
    }
  }

  // Función para eliminar producto
  async function eliminarProductoConfirmado() {
    try {
      const result = await eliminar_producto(productoAEliminar?.id || 0);
      if (result.data == true) {
        setProductos(productos.filter(p => p.id !== productoAEliminar?.id))
        setIsDeleteOpen(false)
        setProductoAEliminar(null)
        toast.success("Producto eliminado correctamente")
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("Error al eliminar el producto")
    }
  }

  // Función para actualizar stock
 async function actualizarStockConfirmado(nuevoStock: number) {
  if (!productoAActualizar) return
  try {
    const result = await actualizar_stock_producto(productoAActualizar.id, nuevoStock)
    if (result.data === true) {
      setIsStockOpen(false)
      setProductoAActualizar(null)
      await fetchProductos() // Actualiza la tabla con los datos más recientes
      toast.success("Stock actualizado correctamente")
    }
  } catch (error) {
    console.error("Error al actualizar el stock:", error)
    toast.error("Error al actualizar el stock")
  }
}
  const obtenerBadgeStock = (stock: number) => {
    if (stock === 0)
      return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">Sin stock</Badge>
    if (stock < 10) return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Stock bajo</Badge>
    return <Badge className="bg-primary/20 text-primary hover:bg-primary/30">En stock</Badge>
  }

  if (productos.length === 0) {
    return (
      <>
          <TituloProductos/>
        <ToastContainer position="top-right" style={{ zIndex: 99999 }} />
        <div className="flex flex-col items-center justify-center py-8 md:py-16 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-3xl border-b border-border p-4 md:p-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-card-foreground">Lista de Productos</h2>
              <p className="mt-1 text-sm text-muted-foreground">Visualiza y gestiona todos tus productos</p>
            </div>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
          <Package className="h-16 w-16 text-muted-foreground/50 mt-8" />
          <h3 className="mt-4 text-lg font-semibold text-card-foreground">No hay productos</h3>
          <p className="mt-2 text-sm text-muted-foreground">Comienza agregando tu primer producto</p>
          <CrearProductoModal open={isCreateOpen} onOpenChange={setIsCreateOpen} onRefresh={
            (value: boolean) => { if (value) fetchProductos() }
          } />
        </div>
      </>
    )
  }

  return (
    <>
    <TituloProductos/>
      <ToastContainer position="top-right" style={{ zIndex: 99999 }} />
      <div className="w-full max-w-5xl mx-auto px-2 md:px-4 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-border p-4 md:p-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-card-foreground">Lista de Productos</h2>
            <p className="mt-1 text-sm text-muted-foreground">Visualiza y gestiona todos tus productos</p>
          </div>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-2 py-2 md:px-6 md:py-4 text-left font-semibold text-foreground">Nombre</th>
                <th className="px-2 py-2 md:px-6 md:py-4 text-left font-semibold text-foreground">Categoría</th>
                <th className="px-2 py-2 md:px-6 md:py-4 text-left font-semibold text-foreground">Stock</th>
                <th className="px-2 py-2 md:px-6 md:py-4 text-left font-semibold text-foreground">Precio</th>
                <th className="px-2 py-2 md:px-6 md:py-4 text-left font-semibold text-foreground">Estado</th>
                <th className="px-2 py-2 md:px-6 md:py-4 text-right font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {productos.map((producto) => (
                <tr key={producto.id} className="transition-colors hover:bg-accent/50">
                  <td className="px-2 py-2 md:px-6 md:py-4">
                    <div className="font-medium text-card-foreground">{producto.nombre}</div>
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4">
                    <span className="text-sm text-muted-foreground">{producto.categoria}</span>
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4">
                    <button
                      onClick={() => {
                        setProductoAActualizar(producto)
                        setIsStockOpen(true)
                      }}
                      className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-primary bg-primary/10 rounded px-2 py-1 opacity-80"
                      title="Actualizar stock"
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="text-primary/60" />
                      {producto.stock}
                    </button>
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4">
                    <span className="font-mono text-sm text-card-foreground"> ${Number(producto.precio).toFixed(2)}</span>
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4">{obtenerBadgeStock(producto.stock)}</td>
                  <td className="px-2 py-2 md:px-6 md:py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setProductoAEliminar(producto)
                        setIsDeleteOpen(true)
                      }}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CrearProductoModal open={isCreateOpen} onOpenChange={setIsCreateOpen} onRefresh={
          (value: boolean) => { if (value) fetchProductos() }
        } />
        <EliminarProductoModal
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={eliminarProductoConfirmado}
          producto={productoAEliminar}
        />
        <ActualizarStockModal
          open={isStockOpen}
          onOpenChange={setIsStockOpen}
          producto={productoAActualizar}
          onConfirm={actualizarStockConfirmado}
        />
      </div>
    </>
  )
}