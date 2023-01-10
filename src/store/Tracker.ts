import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    balance: 0,
    income: 0,
    expense: 0,
    savings: 0,
    history: [],
    currency: "BDT",
    exchange: 1,
    // category: ["Salary", ""]
    //conversion: 1
}

export const TrackerSlice = createSlice({
    name: 'Tracker',
    initialState,
    reducers: {
        setBalance : (state, action) => {
            return { ... state, balance: action.payload}
        },
        setIncome : (state, action) => {
            return { ... state, income: action.payload}
        },
        setExpense: (state, action) => {
            return { ...state, expense: action.payload}
        },
        setSavings: (state, action) => {
            return { ...state, savings: action.payload}
        },
        setHistory : (state, action) => {
            return { ...state, history: action.payload}
        },
        setCurrency: (state, action) => {
            return { ...state, currency: action.payload}
        },
        setExchange: (state, action) => {
            return { ...state, exchange: action.payload}
        }
    }
})

export const { setBalance, setIncome, setExpense, setSavings, setHistory, setCurrency, setExchange } = TrackerSlice.actions
export default TrackerSlice.reducer