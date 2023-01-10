import React, {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import { Grid } from '@mui/material'
import { setBalance, setExpense, setIncome, setSavings } from '../../store/Tracker'


const Stats = () => {

    const dispatch = useDispatch()
    const balance = useSelector((state: any) => state.persistedReducer.balance)
    const income = useSelector((state: any) => state.persistedReducer.income)
    const expense = useSelector((state: any) => state.persistedReducer.expense)
    const savings = useSelector((state: any) => state.persistedReducer.savings)
    const exchangeRate = useSelector((state: any)=> state.persistedReducer.exchange)

    console.log("income:", typeof income)

    useEffect(()=>{
      const tempBalance = parseFloat(balance) / exchangeRate;
      const tempIncome = parseFloat(income) / exchangeRate;
      const tempExpense = parseFloat(expense) / exchangeRate;
      const tempSavings = parseFloat(savings) / exchangeRate;

      // dispatch(setBalance(tempBalance))
      // dispatch(setIncome(tempIncome))
      // dispatch(setExpense(tempExpense))
      // dispatch(setSavings(tempSavings))

    },[exchangeRate])
    

    return (
      
      <div className='stats'>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
          <div className='totalBalance'>
            <h1>Total Balance: {parseFloat(balance) / exchangeRate}</h1>
          </div>
            
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <div className='totalIncome'>
              <h1>Total Income: {parseFloat(income) / exchangeRate }</h1>
            </div>
          </Grid>


          <Grid item xs={12} sm={12} md={6} lg={3}>
            <div className='totalExpense'>
              <h1>Total Expense: {parseFloat(expense) / exchangeRate}</h1>
            </div>
            
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <div className='totalSavings'>
              <h1>Total savings: {parseFloat(savings) / exchangeRate}</h1>
            </div>
            
          </Grid>
        </Grid>
      </div>
    )
}

export default Stats