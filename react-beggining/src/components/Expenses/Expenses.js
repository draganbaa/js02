import ExpenseItem from './ExpenseItem';
import Card from '../GeneralUI/Card';
import './Expenses.css';
import ExpensesChart from './ExpensesChart';

function Expenses({ expenses }) {
  return (
    <Card className="expenses">
      <ExpensesChart expenses={expenses} />
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          date={expense.date}
          title={expense.title}
          amount={expense.amount}
        />
      ))}

      {/* <ExpenseItem
        date={expenses[0].date}
        title={expenses[0].title}
        amount={expenses[0].amount}
      /> */}
    </Card>
  );
}

export default Expenses;
