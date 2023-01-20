import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home/index";
// import Graphs from "./components/Graphs/index";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import React, { Suspense } from "react";
// import BottomNav from "./components/BottomNavigation";
// import Settings from "./components/Settings";
const BottomNav = React.lazy(() => import("./components/BottomNavigation"));
const Settings = React.lazy(() => import("./components/Settings"));
const Home = React.lazy(() => import("./components/Home/index"));
const Graphs = React.lazy(() => import("./components/Graphs/index"));

const App = () => {
  return (
    <div className="body">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/graph" element={<Graphs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Home />} />
        </Routes>
        {/* </Router> */}
        <BottomNav />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Suspense>
    </div>
  );
};

export default App;
