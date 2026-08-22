import type { Assignment } from "@/types/assignment";
import type { Course } from "@/types/course";
import type { Goal } from "@/types/goal";

export const mockCourses: Course[] = [
  {
    id: "course-1",
    courseName: "Basis Data",
    lecturerName: "Dr. Andi Prasetyo",
    classDayLabel: "Senin",
    timeRange: "08:00 - 09:40",
    colorValue: "#2563eb",
  },
  {
    id: "course-2",
    courseName: "Sistem Operasi",
    lecturerName: "Ir. Sinta Rahma",
    classDayLabel: "Rabu",
    timeRange: "10:00 - 11:40",
    colorValue: "#9333ea",
  },
  {
    id: "course-3",
    courseName: "Machine Learning",
    lecturerName: "M. Fadli, M.Kom.",
    classDayLabel: "Jumat",
    timeRange: "13:00 - 14:40",
    colorValue: "#16a34a",
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: "assignment-1",
    title: "Ringkasan jurnal optimasi query",
    courseName: "Basis Data",
    dueDate: "2026-08-22T19:00:00.000Z",
    priorityLabel: "Tinggi",
    statusLabel: "Belum mulai",
    statusValue: "todo",
  },
  {
    id: "assignment-2",
    title: "Latihan process scheduling",
    courseName: "Sistem Operasi",
    dueDate: "2026-08-24T13:00:00.000Z",
    priorityLabel: "Sedang",
    statusLabel: "Dikerjakan",
    statusValue: "in_progress",
  },
  {
    id: "assignment-3",
    title: "Mini project klasifikasi data",
    courseName: "Machine Learning",
    dueDate: "2026-08-26T09:00:00.000Z",
    priorityLabel: "Tinggi",
    statusLabel: "Dikerjakan",
    statusValue: "in_progress",
  },
];

export const mockGoals: Goal[] = [
  {
    id: "goal-1",
    title: "4 sesi belajar backend",
    targetValue: 4,
    currentValue: 2,
    progress: 50,
  },
  {
    id: "goal-2",
    title: "3 rangkuman materi minggu ini",
    targetValue: 3,
    currentValue: 2,
    progress: 67,
  },
  {
    id: "goal-3",
    title: "2 kali latihan soal statistik",
    targetValue: 2,
    currentValue: 1,
    progress: 50,
  },
];
