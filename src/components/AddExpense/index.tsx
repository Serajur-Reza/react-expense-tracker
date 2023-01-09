import { Button, FilledInput, FormControl, InputLabel, Select,MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBalance, setExpense, setHistory } from '../../store/Tracker';
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddExpense = () => {

  const dispatch = useDispatch();
  const history = useSelector((state: any)=> state.persistedReducer.history)
  const expense = useSelector((state: any)=> state.persistedReducer.expense)
  const balance = useSelector((state: any)=> state.persistedReducer.balance)
  const exchangeRate = useSelector((state: any)=> state.persistedReducer.exchange)
  const currency = useSelector((state: any)=> state.persistedReducer.currency)
  const [dateTime, setDateTime] = useState(dayjs().format('ddd, MMMM D, YYYY h:mm A'))
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    type: 'expense',
    title: '',
    amount: '' || '0',
    category: '',
    timeAdded: dateTime,
    currency: currency
  });

  const handleOpenModal = () =>{
    setOpenModal(state=> !state)
  }

  const handleDateChange =(e: any) =>{
    setDateTime(e.format('ddd, MMMM D, YYYY h:mm A'))
    setFormData({ ...formData, ["timeAdded"]: e.format('ddd, MMMM D, YYYY h:mm A')})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const addHistory = () =>{
    console.log("FormData:", formData)
    setFormData({ ...formData})
    
    const tempHistory = [...history, formData];
    const tempExpense = (parseFloat(expense) + parseFloat(formData.amount))
    const tempBalance = (parseFloat(balance) - parseFloat(formData.amount))
    dispatch(setHistory(tempHistory))
    dispatch(setExpense(tempExpense))
    dispatch(setBalance(tempBalance))
    handleOpenModal()
  }

  
  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpenModal}>Add Expense</Button>
      <Dialog open={openModal} onClose={handleOpenModal}>
        <DialogTitle>Edit Data</DialogTitle>
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
          <Button onClick={addHistory}>Save</Button>
          <Button onClick={handleOpenModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddExpense