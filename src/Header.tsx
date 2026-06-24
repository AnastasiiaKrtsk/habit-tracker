import { Button } from './Button.tsx';
import { endOfWeek, format, startOfWeek } from 'date-fns';

const fromDate = startOfWeek(new Date(), { weekStartsOn: 1 });
const toDate = endOfWeek(new Date(), { weekStartsOn: 1 });

console.log();
export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-400 text-sm text-(--second)">
          1 / 1 done today
        </span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-sm text-(--second)">
          {format(fromDate, 'MMM d')} - {format(toDate, 'MMM d')}
        </span>
        <div className="flex items-center gap-3">
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </header>
  );
}
