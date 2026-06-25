import { Header } from './Header.tsx';
import { HabitForm } from './HabitForm.tsx';
import { HabitList, type Habit } from './HabitList.tsx';
import { useState } from 'react';
import { isSameDay } from 'date-fns';

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

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
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header habits={habits} />
      <HabitForm addHabit={addHabit} />
      <HabitList
        habits={habits}
        deleteHabit={deleteHabit}
        toggleHabit={toggleHabit}
      />
    </div>
  );
}

export default App;
