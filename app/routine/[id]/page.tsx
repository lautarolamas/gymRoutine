"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Routine } from "@/types/routine";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RoutineDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const { data, error } = await supabase
          .from("routines")
          .select("*")
          .eq("id", params.id)
          .eq("user_id", user?.id)
          .single();

        if (error) throw error;
        setRoutine(data);
      } catch (error) {
        console.error("Error fetching routine:", error);
        toast.error("Error al cargar la rutina");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (user && params.id) {
      fetchRoutine();
    }
  }, [user, params.id, router]);

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("routines")
        .delete()
        .eq("id", params.id)
        .eq("user_id", user?.id);

      if (error) throw error;

      toast.success("Rutina eliminada exitosamente");
      router.push("/");
    } catch (error) {
      console.error("Error deleting routine:", error);
      toast.error("Error al eliminar la rutina");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!routine) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">{routine.name}</h1>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirmation(true)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar Rutina
          </Button>
        </div>

        {/* Descripción */}
        {routine.description && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{routine.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Ejercicios por día */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
          ].map((day) => {
            const dayExercises = routine.exercises.filter(
              (exercise) => exercise.day === day
            );

            if (dayExercises.length === 0) return null;

            return (
              <Card key={day}>
                <CardHeader>
                  <CardTitle>{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dayExercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="p-4 bg-secondary/50 rounded-lg"
                      >
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} series x {exercise.reps} reps @{" "}
                          {exercise.weight}kg
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Modal de Confirmación de Eliminación */}
        <Dialog
          open={showDeleteConfirmation}
          onOpenChange={setShowDeleteConfirmation}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                ¿Estás seguro que deseas eliminar esta rutina? Esta acción no se
                puede deshacer.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  Eliminar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
