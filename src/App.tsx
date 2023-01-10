import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import Home from './components/Home/index';
import Graphs from './components/Graphs/index';
import Navbar from './components/Navbar/index';
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/graph" element={<Graphs />}/>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
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