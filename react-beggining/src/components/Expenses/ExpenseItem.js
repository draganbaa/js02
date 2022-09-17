import { useState } from 'react';
import Card from '../GeneralUI/Card';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

function ExpenseItem({ date, title, amount }) {
  const [myTitle, setMyTitle] = useState(title);

  const myEventHandler = () => {
    console.log('Update Function');
    setMyTitle('Update!');
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{myTitle}</h2>
        <div className="expense-item__price">{amount} KM</div>
      </div>
      <button onClick={myEventHandler}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
