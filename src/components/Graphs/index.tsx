import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

const MonthView = React.lazy(() => import("./MonthView/index"));
const ExpenseView = React.lazy(() => import("./ExpenseView/index"));
const IncomeView = React.lazy(() => import("./IncomeView/index"));
const SavingsView = React.lazy(() => import("./SavingsView/index"));

const Graphs = () => {
  const state = useSelector((state: any) => state);
  console.log("state:", state);
  return (
    <div>
      <MonthView />
      <ExpenseView />
      <IncomeView />
      <SavingsView />
    </div>
  );
};

export default Graphs;
