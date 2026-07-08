import { useState } from 'react';
import "../App.css";
import LoginForm from '../Components/LoginForm/LoginForm';
import Footer from '../Components/Footer/Footer';
import RegisterForm from '../Components/LoginForm/RegisterForm';



const Login = () => {

  const [visible, setVisible] = useState(false)
  return (
    <div className="login">
      <div className="login_wrapper"> 
        <LoginForm setVisible={setVisible}/>        

        {visible && <RegisterForm setVisible={setVisible}/>}
        <Footer />
      </div>
    </div>
  );
};

export default Login;