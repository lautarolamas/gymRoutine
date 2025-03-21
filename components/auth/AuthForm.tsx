"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Dumbbell } from "lucide-react";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    });

    // Validación personalizada
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "El email es requerido" }));
      setIsLoading(false);
      return;
    }

    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: "La contraseña es requerida",
      }));
      setIsLoading(false);
      return;
    }

    if (isSignUp && !confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Debes confirmar tu contraseña",
      }));
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Las contraseñas no coinciden",
          }));
          setIsLoading(false);
          return;
        }

        if (!acceptedTerms) {
          setErrors((prev) => ({
            ...prev,
            terms: "Debes aceptar los términos y condiciones",
          }));
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        if (data?.user?.identities?.length === 0) {
          toast.error(
            "Este email ya está registrado. Por favor, inicia sesión."
          );
        } else {
          toast.success("¡Registro exitoso! Por favor, verifica tu email.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      if (error.message.includes("email")) {
        setErrors((prev) => ({
          ...prev,
          email: "Email inválido o no registrado",
        }));
      } else if (error.message.includes("password")) {
        setErrors((prev) => ({ ...prev, password: "Contraseña incorrecta" }));
      } else if (error.message.includes("Invalid login credentials")) {
        toast.error("Email o contraseña incorrectos");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (isSignUp && !acceptedTerms) {
        setErrors((prev) => ({
          ...prev,
          terms: "Debes aceptar los términos y condiciones",
        }));
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/auth/callback",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Error de autenticación:", error);
      toast.error(
        "Error al iniciar sesión con Google. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Dumbbell className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Gym Routine</h1>
        </div>
        <h2 className="text-2xl font-semibold">
          {isSignUp ? "Crear cuenta" : "Iniciar sesión"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isSignUp
            ? "Ingresa tus datos para crear una cuenta"
            : "Ingresa tus credenciales para acceder"}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Continuar con Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        )}
        {isSignUp && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) =>
                  setAcceptedTerms(checked as boolean)
                }
              />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  términos y condiciones
                </Link>{" "}
                {/* y la{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  política de privacidad
                </Link> */}
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms}</p>
            )}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? "Cargando..."
            : isSignUp
            ? "Registrarse"
            : "Iniciar sesión"}
        </Button>
      </form>
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setConfirmPassword("");
          }}
          className="text-sm text-primary hover:underline"
        >
          {isSignUp
            ? "¿Ya tienes una cuenta? Inicia sesión"
            : "¿No tienes una cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
}
