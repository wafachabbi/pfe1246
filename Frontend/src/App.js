import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Checkout from './Components/Checkout/Checkout';
import Contact from './Components/Contact/Contact';
import ForgotPasswordForm from './Components/ForgotPasswordForm/ForgotPasswordForm';
import CartItems from './Components/CartItems/CartItems';
import ResetPassword from './Components/ResetPassword/ResetPassword';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product' element={<Product/>} >
        <Route path=':productId' element={<Product/>} />
        </Route>
        <Route path='/cartitems' element={<CartItems/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/forgotpasswordform' element={<ForgotPasswordForm/>} />
        <Route path='/resetpassword' element={<ResetPassword/>} />
        <Route path='/login' element={<LoginSignup/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
