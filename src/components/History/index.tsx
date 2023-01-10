import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./styles.scss"
import { FormControl, InputLabel, FilledInput, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, TextField } from '@mui/material'
import { setExchange, setHistory } from '../../store/Tracker'

const History = () => {

  const dispatch = useDispatch()
  const history = useSelector((state: any)=> state.persistedReducer.history)
  const currency = useSelector((state: any)=> state.persistedReducer.currency)
  const exchangeRate = useSelector((state: any)=> state.persistedReducer.exchange)

  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState(history)


  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenEdit = () => {
    setOpenEdit(state=>  !state)
  }

  const handleOpenDelete = () => {
    setOpenDelete(state=>  !state)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchTerm(e.target.value)
  }

  useEffect(()=>{
    if(!searchTerm){
      setStats(history)
    }
    else{
      const filteredStats = history.filter((item: any) => item.text.includes(searchTerm))
      setStats(filteredStats)
    }
  },[history, searchTerm])

  useEffect(()=>{
    const tempHistory = [];

    for(let i = 0; i < history.length; i++){
      // if(history[i].currency !== currency){
      //   let amount = history[i].amount / exchangeRate
      //   tempHistory.push({...history[i], amount: amount})
      // }
      // else{
      //   tempHistory.push(history[i])
      // }

      let amount = history[i].amount / exchangeRate
      tempHistory.push({...history[i], amount: amount})
    }

    console.log("tempHistory:", tempHistory)

    dispatch(setHistory(tempHistory))
    setStats(tempHistory)
  },[exchangeRate])

  // useEffect(()=>{
  //   dispatch()
  // },[])
  


  return (
    <div>
      {/* <h1>History</h1> */}

      <FormControl onChange = {handleChange} fullWidth variant='filled'>
          <InputLabel>Text</InputLabel>
          <FilledInput name='text' margin='dense' type='text'/>
      </FormControl>
      <div>
        {
          stats && stats.length ? stats.map((item: any, index: number)=>(
            <div className={ `dataDiv ${item.type === 'income'? 'income': item.type === 'expense'? 'expense' : 'savings'}`} key={index}>
              <h2>{item.type}</h2>
              <h3>{item.title}</h3>
              <h3>{parseFloat(item.amount) * exchangeRate} {(currency)}</h3>
              <h5>TimeStamp: {item.timeAdded}</h5>
              <h5>Category: {item.category}</h5>

              <Button variant='outlined' color='primary' onClick={handleOpenEdit}>Edit</Button>
              <Button variant='outlined' color='error' onClick={handleOpenDelete}>Delete</Button>


              <Dialog open={openEdit} onClose={handleOpenEdit}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Text"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Source"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleOpenEdit}>Cancel</Button>
                  <Button onClick={handleOpenEdit}>Save</Button>
                </DialogActions>
              </Dialog>


              <Dialog open={openDelete} onClose={handleOpenDelete}>
                <DialogTitle>Delete Data</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure want to delete this data
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleOpenDelete}>Cancel</Button>
                  <Button onClick={handleOpenDelete}>Delete</Button>
                </DialogActions>
              </Dialog>
            </div>
          )) : null
        }
      </div>
    </div>
  )
}

export default History