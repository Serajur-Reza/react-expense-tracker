import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import { Grid } from "@mui/material";
// import History from "../History/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/effect-fade";
import dayjs from "dayjs";
import getSymbolFromCurrency from "currency-symbol-map";

const History = React.lazy(() => import("../History/index"));

const categories = ["income", "expense", "savings"];
const Stats = () => {
  const history = useSelector((state: any) => state.persistedReducer.history);

  const startDate = useSelector(
    (state: any) => state.persistedReducer.startDate
  );
  const endDate = useSelector((state: any) => state.persistedReducer.endDate);
  const exchangeRates = useSelector(
    (state: any) => state.persistedReducer.exchangeRates
  );

  const currency = useSelector((state: any) => state.persistedReducer.currency);

  const [category, setCategory] = useState("income");
  const [categorySum, setCategorySum] = useState(0);

  const handleCategory = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    const categoryHistory = history.filter(
      (item: any) =>
        item.type === category &&
        dayjs(dayjs(item.timeAdded).format("DD/MMMM/YYYY")).isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        )
    );

    let sum = 0;
    for (let i = 0; i < categoryHistory.length; i++) {
      sum = sum + parseFloat(categoryHistory[i].amount);
    }
    console.log("Category Sum:", sum);
    setCategorySum(sum);
  }, [category, startDate, endDate, history.length]);

  return (
    <div>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        className="slider"
        onSlideChange={(swiperCore) => {
          handleCategory(categories[swiperCore.activeIndex]);
        }}
      >
        <SwiperSlide>
          <div className="totalIncome">
            <h1>Total Income</h1>
            {category === "income" ? (
              <h3>
                {(
                  parseFloat(categorySum.toFixed(0)) * exchangeRates[currency]
                ).toFixed(2)}{" "}
                {getSymbolFromCurrency(currency)}
              </h3>
            ) : (
              <h3>
                0.00
                {getSymbolFromCurrency(currency)}
              </h3>
            )}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="totalExpense">
            <h1>Total Expense</h1>
            <h3>
              {category === "expense" ? (
                <h3>
                  {(
                    parseFloat(categorySum.toFixed(0)) * exchangeRates[currency]
                  ).toFixed(2)}{" "}
                  {getSymbolFromCurrency(currency)}
                </h3>
              ) : (
                <h3>
                  0.00
                  {getSymbolFromCurrency(currency)}
                </h3>
              )}
            </h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="totalSavings">
            <h1>Total Savings</h1>
            <h3>
              {category === "savings" ? (
                <h3>
                  {(
                    parseFloat(categorySum.toFixed(0)) * exchangeRates[currency]
                  ).toFixed(2)}{" "}
                  {getSymbolFromCurrency(currency)}
                </h3>
              ) : (
                <h3>
                  0.00
                  {getSymbolFromCurrency(currency)}
                </h3>
              )}
            </h3>
          </div>
        </SwiperSlide>
      </Swiper>
      <Grid container spacing={3}></Grid>

      {category ? <History category={category} /> : null}
    </div>
  );
};

export default Stats;
