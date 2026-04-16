import {Routes, Route} from "react-router-dom";
import './App.css'
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Register from './pages/register';
import ProtectedRoute from '../route/protectedRoute';
import PrivateRoute from '../route/privateRoute';
import MainLayout from '../components/Main-Layout';
import Transaction from './pages/transaction';
import Product from './pages/product';
import Account from './pages/account';


function App() {

  return (
    <>
      <Routes>
       <Route element={<MainLayout/>}>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/account_transaction/:id" element={<PrivateRoute><Transaction/></PrivateRoute>}/>
          <Route path="/product" element={<PrivateRoute><Product/></PrivateRoute>}/>
          <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>}/>
        </Route>
        <Route path="/" element={<ProtectedRoute><Login/></ProtectedRoute>}/>
        <Route path="/register" element={<ProtectedRoute><Register/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App;
