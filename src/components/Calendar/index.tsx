import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import "./styles.scss";
import { setEndDate, setStartDate } from "../../store/Tracker";
import { useDispatch } from "react-redux";
import * as isBetween from "dayjs/plugin/isBetween";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
dayjs.extend(isBetween);

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const dispatch = useDispatch();
  const [days, setDays] = useState<any[]>([]);
  const [week, setWeek] = useState(dayjs());
  const [selected, setSelected] = useState(dayjs().format("DD/MMMM/YYYY"));
  const [selectedMonth, setSelectedMonth] = useState("");
  const [view, setView] = useState("WeekView");
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
  ]);
  const [monthIndex, setMonthIndex] = useState(4);
  useEffect(() => {
    console.log("currentWeek:", week.format("DD/MMMM/YYYY"));
    const daysArray = [];
    for (let i = 0; i < 7; i++) {
      const tempDay = week.day(i).format("ddd");
      const tempDate = week.day(i).format("D");
      const obj = {
        day: tempDay,
        dateNum: tempDate,
        date: week.day(i).format("DD/MMMM/YYYY"),
      };
      daysArray.push(obj);
    }
    setDays(daysArray);
  }, [week]);

  useEffect(() => {
    const tempDate = dayjs(selected).format("DD/MMMM/YYYY");
    dispatch(setStartDate(tempDate));
    dispatch(setEndDate(tempDate));
  }, [selected]);

  const previousWeek = () => {
    const prevWeek = week.subtract(1, "week");
    setWeek(prevWeek);
    console.log("prevWeek:", prevWeek);
  };

  const previousMonth = () => {
    let tempMonths = [];
    for (let i = 1; i <= 4; i++) {
      console.log(
        dayjs(
          dayjs()
            .month(monthIndex - i - 4)
            .format("MMMM")
        )
      );
      tempMonths.push(
        dayjs()
          .month(monthIndex - i - 4)
          .format("MMMM")
      );
    }
    tempMonths = tempMonths.reverse();
    setMonths(tempMonths);
    setMonthIndex((state) => state - 4);
    console.log(
      "month:",
      dayjs().month(monthsArray.indexOf(selectedMonth)).format("MMMM")
    );
  };

  const addWeek = () => {
    const addedWeek = week.add(1, "week");
    setWeek(addedWeek);
    console.log("addWeek:", addedWeek);
  };

  const addMonth = () => {
    const tempMonths = [];
    for (let i = 0; i < 4; i++) {
      console.log(
        dayjs()
          .month(monthIndex + i)
          .format("MMMM")
      );
      tempMonths.push(
        dayjs()
          .month(monthIndex + i)
          .format("MMMM")
      );
    }
    setMonths(tempMonths);
    setMonthIndex((state) => state + 4);
    console.log(
      "month:",
      dayjs().month(monthsArray.indexOf(selectedMonth)).format("MMMM")
    );
  };

  const handleDate = (e: any, item: any) => {
    setSelected(item.date);
  };

  const previousHandler = () => {
    if (view == "WeekView") {
      previousWeek();
    } else if (view == "MonthView") {
      previousMonth();
    }
  };

  const nextHandler = () => {
    if (view == "WeekView") {
      addWeek();
    } else if (view == "MonthView") {
      addMonth();
    }
  };

  const monthSelector = (item: string) => {
    setSelectedMonth(item);

    const start = dayjs()
      .month(monthsArray.indexOf(item))
      .startOf("month")
      .format("DD/MMMM/YYYY");

    const end = dayjs()
      .month(monthsArray.indexOf(item))
      .endOf("month")
      .format("DD/MMMM/YYYY");

    dispatch(setStartDate(start));
    dispatch(setEndDate(end));
    console.log(
      "diff:",
      dayjs("18/January/2023").isBetween(
        "01/January/2023",
        "31/January/2023",
        "day",
        "[]"
      )
    );
  };

  const WeekView = () => {
    return (
      <Grid item xs={12}>
        <div className="weekdays">
          {days && days.length
            ? days.map((item, index) => (
                <div key={index}>
                  <div style={{ paddingBottom: "10px" }}>
                    <h3>{item.day}</h3>
                  </div>

                  <div
                    className={`day ${item.date === selected ? "today" : ""}`}
                    onClick={(e: any) => handleDate(e, item)}
                  >
                    <h3>
                      {item.dateNum}
                      {/* <br />
                      {item.date === selected ? "." : ""} */}
                    </h3>
                    {/* <p>{item.date === selected ? "." : ""}</p> */}
                  </div>
                </div>
              ))
            : null}
        </div>
      </Grid>
    );
  };

  const MonthView = () => {
    return (
      <Grid container>
        {months && months.length
          ? months.map((item, index) => (
              <Grid
                item
                xs={6}
                md={3}
                lg={3}
                flexDirection={"column"}
                key={index}
              >
                <div
                  className={`day ${item === selectedMonth ? "today" : ""}`}
                  onClick={(e: any) => monthSelector(item)}
                >
                  <h3>{item}</h3>
                </div>
              </Grid>
            ))
          : null}
      </Grid>
    );
  };

  return (
    <div className="calendar">
      <Grid container>
        <Grid item xs={12} justifyContent={"space-between"}>
          <div className="weekButtons">
            <a onClick={previousHandler} className="icon">
              <ArrowBackIosIcon />
            </a>
            <FormControl
              style={{
                width: "50%",
                // marginTop: "5px",
                // padding: "15px",
              }}
            >
              <Select
                className="selectMenu"
                variant="standard"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={view}
                label="Category"
                name="category"
                onChange={(e: any) => setView(e.target.value)}
              >
                <MenuItem value={"WeekView"}>WeekView</MenuItem>
                <MenuItem value={"MonthView"}>MonthView</MenuItem>
              </Select>
            </FormControl>

            <a onClick={nextHandler} className="icon">
              <ArrowForwardIosIcon />
            </a>
          </div>
        </Grid>
        {view === "WeekView" ? (
          <WeekView />
        ) : view === "MonthView" ? (
          <MonthView />
        ) : null}
      </Grid>
    </div>
  );
};

export default Calendar;
