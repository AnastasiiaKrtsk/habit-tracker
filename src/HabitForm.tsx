import { useState, type SubmitEvent } from 'react';
import { Button } from './Button';

type HabitFormProps = {
  addHabit: (name: string) => void;
};

export function HabitForm({ addHabit }: HabitFormProps) {
  const [value, setValue] = useState('');

  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (value.trim() === '') return;

    addHabit(value);
    setValue('');
  };

  return (
    <form className="flex gap-2" onSubmit={handleFormSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
        className="flex-1 rounded-lg bg-(--panel) px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-(--primary-hover-color)"
        type="text"
        placeholder="Habit title"
      />
      <Button
        className="rounded-lg px-4 py-2 font-medium"
        disabled={value.trim() === ''}
      >
        Add Habit
      </Button>
    </form>
  );
}
