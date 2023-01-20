import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import "./styles.scss";
import { setCurrency } from "../../store/Tracker";
import { useSelector, useDispatch } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state: any) => state.persistedReducer.currency);

  const [currentCurrency, setCurrentCurrency] = useState(currency);

  const handleChange = (e: any) => {
    setCurrentCurrency(e.target.value);
  };

  useEffect(() => {
    dispatch(setCurrency(currentCurrency));
    //trigger(["USD", "EUR"])
  }, [currentCurrency]);

  return (
    <div className="settingsBody">
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h1>Settings</h1>
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
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
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
          <FormControl
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              width: "90%",
              marginLeft: "30px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              type="text"
              variant="outlined"
            />
          </FormControl>

          <FormControl
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              width: "90%",
              marginLeft: "30px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
