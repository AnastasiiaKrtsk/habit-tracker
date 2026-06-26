import { format, isFuture, isSameDay, subDays } from 'date-fns';
import { Button } from './Button';
import { useHabit, type Habit } from './context/habit.context';

export function HabitList({ visibleDates }: { visibleDates: Date[] }) {
  const { habits } = useHabit();
  if (habits.length === 0) {
    return <p className="text-center py-12">No habits yet.</p>;
  }
  return (
    <ul className="flex flex-col gap-3">
      {habits.map((el) => (
        <HabitItem habit={el} key={el.id} visibleDates={visibleDates} />
      ))}
    </ul>
  );
}

function HabitItem({
  habit,
  visibleDates,
}: {
  habit: Habit;
  visibleDates: Date[];
}) {
  const { deleteHabit, toggleHabit } = useHabit();

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
        {visibleDates.map((date) => (
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
