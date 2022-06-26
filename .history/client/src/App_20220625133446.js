import React from "react";
import Header from "./components/layout/Header/Header";
import Home from "./components/layout/Home/Home";
import Title from "./components/layout/Page-Title/PageTitle"
import {Routes, Route}from 'react-router-dom'
function App() {
  return (
    <div className="d-flex flex-column m-height-100">
        <Header/>

        <Title title="About"/>
        {/* <Home/> */}

        {/* Config Routes pages */}

        <Routes>
            <Route></Route>
            <Route></Route>
            <Route></Route>
            <Route></Route>
            <Route></Route>
        </Routes>
    </div>
  );
}

export default App;
