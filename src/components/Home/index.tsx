import React, { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import {
  setCurrency,
  setExchangeDate,
  setExchangeRates,
} from "../../store/Tracker";
import { useLazyGetCurrencyConversionRateQuery } from "../../store/api";
import Stats from "../Stats";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import Calendar from "../Calendar/index";

const Home = () => {
  const state = useSelector((state: any) => state);
  console.log("state=========:", state);

  const history = useSelector((state: any) => state.persistedReducer.history);

  const dispatch = useDispatch();

  const exchangeRates = useSelector(
    (state: any) => state.persistedReducer.exchangeRates
  );
  const exchangeDate = useSelector(
    (state: any) => state.persistedReducer.exchangeDate
  );
  const [currentCurrency, setCurrentCurrency] = useState("BDT");

  const calculate = useCallback(() => {
    if (history && history.length) {
      const incomeData = history.filter((item: any) => item.type === "income");
      const expenseData = history.filter(
        (item: any) => item.type === "expense"
      );

      let allIncome = 0,
        allExpense = 0,
        tempBalance = 0;
      if (incomeData && incomeData.length) {
        for (let i = 0; i < incomeData.length; i++) {
          allIncome =
            parseFloat(allIncome.toFixed(0)) +
            parseFloat(incomeData[i].amount) / exchangeRates[currentCurrency];
        }
      }

      if (expenseData && expenseData.length) {
        for (let i = 0; i < expenseData.length; i++) {
          allExpense =
            parseFloat(allExpense.toFixed(0)) +
            parseFloat(expenseData[i].amount) / exchangeRates?.currentCurrency;
        }
      }
      tempBalance = allIncome - allExpense;
    }
  }, [dispatch]);
  const [trigger, result] = useLazyGetCurrencyConversionRateQuery();

  const handleChange = async (e: any) => {
    setCurrentCurrency(e.target.value);
  };

  useEffect(() => {
    const date = dayjs();
    const lastDate = dayjs(exchangeDate).format("YYYY-MM-DD");
    console.log("lastdate====", lastDate);
    if (date.diff(lastDate, "day")) {
      console.log("triggerd");
      trigger(["USD", "EUR"]);
      dispatch(setExchangeDate(date));
    }
    calculate();
  }, [calculate]);

  useEffect(() => {
    dispatch(setCurrency(currentCurrency));
    //trigger(["USD", "EUR"])
  }, [currentCurrency]);

  useEffect(() => {
    if (result && result?.status === "fulfilled") {
      const obj = {
        ...result.data.rates,
        BDT: 1,
      };
      dispatch(setExchangeRates(obj));
    }
  }, [result]);

  return (
    <div className="body">
      <Grid
        className="head"
        container
        style={{ margin: "0", maxHeight: "100vh" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h1 className="heading">React Expense Tracker</h1>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <div className="calendar">
            <Calendar />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              width: "90%",
              marginLeft: "30px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentCurrency}
              label="Category"
              name="category"
              onChange={handleChange}
            >
              <MenuItem value={"BDT"}>BDT</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div className="totals">
        <Stats />
      </div>
    </div>
  );
};

export default Home;
