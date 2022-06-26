import React from "react";
import Header from "./components/layout/Header/Header";
import Home from "./components/layout/Home/Home";


function App() {
  return (
    <div className="d-flex flex-column m-height-100">
        <Header/>

        <Title/>
        {/* <Home/> */}
    </div>
  );
}

export default App;
