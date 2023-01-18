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
import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.scss";
import AddIncome from "../AddIncome";
import AddExpense from "../AddExpense";
import AddSavings from "../AddSavings/index";

const BottomNav = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("home");
  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);

  const handleDrawerOpen = () => {
    console.log("OPen_______", open);
    setOpen((state) => !state);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          // position: "fixed",
          bottom: 0,
        }}
        value={value}
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
        />
        <BottomNavigationAction value="folder" icon={<FolderIcon />} />
        <BottomNavigationAction
          icon={<ControlPointIcon />}
          onClick={handleDrawerOpen}
          style={{ background: "orange", color: "white" }}
        />
        <BottomNavigationAction value="calendar" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction value="person" icon={<PersonIcon />} />
      </BottomNavigation>

      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => handleDrawerClose()}
      >
        <Drawer
          variant="persistent"
          open={open}
          anchor="bottom"
          sx={{
            "& .MuiPaper-root": {
              width: 600,
              margin: "50px auto",
            },
          }}
        >
          <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem button>
              <ListItemText
                primary="Add Income"
                onClick={() => {
                  setOpenModal1(true);
                  handleDrawerClose();
                }}
              />
              <AddIncome show={openModal1} close={() => setOpenModal1(false)} />
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemText
                primary="Add Expense"
                onClick={() => {
                  setOpenModal2(true);
                  handleDrawerClose();
                }}
              />

              <AddExpense
                show={openModal2}
                close={() => setOpenModal2(false)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="Add Savings"
                onClick={() => {
                  setOpenModal3(true);
                  handleDrawerClose();
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
