import jsPDF from "jspdf";
import { Routine } from "@/types/routine";
import { getExercisesByDay } from "@/lib/routines";

export const exportToPDF = (routine: Routine) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Título
  doc.setFontSize(24);
  doc.text(routine.name, margin, margin + 10);
  doc.setFontSize(12);

  // Descripción
  if (routine.description) {
    doc.setFontSize(14);
    doc.text("Descripción:", margin, margin + 25);
    doc.setFontSize(12);
    const splitDesc = doc.splitTextToSize(routine.description, contentWidth);
    doc.text(splitDesc, margin, margin + 35);
  }

  // Ejercicios por día
  let yPos = margin + (routine.description ? 45 : 35);
  doc.setFontSize(16);
  doc.text("Ejercicios:", margin, yPos);
  yPos += 15;

  Object.entries(getExercisesByDay(routine.exercises)).forEach(([day, exercises]) => {
    // Verificar si necesitamos una nueva página
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFontSize(14);
    doc.text(day, margin, yPos);
    yPos += 10;

    exercises.forEach((exercise) => {
      doc.setFontSize(12);
      const exerciseText = `${exercise.name} - ${exercise.sets} series × ${exercise.reps} reps - ${exercise.weight}kg`;
      doc.text(exerciseText, margin + 10, yPos);
      yPos += 8;
    });
    yPos += 5;
});

  // Fecha de creación
  doc.setFontSize(10);
  doc.text(
    `Creada el: ${new Date(routine.createdAt).toLocaleDateString("es-AR")}`,
    margin,
    doc.internal.pageSize.getHeight() - margin
  );

  // Guardar el PDF
  doc.save(`${routine.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    }; 