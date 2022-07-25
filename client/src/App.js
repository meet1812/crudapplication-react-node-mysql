import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
    <ToastContainer/>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/addedit" element={<AddEdit/>}/> 
    <Roue  path="/update/:id" element={<AddEdit/>}/> 
    <Route  path="/view/:id" element={<Detail />}/> 
    
  </Routes>

    </div>
  );
}

export default App;