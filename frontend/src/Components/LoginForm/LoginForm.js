import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import  LoginInput  from "../../Inputs/LoginInputs/Login";
import { basicSchema } from "../../formValidation";
import { FadeLoader } from "react-spinners";
import axios from "axios"
import Cookies from "js-cookie";
import { useDispatch}  from "react-redux"
import {useNavigate} from "react-router-dom"
import { useState } from "react";



const LoginForm = ({setVisible}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const loginSubmit = async(payload)=>{
          try {
        setLoading(true)
        setError("")

        const {data }= await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
         payload,
            {headers: {"Content-Type": "application/json"}}
                
        );
        setError("")
            dispatch({type: "LOGIN", payload: data});
            Cookies.set("newUser", JSON.stringify(data)) 
            navigate("/");
       
    } catch (error) {
        if(error.response){
            setError(error.response.data.message || "something went wrong!")
        } else if(error.request){
            setError("No response from the server...")
        } else{
            setError("An unexpected error occured")
        } 
    }finally{
            setLoading(false)
        }
}
    
  return (
   <div className="login_wrap">
          
          <div className="login_1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              style={{
                width: "100px",
                display: "block",
              }}
            />
            <span>
              Facebook helps you connect and share with people in your life.
            </span>
          </div>

          <div className="login_2">
            <div className="login_2_wrap">
              
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema= {basicSchema}
                onSubmit={(values) => {
                  loginSubmit(values)
                }}
              >
                {({ values, handleChange }) => (
                  <Form>

                    <LoginInput 
                      type="text"
                      name="email"
                      placeholder="Enter email or phone number" 
                      onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                    />
                    

                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Enter password" 
                      onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                      bottom
                    />

                    <button type="submit" className="blue_btn">
                      Log In
                    </button>

                  </Form>
                )}
              </Formik>

              <Link to="/forgot" className="forgot_password">
                Forgotten password
              </Link>
              <FadeLoader 
                            color= "#1876f2"
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />

              {error && <div className="error_text">{error}</div>}

              <div className="sign_splitter"></div>

              <button className="blue_btn open_signUp" onClick={()=> setVisible(true)}>
                Create Account
              </button>
            </div>

            <Link to="/" className="sign_extra">
              <b>Create Page</b> for a celebrity, brand or business.
            </Link>

          </div>
        </div>
  )
}

export default LoginForm
