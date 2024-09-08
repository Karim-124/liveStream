import { Route, Routes } from "react-router-dom"

import { BrowserRouter as Router } from 'react-router-dom';

import Dashboard from "./LiveStream"
import LiveStream from "./LiveStream"
import DasBoard from "./Workorder/DasBoard"
import SiBar from "./Workorder/SiBar"
import Part from "./Workorder/Part";
import Product from "./Workorder/Product";
import Step from "./Workorder/Step";
import WorkOrder from "./Workorder/WorkOrder";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DasBoard />}>
            <Route index element={<div>Home Page</div>} />
            <Route path="step" element={<Step />} />
            <Route path="part" element={<Part />} />
            <Route path="product" element={<Product />} />
            <Route path="work-order" element={<WorkOrder />} />
            {/* Add more routes here */}
          </Route>
        </Routes>
      </Router>


    </>
  )
}

export default App
