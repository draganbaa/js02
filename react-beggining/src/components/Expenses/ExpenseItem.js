import { useState } from 'react';
import Card from '../GeneralUI/Card';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

function ExpenseItem({ date, title, amount }) {
  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{amount} KM</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
