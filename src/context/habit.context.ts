import { createContext, useContext } from 'react';

export type Habit = {
  id: string;
  title: string;
  completions: Date[];
};

type Context = {
  habits: Habit[];
  addHabit: (title: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};
export const HabitContext = createContext<Context | undefined>(undefined);

export function useHabit() {
  const ctx = useContext(HabitContext);
  if (ctx === undefined) throw new Error('MissingProvider');
  return ctx;
}
