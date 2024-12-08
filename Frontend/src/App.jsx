import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CaptainLogin from './Pages/CaptainLogin';
import CaptainSignUp from './Pages/CaptainSignUp';
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import UserSignup from './Pages/UserSignup';
const App = () => {
  
  return (
    <div className='bg-red-50'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<UserLogin/>}/>
        <Route path='/SignUp' element={<UserSignup/>}/>
        <Route path='/Captain-Login' element={<CaptainLogin/>}/>
        <Route path='/Captain-Signup' element={<CaptainSignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
