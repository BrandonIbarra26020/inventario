"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { crear_producto } from "@/actions/productos/productos_action"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface CrearProductoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRefresh: (value: boolean) => void
}

export function CrearProductoModal({ open, onOpenChange, onRefresh }: CrearProductoModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    stock: "",
    precio: "",
    categoria: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await crear_producto({
        nombre: formData.nombre,
        stock: Number.parseInt(formData.stock) || 0,
        precio: Number.parseFloat(formData.precio) || 0,
        categoria: formData.categoria || "General",
      })


      if (res?.errors) {
        toast.error(res.errors[0] || "Error al crear el producto")
      } else {
        toast.success("Producto creado correctamente")
        setFormData({ nombre: "", stock: "", precio: "", categoria: "" })
        onRefresh(true)
        onOpenChange(false)
      }
    } catch (error) {
      toast.error("Error inesperado al crear el producto")
      console.error("Error creating product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-border bg-card sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Crear Nuevo Producto</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Completa los datos del producto. Los campos nombre y stock son obligatorios.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre" className="text-card-foreground">
                  Nombre <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Laptop Lenovo"
                  required
                  className="border-input bg-background text-foreground"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="categoria" className="text-card-foreground">
                  Categoría
                </Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  placeholder="Ej: Electrónica"
                  className="border-input bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock" className="text-card-foreground">
                    Stock <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    required
                    className="border-input bg-background text-foreground"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="precio" className="text-card-foreground">
                    Precio
                  </Label>
                  <Input
                    id="precio"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    placeholder="0.00"
                    className="border-input bg-background text-foreground"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="border-border text-foreground hover:bg-accent"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear Producto
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}