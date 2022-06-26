import React from "react";
import Header from "./components/layout/Header/Header";
import Home from "./components/layout/Home/Home";
import Title from "./components/layout/Page-Title/PageTitle"

function App() {
  return (
    <div className="d-flex flex-column m-height-100">
        <Header/>

        <Title title="About"/>
        {/* <Home/> */}
    </div>
  );
}

export default App;
