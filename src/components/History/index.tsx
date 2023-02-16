import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import dayjs from "dayjs";
import {
  Card,
  Box,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
} from "@mui/material";
import image from "../../static/images/live-from-space.jpg";
import getSymbolFromCurrency from "currency-symbol-map";

type Props = {
  category: string;
};

const History = (props: Props) => {
  const { category } = props;

  const history = useSelector((state: any) => state.persistedReducer.history);
  const currency = useSelector((state: any) => state.persistedReducer.currency);
  const selectedDate = useSelector(
    (state: any) => state.persistedReducer.selectedDate
  );

  const startDate = useSelector(
    (state: any) => state.persistedReducer.startDate
  );

  const endDate = useSelector((state: any) => state.persistedReducer.endDate);
  const exchangeRates = useSelector(
    (state: any) => state.persistedReducer.exchangeRates
  );

  const [stats, setStats] = useState(history);

  useEffect(() => {
    console.log("formatted date:", selectedDate);
    // const tempStats = history.filter(
    //   (item: any) =>
    //     item.type === category && item.timeAdded.includes(selectedDate) dayjs(selectedDate).isBetween(startDate, endDate, "day", "[]")
    // );

    const tempStats = history.filter((item: any) => {
      console.log(
        "isBetween:",
        dayjs(dayjs(item.timeAdded).format("DD/MMMM/YYYY")).isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        )
      );
      return (
        item.type === category &&
        dayjs(dayjs(item.timeAdded).format("DD/MMMM/YYYY")).isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        )
      );
    });
    console.log("stats:", tempStats);
    setStats(tempStats);
  }, [category, startDate, endDate, history.length]);

  return (
    <div className="history">
      <h1>{category}</h1>
      <div>
        {stats && stats.length
          ? stats.map((item: any, index: number) => (
              <div key={index} style={{ marginTop: "20px" }}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 151, padding: "5px" }}
                      // image="../../static/images/live-from-space.jpg"
                      image={image}
                      alt="Live from space album cover"
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {item.title || "no title"}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {item.category}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {(
                          parseFloat(item.amount) * exchangeRates[currency]
                        ).toFixed(2)}{" "}
                        {getSymbolFromCurrency(currency)}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {dayjs(item.timeAdded).format("DD/MM/YYYY")}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    ></Box>
                  </Box>
                </Card>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default History;
