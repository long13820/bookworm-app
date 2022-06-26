import React from "react";
import Header from "./components/layout/Header/Header";
import Home from "./components/layout/Home/Home";
import Title from "./components/layout/Page-Title/PageTitle"

import {Routes, Route}from 'react-router-dom'
import Shop from "./components/layout/Shop/Shop";
function App() {
  return (
    <div className="d-flex flex-column m-height-100">
        <Header/>

        <Title title="About"/>

        {/* Config Routes pages */}

        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/" element={<Shop/>}></Route>
            <Route path="/" element={<Ab}></Route>
            <Route path="/"></Route>
            <Route path="/"></Route>
        </Routes>
    </div>
  );
}

export default App;
