"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { login_actions } from "@/actions/usuario/user_action"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function Login_form() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Manejar el envío del formulario
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await login_actions(email, password)
    setIsLoading(false)

    if (result?.errors) {
      const errors = Array.isArray(result.errors) ? result.errors : ["Error al iniciar sesión"]
      errors.forEach((err) => toast.error(err))
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-75 animate-pulse"></div>
      <Card className="relative w-full shadow-lg bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-balance">Bienvenido de nuevo</CardTitle>
          <CardDescription className="text-pretty">Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                required
                disabled={isLoading}
                className="h-11"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  required
                  disabled={isLoading}
                  className="h-11 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground focus:outline-none"
                  disabled={isLoading}
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-10">
            <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {"¿No tienes una cuenta? "}
              <a href="Registro" className="text-foreground font-medium hover:underline">
                Regístrate
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}