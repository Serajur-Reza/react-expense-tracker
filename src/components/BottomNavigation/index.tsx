import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
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
import { styled } from "@mui/material/styles";

const MuiBottomNavigationAction = styled(BottomNavigationAction)(`
  color: #DEDEE5;
  &.Mui-selected {
    color: #FF623B;
  }
`);

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
    <div style={{ height: "500px" }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          width: "600px",
          // height: "50px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
        // elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if (newValue !== "drawer") {
              setValue(newValue);
            }
          }}
        >
          <MuiBottomNavigationAction
            value="home"
            icon={<HomeIcon />}
            onClick={(e: any) => handleRoute("/")}
          />
          <MuiBottomNavigationAction
            value="folder"
            icon={<FolderIcon />}
            onClick={(e: any) => handleRoute("/graph")}
          />
          <MuiBottomNavigationAction
            value="drawer"
            icon={
              <ControlPointIcon
                style={{
                  // width: "20px",
                  background: "#FF623B",
                  color: "#DEDEE5",
                  borderRadius: "50%",
                  // width: "10px",
                  padding: "15px",
                  // marginBottom: "20px",
                }}
              />
            }
            onClick={(e) => {
              handleDrawer(true);
            }}
          />
          <MuiBottomNavigationAction
            value="calendar"
            icon={<CalendarMonthIcon />}
          />
          <MuiBottomNavigationAction
            value="person"
            icon={<PersonIcon />}
            onClick={(e: any) => handleRoute("/settings")}
          ></MuiBottomNavigationAction>
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
                <AddIncome
                  show={openModal1}
                  close={() => setOpenModal1(false)}
                />
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
      </Paper>
    </div>
  );
};

export default BottomNav;
