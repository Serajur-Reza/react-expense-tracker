import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  balance: 0,
  income: 0,
  expense: 0,
  savings: 0,
  history: [],
  currency: "BDT",
  exchangeRates: { USD: 0.009516, EUR: 0.008855, BDT: 1 },
  exchangeDate: dayjs("2023-01-11"),
  exchangeBase: "BDT",
  selectedDate: dayjs().format("ddd, MMMM D"),
  startDate: dayjs().format("ddd, MMMM D"),
  endDate: dayjs().format("ddd, MMMM D"),
  // category: ["Salary", ""]
  //conversion: 1
};

export const TrackerSlice = createSlice({
  name: "Tracker",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      return { ...state, balance: action.payload };
    },
    setIncome: (state, action) => {
      return { ...state, income: action.payload };
    },
    setExpense: (state, action) => {
      return { ...state, expense: action.payload };
    },
    setSavings: (state, action) => {
      return { ...state, savings: action.payload };
    },
    setHistory: (state, action) => {
      return { ...state, history: action.payload };
    },
    setCurrency: (state, action) => {
      return { ...state, currency: action.payload };
    },
    // setExchange: (state, action) => {
    //     return { ...state, exchange: action.payload}
    // }
    setExchangeDate: (state, action) => {
      return { ...state, exchangeDate: action.payload };
    },
    setExchangeRates: (state, action) => {
      return { ...state, exchangeRates: action.payload };
    },
    setSelectedDate: (state, action) => {
      return {
        ...state,
        selectedDate: action.payload,
      };
    },
    setStartDate: (state, action) => {
      return {
        ...state,
        startDate: action.payload,
      };
    },
    setEndDate: (state, action) => {
      return {
        ...state,
        endDate: action.payload,
      };
    },
  },
});

export const {
  setBalance,
  setIncome,
  setExpense,
  setSavings,
  setHistory,
  setCurrency,
  setExchangeDate,
  setExchangeRates,
  setSelectedDate,
  setStartDate,
  setEndDate,
} = TrackerSlice.actions;
export default TrackerSlice.reducer;
