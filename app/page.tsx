"use client";

import {
  Plus,
  Dumbbell,
  Calendar,
  Scale,
  ChevronRight,
  Download,
  Sun,
  Moon,
  X,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Routine, Exercise, WeightLog } from "@/types/routine";
import {
  ejerciciosPreestablecidos,
  diasSemana,
  getExercisesByDay,
} from "@/lib/routines";
import { exportToPDF } from "@/lib/pdf";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { EmptyState } from "@/components/ui/empty-state";
import { CafecitoButton } from "@/components/CafecitoButton";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [showRoutineDetail, setShowRoutineDetail] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoadingRoutines, setIsLoadingRoutines] = useState(true);

  const loadUserData = useCallback(async () => {
    setIsLoadingRoutines(true);
    try {
      const { data: routinesData, error: routinesError } = await supabase
        .from("routines")
        .select("*")
        .eq("user_id", user?.id);

      if (routinesError) throw routinesError;
      setRoutines(routinesData || []);

      const { data: weightData, error: weightError } = await supabase
        .from("weight_logs")
        .select("*")
        .eq("user_id", user?.id);

      if (weightError) throw weightError;
      setWeightLogs(weightData || []);
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error("Error al cargar los datos");
    } finally {
      setIsLoadingRoutines(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      loadUserData();
    }
  }, [user, loading, router, loadUserData]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const confirmDelete = async () => {
    if (!routineToDelete) return;

    try {
      const { error } = await supabase
        .from("routines")
        .delete()
        .eq("id", routineToDelete)
        .eq("user_id", user?.id);

      if (error) throw error;

      await loadUserData();
      toast.success("Rutina eliminada exitosamente");
      setShowDeleteConfirmation(false);
      setRoutineToDelete(null);
      setShowRoutineDetail(false);
    } catch (error) {
      console.error("Error deleting routine:", error);
      toast.error("Error al eliminar la rutina");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const openRoutineDetail = (routine: Routine) => {
    if (routine.id) {
      router.push(`/routine/${routine.id}`);
    } else {
      toast.error("Error al abrir el detalle de la rutina");
    }
  };

  const handleDelete = () => {
    if (!selectedRoutine) return;
    setShowDeleteConfirmation(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Gym Routine
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="hover:bg-primary hover:text-primary-foreground transition-colors flex-1 sm:flex-none"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline"></span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="hidden sm:inline"></span>
                </>
              )}
            </Button>
            <Button
              onClick={() => router.push("/weight/new")}
              variant="outline"
              className="gap-2 flex-1 sm:flex-none"
            >
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">Nuevo Peso</span>
            </Button>
            <Button
              onClick={() => router.push("/routine/new")}
              className="gap-2 flex-1 sm:flex-none"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nueva Rutina</span>
            </Button>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="gap-2 flex-1 sm:flex-none"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </div>
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
                  onClick={confirmDelete}
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

        {/* Registro de Peso */}
        {weightLogs.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Registro de Peso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weightLogs
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <span>
                        {new Date(log.date).toLocaleDateString("es-AR")}
                      </span>
                      <span className="font-semibold">{log.weight} kg</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Rutinas */}
        {!selectedRoutine && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Mis Rutinas</h2>
            {isLoadingRoutines ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : routines.length === 0 ? (
              <Card>
                <CardContent className="p-0">
                  <EmptyState
                    title="No hay rutinas creadas"
                    description="Crea tu primera rutina personalizada para comenzar a entrenar. Podrás agregar ejercicios, series y repeticiones para cada día de la semana."
                    actionLabel="Crear primera rutina"
                    onAction={() => router.push("/routine/new")}
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {routines.map((routine) => (
                  <Card
                    key={routine.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle>{routine.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {routine.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={() => openRoutineDetail(routine)}
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Ver detalle
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            router.push(`/routine/${routine.id}/edit`)
                          }
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Botón de Cafecito */}
        <div className="mt-12 flex justify-center">
          <CafecitoButton username="gymroutine" />
        </div>
      </div>
    </div>
  );
}
