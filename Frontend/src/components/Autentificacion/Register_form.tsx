"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import api from "@/lib/axios"

export function Register_form() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  // Función para validar el formulario
  const validateForm = () => {

    if (!nombre) {
      toast.error("El nombre es requerido")
    }


    if (!email) {
      toast.error("El correo electrónico es requerido")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("El correo electrónico no es válido")
    }

    // Validar password
    if (!password) {
      toast.error("La contraseña es requerida")
    } else if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres")
    }

    // Validar confirmación de password
    if (!passwordConfirmation) {
      toast.error("La confirmación de la contraseña es requerida")
    } else if (password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden")
    }

    if (!nombre || !email || !password || !passwordConfirmation || password !== passwordConfirmation || password.length < 6) {
      return false
    }

    return true;
  }

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar el formulario antes de enviarlo
    if (!validateForm()) {
      return
    }

    // Inicia el proceso de registro
    setIsLoading(true)

    try {
      // se realiza la petición a la API
      const result = await api.post("/register", {
        nombre,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

      //valida que la cuenta se creó correctamente
      if (result.data.success == true) {
        toast.success("Cuenta creada correctamente", { position: "top-right", autoClose: 3000 })
        setNombre("")
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")
      }else{
          toast.error("Ocurrió un error al crear la cuenta", { position: "top-right", autoClose: 4000 })
      }

    } catch (err) {
      console.error(err)
      toast.error("Ocurrió un error al crear la cuenta", { position: "top-right", autoClose: 4000 })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-75 animate-pulse"></div>
      <Card className="relative w-full shadow-lg bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-balance">Crear cuenta</CardTitle>
          <CardDescription className="text-pretty">Completa el formulario para registrarte</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={isLoading}
                className="h-11"
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11"
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-confirmation">Confirmar contraseña</Label>
              <Input
                id="password-confirmation"
                type="password"
                placeholder="Repite tu contraseña"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-10">
            <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Registrarse"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {"¿Ya tienes una cuenta? "}
              <a href="/Inicio-sesion" className="text-foreground font-medium hover:underline">
                Inicia sesión
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
      <ToastContainer />
    </div>
  )
}