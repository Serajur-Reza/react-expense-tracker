import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import Home from './components/Home/index';
import Graphs from './components/Graphs/index';
import Navbar from './components/Navbar/index';
import { ToastContainer } from "react-toastify";
import './App.scss'
import BottomNav from "./components/BottomNavigation";

const App = () => {
  return (
    <div className="body">
      <BrowserRouter>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/graph" element={<Graphs />}/>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
      <BottomNav />
{/* Same as */}
{/* <ToastContainer /> */}
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
    </div>
  )
}

export default App