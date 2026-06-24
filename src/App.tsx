import { Header } from './Header.tsx';
import { HabitForm } from './HabitForm.tsx';
import { HabitList } from './HabitList.tsx';

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm />
      <HabitList />
    </div>
  );
}

export default App;
