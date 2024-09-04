import { Route, Routes } from "react-router-dom"

import { BrowserRouter as Router } from 'react-router-dom';

import Dashboard from "./LiveStream"
import LiveStream from "./LiveStream"
import DasBoard from "./Workorder/DasBoard"
import SiBar from "./Workorder/SiBar"
import WorkOrderPage from "./Workorder/WorkOrderPage"


function App() {

  return (
    <>
  <Router>
      <Routes>
        <Route path="/" element={<DasBoard />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="work-order" element={<WorkOrderPage />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>    
   
    </>
  )
}

export default App
