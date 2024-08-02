import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Shop from "./components/Shop/Crud"
import Read from "./components/Reading/Reading"
import Home from "./components/home/home"



const App = () => {

 

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Crud" element={<Shop />} />
        <Route path="/Read" element={<Read />} />

        {/* <Route path="/create" element={<Create />} />
        <Route path="/update/:name" element={<Update />} />
       
        <Route path="/Date" element={<Date/>} /> */}
      </Routes>
    </div>
  );
}

export default App