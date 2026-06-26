import { type ReactNode } from 'react';
import { isSameDay } from 'date-fns';
import { HabitContext, type Habit } from './habit.context';
import { useLocatStorage } from '../hooks/useLocalStorage';

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useLocatStorage<Habit[]>('Habits', []);

  function addHabit(value: string) {
    const newHabit = {
      id: crypto.randomUUID().toString(),
      title: value,
      completions: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((el) => el.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const isCompleted = h.completions.some((c) => isSameDay(c, date));
        const completions = isCompleted
          ? h.completions.filter((c) => !isSameDay(c, date))
          : [...h.completions, date];

        return { ...h, completions };
      }),
    );
  }

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, deleteHabit, toggleHabit }}
    >
      {children}
    </HabitContext.Provider>
  );
}
