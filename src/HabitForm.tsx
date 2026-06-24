import { useState } from 'react';
import { Button } from './Button';

export function HabitForm() {
  const [value, setValue] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(value);
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
      <Button className="rounded-lg px-4 py-2 font-medium">Add Habit</Button>
    </form>
  );
}
