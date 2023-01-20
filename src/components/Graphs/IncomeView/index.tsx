import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";

const IncomeView = () => {
  const history = useSelector((state: any) => state.persistedReducer.history);
  const currency = useSelector((state: any) => state.persistedReducer.currency);
  const [expenseData, setExpenseData] = useState<any>([]);

  useEffect(() => {
    const tempMonthlyData = [],
      tempData = [];
    const optionSet = new Set();
    //optionSet.add(1);
    for (let i = 0; i < history.length; i++) {
      if (history[i].type === "income") {
        tempData.push({
          value: parseFloat(history[i].amount),
          name: history[i].category,
        });
        optionSet.add(history[i].category);
      }
    }

    console.log("tempData:", tempData);
    for (let j of optionSet) {
      let categorySum = 0;
      for (let i = 0; i < tempData.length; i++) {
        if (j === tempData[i].name) {
          categorySum = categorySum + tempData[i].value;
        }
      }
      tempMonthlyData.push({ value: categorySum, name: j });
    }

    console.log("tempMonthlyFIlterdata:", tempMonthlyData);

    if (expenseData.length !== tempMonthlyData.length) {
      setExpenseData(tempMonthlyData);
    }
  }, [history, expenseData]);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        name: `Income in ${currency}`,
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: expenseData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <div style={{ margin: "2rem" }}>
      <h1>Total Income in {currency}</h1>

      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
};

export default IncomeView;
