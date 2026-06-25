import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
  subDays,
} from 'date-fns';
import { Button } from './Button';

export type Habit = {
  id: string;
  title: string;
  completions: Date[];
};

type HabitListProps = {
  habits: Habit[];
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

type HabitItemProps = {
  habit: Habit;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

export function HabitList({
  habits,
  deleteHabit,
  toggleHabit,
}: HabitListProps) {
  if (habits.length === 0) {
    return <p className="text-center py-12">No habits yet.</p>;
  }
  return (
    <ul className="flex flex-col gap-3">
      {habits.map((el) => (
        <HabitItem
          habit={el}
          deleteHabit={deleteHabit}
          toggleHabit={toggleHabit}
          key={el.id}
        />
      ))}
    </ul>
  );
}

function HabitItem({ habit, deleteHabit, toggleHabit }: HabitItemProps) {
  //Mon Jun 22 2026 00:00:00 GMT+0000
  const eachDay = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const streak = getStreak(habit.completions);
  return (
    <div className="rounded-xl bg-(--panel) p-4 flex flex-col gap-3">
      <div className="flex item-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.title}</span>
          {streak !== 0 && (
            <span className="text-sm text-amber-400">🔥{streak}</span>
          )}
        </div>
        <Button
          onClick={() => {
            deleteHabit(habit.id);
          }}
          variant="ghost-destructive"
          className="text-sm"
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5 overflow-x-scroll no-scrollbar ">
        {eachDay.map((date) => (
          <Button
            onClick={() => toggleHabit(habit.id, date)}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
            disabled={isFuture(date)}
            variant={
              habit.completions.some((d) => isSameDay(date, d))
                ? 'primary'
                : 'secondary'
            }
          >
            <span className="font-medium ">{format(date, 'EEE')}</span>
            <span>{format(date, 'd')}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completions.some((c) => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1);
  }
  return streak;
}
