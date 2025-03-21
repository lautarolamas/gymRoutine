"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Scale, Calendar as CalendarIcon, Save } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewWeight() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  const handleSubmit = async () => {
    if (!currentWeight || !currentDate) {
      toast.error("Por favor ingresa el peso y la fecha");
      return;
    }

    try {
      const newLog = {
        date: currentDate.toISOString().split("T")[0],
        weight: Number(currentWeight),
        user_id: user?.id,
      };

      const { error } = await supabase.from("weight_logs").insert([newLog]);

      if (error) throw error;

      toast.success("Peso registrado exitosamente");
      router.push("/");
    } catch (error) {
      console.error("Error saving weight log:", error);
      toast.error("Error al guardar el registro de peso");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xxl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nuevo Peso
            </h1>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Registro de Peso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-base">
                    Peso (kg)
                  </Label>
                  <div className="relative">
                    <Input
                      id="weight"
                      type="number"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      placeholder="70"
                      className="w-full  text-lg"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal text-lg ",
                          !currentDate && "text-muted-foreground"
                        )}
                      >
                        {currentDate ? (
                          format(currentDate, "PPP", { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={setCurrentDate}
                        initialFocus
                        locale={es}
                        disabled={(date) => date > new Date()}
                        fromYear={2020}
                        toYear={new Date().getFullYear()}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button onClick={handleSubmit} className="w-full text-md py-6">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Registro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
