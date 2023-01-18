import { Button, FilledInput, FormControl, InputLabel, Select,MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBalance, setExpense, setHistory } from '../../store/Tracker';
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import {ModalProps} from '../../types/index'

const AddExpense = (props: ModalProps) => {

  const dispatch = useDispatch();
  const history = useSelector((state: any)=> state.persistedReducer.history)
  const expense = useSelector((state: any)=> state.persistedReducer.expense)
  const balance = useSelector((state: any)=> state.persistedReducer.balance)
  const exchangeRates = useSelector((state: any)=> state.persistedReducer.exchangeRates)
  const currency = useSelector((state: any)=> state.persistedReducer.currency)
  const [dateTime, setDateTime] = useState(dayjs().format('ddd, MMMM D, YYYY h:mm A'))
  //const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    type: 'expense',
    title: '',
    amount: '' || '0',
    category: '',
    timeAdded: dateTime,
    currency: currency
  });


  const handleDateChange =(e: any) =>{
    setDateTime(e.format('ddd, MMMM D, YYYY h:mm A'))
    setFormData({ ...formData, ["timeAdded"]: e.format('ddd, MMMM D, YYYY h:mm A')})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.name === 'amount'){
      const amount = (parseFloat(e.target.value) / exchangeRates[currency]).toFixed(2)
      setFormData({ ...formData, [e.target.name]: amount})
    }
    else{
      setFormData({ ...formData, [e.target.name]: e.target.value})
    }
  }

  const addHistory = () =>{
    console.log("FormData:", formData)
    // const amount = (parseFloat(formData.amount) / exchangeRates[currency]).toFixed(2)
    // setFormData({ ...formData, amount: amount})
    
    const tempHistory = [...history, formData];
    const tempExpense = (parseFloat(expense) + parseFloat(formData.amount))
    const tempBalance = (parseFloat(balance) - parseFloat(formData.amount))
    dispatch(setHistory(tempHistory))
    dispatch(setExpense(tempExpense))
    dispatch(setBalance(tempBalance))
    props.close()

    toast.success('Expense added', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  
  return (
    <div>
      {/* <Button variant='contained' color='primary' onClick={handleOpenModal}>Add Expense</Button> */}
      <Dialog open={props.show} onClose={()=> props.close()}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <form>
            <FormControl style={{ marginBottom: '30px'}} onChange = {handleChange} fullWidth variant='filled'>
                <InputLabel>Title</InputLabel>
                <FilledInput name='title' margin='dense' type='text'/>
            </FormControl>

            <FormControl style={{ marginBottom: '30px'}} fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={age}
                label="Category"
                name='category'
                onChange={(e: any)=> handleChange(e)}
              >
                <MenuItem value={"Salary"}>Salary</MenuItem>
                <MenuItem value={"Freelancing"}>Freelancing</MenuItem>
                <MenuItem value={"Tution"}>Tution</MenuItem>
                <MenuItem value={"Driving"}>Driving</MenuItem>
                <MenuItem value={"Male Servant"}>Male Servant</MenuItem>
                <MenuItem value={"Tution"}>Tution</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ marginBottom: '30px'}} onChange = {handleChange} fullWidth variant='filled'>
                <InputLabel>Amount (in {currency})</InputLabel>
                <FilledInput name='amount' margin='dense' type='number'/>
            </FormControl>

            <LocalizationProvider style={{ marginBottom: '30px'}} dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="TimeAdded"
                value={dateTime}
                onChange={handleDateChange}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={addHistory} variant="outlined">Save</Button>
          <Button onClick={()=> props.close()} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddExpense