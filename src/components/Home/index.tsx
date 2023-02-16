import { useCallback, useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { setExchangeDate, setExchangeRates } from "../../store/Tracker";
import { useLazyGetCurrencyConversionRateQuery } from "../../store/api";
import Stats from "../Stats";
import dayjs from "dayjs";
import Calendar from "../Calendar/index";

const Home = () => {
  const state = useSelector((state: any) => state);
  console.log("state=========:", state);

  const history = useSelector((state: any) => state.persistedReducer.history);
  const currency = useSelector((state: any) => state.persistedReducer.currency);

  const dispatch = useDispatch();

  const exchangeRates = useSelector(
    (state: any) => state.persistedReducer.exchangeRates
  );
  const exchangeDate = useSelector(
    (state: any) => state.persistedReducer.exchangeDate
  );
  // const [currentCurrency, setCurrentCurrency] = useState(currency);

  const calculate = useCallback(() => {
    if (history && history.length) {
      const incomeData = history.filter((item: any) => item.type === "income");
      const expenseData = history.filter(
        (item: any) => item.type === "expense"
      );

      let allIncome = 0,
        allExpense = 0;
       if (incomeData && incomeData.length) {
        for (let i = 0; i < incomeData.length; i++) {
          allIncome =
            parseFloat(allIncome.toFixed(0)) +
            parseFloat(incomeData[i].amount) / exchangeRates[currency];
        }
      }

      if (expenseData && expenseData.length) {
        for (let i = 0; i < expenseData.length; i++) {
          allExpense =
            parseFloat(allExpense.toFixed(0)) +
            parseFloat(expenseData[i].amount) / exchangeRates?.currency;
        }
      }
    }
  }, [dispatch]);
  const [trigger, result] = useLazyGetCurrencyConversionRateQuery();

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
      </Grid>

      <div className="totals">
        <Stats />
      </div>
    </div>
  );
};

export default Home;
