import { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const START_EXPENSES = [
  {
    id: 0,
    date: new Date(2022, 8, 16),
    title: 'Zubar',
    amount: 30.0,
  },
  {
    id: 1,
    date: new Date(2022, 7, 17),
    title: 'Majice',
    amount: 34.5,
  },
  {
    id: 2,
    date: new Date(2022, 6, 19),
    title: 'Fitness equiqment',
    amount: 162.4,
  },
];

function App() {
  const [expenses, setExpenses] = useState(START_EXPENSES);

  const addExpenseHandler = (expense) => {
    // console.log('In app.js');
    // console.log(expense);
    // setExpenses([expense, ...expenses]);
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </>
  );
}

export default App;
