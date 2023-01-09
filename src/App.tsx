import { createBrowserRouter } from "react-router-dom";
import Home from './components/Home/index';
import Graphs from './components/Graphs/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/graph',
    element: <Graphs/>
  }
])

export default router