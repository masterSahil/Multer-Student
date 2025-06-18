import { useState } from 'react'
import Form from './Form'
import View from './View'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import ViewAll from './ViewAll'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAll />} />
          <Route path="/add" element={<Form />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
