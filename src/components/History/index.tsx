import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import dayjs from "dayjs";

type Props = {
  category: string;
};

const History = (props: Props) => {
  const { category } = props;

  const history = useSelector((state: any) => state.persistedReducer.history);
  const currency = useSelector((state: any) => state.persistedReducer.currency);
  const selectedDate = useSelector(
    (state: any) => state.persistedReducer.selectedDate
  );

  const startDate = useSelector(
    (state: any) => state.persistedReducer.startDate
  );

  const endDate = useSelector((state: any) => state.persistedReducer.endDate);
  const exchangeRates = useSelector(
    (state: any) => state.persistedReducer.exchangeRates
  );

  const [stats, setStats] = useState(history);

  useEffect(() => {
    console.log("formatted date:", selectedDate);
    // const tempStats = history.filter(
    //   (item: any) =>
    //     item.type === category && item.timeAdded.includes(selectedDate) dayjs(selectedDate).isBetween(startDate, endDate, "day", "[]")
    // );

    const tempStats = history.filter((item: any) => {
      console.log(
        "isBetween:",
        dayjs(dayjs(item.timeAdded).format("DD/MMMM/YYYY")).isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        )
      );
      return (
        item.type === category &&
        dayjs(dayjs(item.timeAdded).format("DD/MMMM/YYYY")).isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        )
      );
    });
    console.log("stats:", tempStats);
    setStats(tempStats);
  }, [category, startDate, endDate, history.length]);

  return (
    <div className="history">
      <h1>{category}</h1>
      <div>
        {stats && stats.length
          ? stats.map((item: any, index: number) => (
              <div
                className={`dataDiv ${
                  item.type === "income"
                    ? "income"
                    : item.type === "expense"
                    ? "expense"
                    : "savings"
                }`}
                key={index}
              >
                <h2>{item.category}</h2>
                <h3>{item.title}</h3>
                <h3>
                  {(parseFloat(item.amount) * exchangeRates[currency]).toFixed(
                    2
                  )}{" "}
                  {currency}
                </h3>
                <h5>TimeStamp: {item.timeAdded}</h5>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default History;
