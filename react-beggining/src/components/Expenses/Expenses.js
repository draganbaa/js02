import ExpenseItem from './ExpenseItem';
import Card from '../GeneralUI/Card';
import './Expenses.css';

function Expenses({ expenses }) {
  return (
    <Card className="expenses">
      <ExpenseItem
        date={expenses[0].date}
        title={expenses[0].title}
        amount={expenses[0].amount}
      />
      <ExpenseItem
        date={expenses[1].date}
        title={expenses[1].title}
        amount={expenses[1].amount}
      />
      <ExpenseItem
        date={expenses[2].date}
        title={expenses[2].title}
        amount={expenses[2].amount}
      />
    </Card>
  );
}

export default Expenses;
