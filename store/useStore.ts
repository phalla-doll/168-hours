import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type TimeBlock = {
  day: number; // 0-6 (Mon-Sun)
  hour: number; // 0-23
  categoryId: string | null;
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'sleep', name: 'Sleep', color: '#3b82f6' }, // blue-500
  { id: 'work', name: 'Work', color: '#f97316' }, // orange-500
  { id: 'exercise', name: 'Exercise', color: '#22c55e' }, // green-500
  { id: 'learning', name: 'Learning', color: '#a855f7' }, // purple-500
  { id: 'family', name: 'Family', color: '#ec4899' }, // pink-500
  { id: 'entertainment', name: 'Entertainment', color: '#eab308' }, // yellow-500
  { id: 'personal', name: 'Personal Projects', color: '#14b8a6' }, // teal-500
];

const createEmptyWeek = (): TimeBlock[] => {
  const week: TimeBlock[] = [];
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      week.push({ day, hour, categoryId: null });
    }
  }
  return week;
};

interface AppState {
  categories: Category[];
  currentWeek: TimeBlock[];
  idealWeek: TimeBlock[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateCurrentBlock: (day: number, hour: number, categoryId: string | null) => void;
  updateIdealBlock: (day: number, hour: number, categoryId: string | null) => void;
  clearCurrentWeek: () => void;
  clearIdealWeek: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      categories: DEFAULT_CATEGORIES,
      currentWeek: createEmptyWeek(),
      idealWeek: createEmptyWeek(),

      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),

      updateCategory: (id, updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updatedCategory } : c
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          currentWeek: state.currentWeek.map((b) =>
            b.categoryId === id ? { ...b, categoryId: null } : b
          ),
          idealWeek: state.idealWeek.map((b) =>
            b.categoryId === id ? { ...b, categoryId: null } : b
          ),
        })),

      updateCurrentBlock: (day, hour, categoryId) =>
        set((state) => ({
          currentWeek: state.currentWeek.map((b) =>
            b.day === day && b.hour === hour ? { ...b, categoryId } : b
          ),
        })),

      updateIdealBlock: (day, hour, categoryId) =>
        set((state) => ({
          idealWeek: state.idealWeek.map((b) =>
            b.day === day && b.hour === hour ? { ...b, categoryId } : b
          ),
        })),

      clearCurrentWeek: () => set({ currentWeek: createEmptyWeek() }),
      clearIdealWeek: () => set({ idealWeek: createEmptyWeek() }),
    }),
    {
      name: '168-hours-storage',
    }
  )
);
