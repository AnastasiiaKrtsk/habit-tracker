import { Button } from './Button.tsx';
import { endOfWeek, format, isSameDay, startOfWeek } from 'date-fns';
import { type Habit } from './HabitList.tsx';

const fromDate = startOfWeek(new Date(), { weekStartsOn: 1 });
const toDate = endOfWeek(new Date(), { weekStartsOn: 1 });

export function Header({ habits }: Habit[]) {
  const totalHabits = habits.length;
  let todayCount = 0;

  function getTodayStats(habits) {
    const today = new Date();
    habits.forEach((h) => {
      if (h.completions.some((c) => isSameDay(c, today))) {
        todayCount++;
      }
    });
  }
  getTodayStats(habits);
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-400 text-sm text-(--second)">
          {todayCount} / {totalHabits} done today
        </span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-sm text-(--second)">
          {format(fromDate, 'MMM d')} - {format(toDate, 'MMM d')}
        </span>
        <div className="flex items-center gap-3">
          <Button onClick={getTodayStats}>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </header>
  );
}
