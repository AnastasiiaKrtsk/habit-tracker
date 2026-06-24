import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  startOfWeek,
} from 'date-fns';
import { Button } from './Button';

export function HabitList() {
  const habits = [
    { id: '1', title: 'new1' },
    { id: '2', title: 'new2' },
    { id: '3', title: 'new3' },
  ];
  if (habits.length === 0) {
    return <p className="text-center py-12">No habits yet.</p>;
  }
  return (
    <ul className="flex flex-col gap-3">
      {habits.map((el) => (
        <HabitItem key={el.id} habit={el} />
      ))}
    </ul>
  );
}

type HabitItemProps = {
  habit: { id: string; title: string };
};

function HabitItem({ habit }: HabitItemProps) {
  const eachDay = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return (
    <div className="rounded-xl bg-(--panel) p-4 flex flex-col gap-3">
      <div className="flex item-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.title}</span>
          <span className="text-sm text-amber-400">🔥3</span>
        </div>
        <Button variant="ghost-destructive" className="text-sm">
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5 overflow-x-scroll no-scrollbar ">
        {eachDay.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
            disabled={isFuture(date)}
          >
            <span className="font-medium ">{format(date, 'EEE')}</span>
            <span>{format(date, 'd')}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
