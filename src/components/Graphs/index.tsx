import React from 'react';
import MonthView from './MonthView/index';
import ExpenseView from './ExpenseView/index';
import './styles.scss'
import IncomeView from './IncomeView/index';
import SavingsView from './SavingsView';

const Graphs = () => {
    return (
        <div className='body'>
           <MonthView />
           <ExpenseView />
           <IncomeView />
           <SavingsView />
        </div>
    );
};

export default Graphs;