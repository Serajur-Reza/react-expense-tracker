import React, {useCallback, useEffect, useState} from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Grid, InputLabel, Select, MenuItem } from '@mui/material'
import { setBalance, setExpense, setIncome } from '../../store/Tracker'
import { useLazyGetCurrencyConversionRateQuery } from '../../store/api'
import Stats from '../Stats'
import AddIncome from '../AddIncome'
import AddExpense from '../AddExpense'
import AddSavings from '../AddSavings'
import History from '../History';

const Home = () => {

  const state = useSelector((state: any) => state)
  
  const history = useSelector((state: any) => state.persistedReducer.history)
  console.log("state:", state)
  const dispatch = useDispatch()



  const currencyState = useSelector((state: any)=> state.persistedReducer.currency)
  const exchangeRate = useSelector((state: any)=> state.persistedReducer.exchange)
  
  const [previousCurrency, setPreviousCurrency] = useState("BDT")
  const [currentCurrency, setCurrentCurrency] = useState("BDT")

  const calculate = useCallback(() => {
      if(history && history.length){
          const incomeData = history.filter((item: any)=> item.type === 'income')
          const expenseData = history.filter((item: any)=> item.type === 'expense')

          console.log("History:", history)

          // console.log("allIncome: ", incomeData)
          // console.log("allExpense: ", expenseData)

          let allIncome = 0, allExpense = 0 , tempBalance = 0 ;
          if(incomeData && incomeData.length){
            // allIncome = incomeData.reduce((a: any, b: any)=> (parseInt(a.amount) + parseInt(b.amount)) * exchangeRate);
            for(let i = 0 ; i< incomeData.length; i++){
              allIncome = ((parseFloat(allIncome.toFixed(0)) + parseFloat(incomeData[i].amount)) * exchangeRate) ;
            }
            console.log("allIncome: ", allIncome)
          }

          if(expenseData && expenseData.length){
            for(let i = 0 ; i< expenseData.length; i++){
              allExpense = ((parseFloat(allExpense.toFixed(0)) + parseFloat(expenseData[i].amount)) * exchangeRate) ;
            }
            console.log("allExpense: ", allExpense)
          }
          tempBalance = allIncome - allExpense
  
          dispatch(setIncome(allIncome));
          dispatch(setExpense(allExpense))
          dispatch(setBalance(tempBalance))
      }        
  },[dispatch])
  const [trigger, result, lastPromiseInfo] = useLazyGetCurrencyConversionRateQuery();
  
  
  const handleChange = async (e: any) => {
    setPreviousCurrency(currentCurrency)
    setCurrentCurrency(e.target.value)
  }

  useEffect(()=>{
      calculate();
  },[calculate])

  useEffect( ()=> {
    trigger([previousCurrency, currentCurrency])
  },[currentCurrency])

  // useEffect(()=>{
  //   if(result && result?.status === "fulfilled"){
  //     console.log('Response========================>>>',result.data.rates[previousCurrency])
  //     dispatch(setExchange(result.data.rates[previousCurrency]))
  //     dispatch(setCurrency(currentCurrency))
  //   }
  // },[result])

  return (
      <div className='body'>

        <Grid className='head' container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1 className='heading'>React Expense Tracker</h1>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl style={{ marginBottom: '30px'}} fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentCurrency}
                label="Category"
                name='category'
                onChange={handleChange}
              >
                <MenuItem value={"BDT"}>BDT</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        

        <div className='totals'>
          <Stats />
        </div>

        
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <div className= 'box'>
              <AddIncome />
            </div>
            
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4}>
            <div className= 'box'>
              <AddExpense/>
            </div>
          </Grid>


          <Grid item xs={12} sm={12} md={6} lg={4}>
            <div className= 'box'>
              <AddSavings/>
            </div>
            
          </Grid>
        </Grid>

        <div className= 'box'>
          <History/>
        </div>
      </div>
  )
}

export default Home