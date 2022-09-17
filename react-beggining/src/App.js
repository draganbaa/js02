import Expenses from './components/Expenses/Expenses';

function App() {
  const expenses = [
    {
      id: 0,
      date: new Date(2022, 8, 16),
      title: 'Zubar',
      amount: 30.0,
    },
    {
      id: 1,
      date: new Date(2022, 8, 17),
      title: 'Majice',
      amount: 34.5,
    },
    {
      id: 2,
      date: new Date(2022, 8, 19),
      title: 'Fitness equiqment',
      amount: 162.4,
    },
  ];

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <>
      <h1>Hi</h1>
      <Expenses expenses={expenses} />
    </>
  );
}

export default App;
