import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./Context/userContext";

//Componentes
import NavBar from './Pages/navbar';
import Home from './Pages/home';
import CreateAccount from "./Pages/createAccount";
import LogIn from "./Pages/login";
import Deposit from "./Pages/deposit";
import Withdraw from "./Pages/withdraw";
import Balance from "./Pages/balance";
import AllData from "./Pages/alldata";


function App() {
  return (
    <>
      <NavBar/>
      <UserProvider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <div className="container" style={{padding: "20px"}} id ='contenedor_Componentes'>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount/>} />
            <Route path="/login/" element={<LogIn/>} />
            <Route path="/deposit/" element={<Deposit/>} />
            <Route path="/withdraw/" element={<Withdraw/>} />
            <Route path="/balance/" element={<Balance/>} />
            <Route path="/alldata/" element={<AllData/>} />
          </Routes>
        </div>
      </UserProvider>      
    </>
  );
}
export default App;
