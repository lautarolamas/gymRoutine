export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  day: string;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  createdAt: string;
}

export interface WeightLog {
  date: string;
  weight: number;
} 