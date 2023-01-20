import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { Suspense } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.scss";
// import AddIncome from "../AddIncome";
// import AddExpense from "../AddExpense";
// import AddSavings from "../AddSavings/index";
import { useNavigate } from "react-router-dom";
const AddIncome = React.lazy(() => import("../AddIncome"));
const AddExpense = React.lazy(() => import("../AddExpense"));
const AddSavings = React.lazy(() => import("../AddSavings"));

const BottomNav = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("home");
  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawer = (openValue: boolean) => {
    console.log("open______:", open);
    setOpen(openValue);
  };

  const handleRoute = (route: any) => {
    navigate(route);
  };

  const style = {
    width: "100%",
    maxWidth: 500,
    bgcolor: "background.paper",
  };

  return (
    <div>
      <BottomNavigation
        style={{
          backgroundColor: "gray",
          width: "600px",
          bottom: 0,
        }}
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== "drawer") {
            setValue(newValue);
          }
        }}
      >
        <BottomNavigationAction
          value="home"
          icon={<HomeIcon />}
          sx={{
            "& .Mui-selected": {
              width: 500,
              margin: "0px auto",
              color: "green",
            },
          }}
          onClick={(e: any) => handleRoute("/")}
        />
        <BottomNavigationAction
          value="folder"
          icon={<FolderIcon />}
          onClick={(e: any) => handleRoute("/graph")}
        />
        <BottomNavigationAction
          value="drawer"
          icon={<ControlPointIcon />}
          onClick={(e) => {
            handleDrawer(true);
          }}
          style={{ background: "orange", color: "white" }}
        />
        <BottomNavigationAction value="calendar" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction
          value="person"
          icon={<PersonIcon />}
          onClick={(e: any) => handleRoute("/settings")}
        ></BottomNavigationAction>
      </BottomNavigation>

      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={(e) => handleDrawer(false)}
      >
        <Drawer
          open={open}
          anchor="bottom"
          onClose={() => handleDrawer(false)}
          sx={{
            "& .MuiPaper-root": {
              width: 600,
              margin: "50px auto",
            },
          }}
        >
          <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem button style={{ width: 600 }}>
              <ListItemText
                primary="Add Income"
                onClick={() => {
                  setOpenModal1(true);
                }}
              />
              <AddIncome show={openModal1} close={() => setOpenModal1(false)} />
            </ListItem>
            <Divider style={{ width: 600 }} />
            <ListItem button divider style={{ width: 600 }}>
              <ListItemText
                primary="Add Expense"
                onClick={() => {
                  setOpenModal2(true);
                }}
              />

              <AddExpense
                show={openModal2}
                close={() => setOpenModal2(false)}
              />
            </ListItem>
            <ListItem button style={{ width: 600 }}>
              <ListItemText
                primary="Add Savings"
                onClick={() => {
                  setOpenModal3(true);
                }}
              />
              <AddSavings
                show={openModal3}
                close={() => setOpenModal3(false)}
              />
            </ListItem>
          </List>
        </Drawer>
      </ClickAwayListener>
    </div>
  );
};

export default BottomNav;
