"use client";

import { useState } from "react";
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
import { Routine, Exercise } from "@/types/routine";
import { ejerciciosPreestablecidos } from "@/lib/routines";
import { getExercisesByDay } from "@/lib/routines";

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

interface RoutineFormProps {
  routine?: Routine;
  onSubmit: (routine: Omit<Routine, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export function RoutineForm({ routine, onSubmit, onCancel }: RoutineFormProps) {
  const [routineName, setRoutineName] = useState(routine?.name || "");
  const [routineDescription, setRoutineDescription] = useState(
    routine?.description || ""
  );
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>(
    routine?.exercises || []
  );
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDay, setExerciseDay] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const addExercise = () => {
    if (!exerciseName || !exerciseDay || !sets || !reps || !weight) {
      return;
    }

    const newExercise: Exercise = {
      name: exerciseName,
      day: exerciseDay,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
    };

    setCurrentExercises([...currentExercises, newExercise]);
    setExerciseName("");
    setExerciseDay("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: routineName,
      description: routineDescription,
      exercises: currentExercises,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="routineName">Nombre de la Rutina</Label>
        <Input
          id="routineName"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Rutina Completa"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={routineDescription}
          onChange={(e) => setRoutineDescription(e.target.value)}
          placeholder="Rutina de ejercicios para toda la semana"
          required
        />
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-semibold">Agregar Ejercicio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="muscleGroup">Grupo Muscular</Label>
            <Select
              value={selectedMuscleGroup}
              onValueChange={setSelectedMuscleGroup}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar grupo muscular" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(ejerciciosPreestablecidos).map((grupo) => (
                  <SelectItem key={grupo} value={grupo}>
                    {grupo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="exercise">Ejercicio</Label>
            <Select
              value={exerciseName}
              onValueChange={setExerciseName}
              disabled={!selectedMuscleGroup}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ejercicio" />
              </SelectTrigger>
              <SelectContent>
                {selectedMuscleGroup &&
                  ejerciciosPreestablecidos[
                    selectedMuscleGroup as keyof typeof ejerciciosPreestablecidos
                  ].map((ejercicio) => (
                    <SelectItem key={ejercicio} value={ejercicio}>
                      {ejercicio}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="exerciseDay">Día del Ejercicio</Label>
          <Select value={exerciseDay} onValueChange={setExerciseDay}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar día" />
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="sets">Series</Label>
            <Input
              id="sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              placeholder="4"
              required
            />
          </div>
          <div>
            <Label htmlFor="reps">Repeticiones</Label>
            <Input
              id="reps"
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="12"
              required
            />
          </div>
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="60"
              required
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={addExercise}
          variant="secondary"
          className="w-full"
        >
          Agregar Ejercicio
        </Button>
      </div>

      {currentExercises.length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Ejercicios Actuales</h3>
          {Object.entries(getExercisesByDay(currentExercises)).map(
            ([day, exercises]) => (
              <div key={day} className="mb-4">
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  {day}
                </h4>
                <div className="space-y-2">
                  {exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary p-3 rounded-lg"
                    >
                      <span className="font-medium">{exercise.name}</span>
                      <span>
                        {exercise.sets} series × {exercise.reps} reps @{" "}
                        {exercise.weight}kg
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      <div className="flex gap-4">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {routine ? "Actualizar Rutina" : "Guardar Rutina"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1 hover:bg-secondary hover:scale-[1.02] transition-all duration-200"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
