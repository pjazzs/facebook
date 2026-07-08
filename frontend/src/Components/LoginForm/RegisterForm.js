import { Formik } from "formik"
import RegisterInput from "../../Inputs/RegisterInput"
import { useEffect, useState } from "react";
import { registerSchema } from "../../formValidation";
import DateOfbirth from "./DateOfbirth";
import GenderSelect from "./GenderSelect";
import { FadeLoader } from "react-spinners";
import axios from "axios"
import Cookies from "js-cookie";
import { useDispatch}  from "react-redux"
import {useNavigate} from "react-router-dom"

const RegisterForm = ({setVisible}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const getYear = ()=>{
    const currentYear = new Date().getFullYear();
    return Array.from(new Array(112), (val, index) => currentYear - index)
   }

   const getMonth = ()=>{
    return Array.from({length: 12}, (val, index)=> index + 1)
   }

   
   const years = getYear()
   const months = getMonth()
 
   const [days, setDay] = useState([])

   const calculateDay = (year, month)=>{
    const daysInMonth = new Date(year, month, 0).getDate()
    return Array.from({length: daysInMonth}, (_, index)=> index + 1)
   }
    
useEffect(()=>{
setDay(calculateDay(new Date().getFullYear(), new Date().getMonth() + 1))
}, [])

const [dateError, setDateError] = useState("")
const [genderError, setGenderError] = useState("")

const [error, setError] = useState("")
const [success, setSuccess] = useState("")
const [loading, setLoading] = useState(false)

const registerSubmit = async (payload)=>{
    try {
        setLoading(true)
        setSuccess("")
        setError("")

        const {data }= await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/register`,
         payload,
            {headers: {"Content-Type": "application/json"}}
                
        );
        setError("")
        setSuccess(data.message)
        const {message, ...rest} = data;

        setTimeout(()=>{
            dispatch({type: "LOGIN", payload: rest});
            Cookies.set("newUser", JSON.stringify(rest)) 
            navigate("/");
        }, 2000)
        
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
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
           <span onClick={()=> setVisible(false)} className="cancle_out"> &#x2717; </span>
            <span>Sign Up</span>
            <span>It's quick and easy.</span>

            <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                bYear: new Date().getFullYear(),
                bMonth: new Date().getMonth() + 1,
                bDay: new Date().getDate(),
                gender: ""
            }}
            validationSchema={registerSchema}
            onSubmit={(values)=>{
                //  console.log("current values ", values)
                // const dob = `${values.bYear}-${values.bMonth}-${values.bDay}`
               const payload = {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        password: values.password,
                        dob: `${values.bYear}-${values.bMonth}-${values.bDay}`,
                        gender: values.gender
                    }
                 const currentDay = new Date();
                  const pickedDate = new Date(values.bYear, values.bMonth - 1, values.bDay)

                  const age = currentDay.getFullYear() - pickedDate.getFullYear()
                  const monthDifference = currentDay.getMonth() - pickedDate.getMonth()
                  const dayDifference = currentDay.getDate() - pickedDate.getDate()

                  const adjustAge = monthDifference < 0 || (monthDifference === 0 && dayDifference < 0) ? age - 1 : age

                  if(adjustAge < 14){
                    setDateError("It looks like you've entered the wrong info. Please make sure that you use your real date of birth.")
                  } else if(adjustAge >= 70){
                     setDateError("It looks like you've entered the wrong info. Please make sure that you use your real date of birth.")
                  } else if(values.gender === "") {
                    setDateError("")
                    setGenderError("Please enter a gender. You can change who can see this later.")
                  } else{
                    setDateError("")     
                    setGenderError("")
                    registerSubmit(payload)
                  }

            }}
            
            >
                {({values, handleChange, setFieldValue, errors, handleSubmit, setFieldTouched})=>{
                   const handleFullValidation =(e)=>{
                    e.preventDefault()
                    Object.keys(values).forEach((field) => setFieldTouched(field, true, true))
                    handleSubmit(e)
                   }
                   return (

                   
                    <form className="register_form" onSubmit={handleFullValidation}>
                        <div className="reg_line">
                            <RegisterInput 
                            type="text"
                            name="first_name"
                            placeholder="first_name"
                             onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                            />    
                            <RegisterInput 
                            type="text"
                            name="last_name"
                            placeholder="last_name"
                             onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                            />    
                        </div>
                        <div className="reg_line">
                            <RegisterInput 
                            type="text"
                            name="email"
                            placeholder="Mobile number or email address"
                            onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                            />    
                          
                        </div>
                        <div className="reg_line">
                            <RegisterInput 
                            type="password"
                            name="password"
                            placeholder="New password"
                            onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                            />    
                          
                        </div>

                        <div className="reg_col">
                            <div className="reg_line_header">Date of birth &#9432;</div>
                           <DateOfbirth
                           values={values}
                           years={years}
                           months={months}
                           days={days}
                           setDay={setDay}
                           calculateDay={calculateDay}
                           setFieldValue={setFieldValue}
                           handleChange={handleChange}
                           dateError={dateError}
                           
                           />
                        </div>

                        <div className="reg_col">
                            <div className="reg_line_header">
                                Gender &#9432;

                            </div>
                            <GenderSelect
                            values={values}
                            handleChange={handleChange}
                            genderError={genderError}                                                        
                            />
                        </div>
                        <div className="reg_info">
                            By clicking Sign Up, you agree to our {""} <span>Terms, Date Policy &nbsp;</span> and {""}
                            <span>cookies Policy.</span> You may receice sms notification from us ans can opt out at any time.
                        </div>
                        <div className="reg_btn_wrapper">
                            <button className="blue_btn open_signup" type="submit">Sign Up</button>
                        </div>
                         <FadeLoader 
                            color= "#1876f2"
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        {error && <div className="error_text">{error}</div>}
                        {success && <div className="success_text">{success}</div>}
                    </form>
                   )
                }}

            </Formik>
        </div>
      </div>

    </div>
  )
}

export default RegisterForm
