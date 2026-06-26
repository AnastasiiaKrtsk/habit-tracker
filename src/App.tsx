import { Header } from './Header.tsx';
import { HabitForm } from './HabitForm.tsx';
import { HabitList } from './HabitList.tsx';

import { HabitProvider } from './context/HabitProvider.tsx';
import { useState } from 'react';
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';

function App() {
  const [weekOffset, setWeekOffset] = useState(0);
  console.log(weekOffset);
  const week = addWeeks(new Date(), weekOffset);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onNext={() => setWeekOffset((o) => o + 1)}
          onPrev={() => setWeekOffset((o) => o - 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
}

export default App;
