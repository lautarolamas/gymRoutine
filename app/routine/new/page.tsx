"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Exercise } from "@/types/routine";
import { diasSemana, ejerciciosPreestablecidos } from "@/lib/routines";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function NewRoutine() {
  const router = useRouter();
  const { user } = useAuth();
  const [routineName, setRoutineName] = useState("");
  const [routineDescription, setRoutineDescription] = useState("");
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseDay, setExerciseDay] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);

  useEffect(() => {
    if (selectedMuscleGroup) {
      const muscleGroupKey =
        selectedMuscleGroup.charAt(0).toUpperCase() +
        selectedMuscleGroup.slice(1);
      const exercises =
        ejerciciosPreestablecidos[
          muscleGroupKey as keyof typeof ejerciciosPreestablecidos
        ] || [];
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises([]);
    }
  }, [selectedMuscleGroup]);

  const handleMuscleGroupChange = (value: string) => {
    setSelectedMuscleGroup(value);
    setExerciseName(""); // Limpiar el nombre del ejercicio cuando cambia el grupo muscular
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!routineName || currentExercises.length === 0) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      const newRoutine = {
        name: routineName,
        description: routineDescription,
        exercises: currentExercises,
        user_id: user?.id,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("routines").insert([newRoutine]);

      if (error) throw error;

      toast.success("Rutina guardada exitosamente");
      router.push("/");
    } catch (error) {
      console.error("Error saving routine:", error);
      toast.error("Error al guardar la rutina");
    }
  };

  const addExercise = () => {
    if (!exerciseName || !sets || !reps || !weight || !exerciseDay) {
      toast.error("Por favor completa todos los campos del ejercicio");
      return;
    }

    setCurrentExercises([
      ...currentExercises,
      {
        name: exerciseName,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
        day: exerciseDay,
      },
    ]);

    // Limpiar el formulario de ejercicio
    setExerciseName("");
    setSets("");
    setReps("");
    setWeight("");
    setExerciseDay("");
    setSelectedMuscleGroup("");
  };

  const removeExercise = (index: number) => {
    setCurrentExercises(currentExercises.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
            <h1 className="text-2xl font-bold">Nueva Rutina</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información básica de la rutina */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Rutina</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Rutina</Label>
                <Input
                  id="name"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  placeholder="Ej: Rutina de Fuerza"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={routineDescription}
                  onChange={(e) => setRoutineDescription(e.target.value)}
                  placeholder="Describe tu rutina..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Formulario de ejercicio */}
          <Card>
            <CardHeader>
              <CardTitle>Agregar Ejercicio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="muscleGroup">Grupo Muscular</Label>
                  <Select
                    value={selectedMuscleGroup}
                    onValueChange={handleMuscleGroupChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un grupo muscular" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pecho">Pecho</SelectItem>
                      <SelectItem value="espalda">Espalda</SelectItem>
                      <SelectItem value="hombros">Hombros</SelectItem>
                      <SelectItem value="biceps">Bíceps</SelectItem>
                      <SelectItem value="triceps">Tríceps</SelectItem>
                      <SelectItem value="piernas">Piernas</SelectItem>
                      <SelectItem value="abdominales">Abdominales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exerciseName">Nombre del Ejercicio</Label>
                  <Select
                    value={exerciseName}
                    onValueChange={setExerciseName}
                    disabled={!selectedMuscleGroup}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un ejercicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredExercises.map((exercise) => (
                        <SelectItem key={exercise} value={exercise}>
                          {exercise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sets">Series</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reps">Repeticiones</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="day">Día</Label>
                  <Select value={exerciseDay} onValueChange={setExerciseDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un día" />
                    </SelectTrigger>
                    <SelectContent>
                      {diasSemana.map((dia) => (
                        <SelectItem key={dia} value={dia}>
                          {dia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="button" onClick={addExercise} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Ejercicio
              </Button>
            </CardContent>
          </Card>

          {/* Lista de ejercicios agregados */}
          {currentExercises.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Ejercicios Agregados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentExercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} series x {exercise.reps} reps -{" "}
                          {exercise.weight}kg - {exercise.day}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExercise(index)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botones de acción */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Guardar Rutina
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
