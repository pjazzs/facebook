 
import "./style.css";
import { ErrorMessage, useField } from "formik";
import {useMediaQuery} from "react-responsive";

const RegisterInput = ({ placeholder, type = "text",  bottom, ...props }) => {
  const [field, meta] = useField(props);
  const View1 = useMediaQuery({
    query: "(min-width: 539px)"
   })
  // const View2 = useMediaQuery({
  //   query: "(min-width: 768px)"
  //  })
  const View3 = useMediaQuery({
    query: "(min-width: 1170px)"
   })

   const test1 = View3 && field.name === "first_name"
   const test2 = View3 && field.name === "last_name"

  return (
    <div className="login_input register_input_wrap">
      <input
      className={meta.touched && meta.error ? "input_error" : ""}
        style={{width: `${View1 && (field.name === "first_name" || field.name === "last_name") ? "100%" : View1 && (field.name === "email" || field.name === "password") ? '370px' : "300px" }`}}
        type={type}          
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error &&(
       <div className={View3 ? "input_error_msg input_error_desktop" : "input_error_msg"} 
       style={{
        transform: "translateX(4px)",
        left: `${test1 ? "-107%" : test2 ? "104%" : ""}`}}
       >
        {meta.touched && meta.error && <ErrorMessage name={field.name}/>}
        {meta.touched && meta.error && <div className={ View3 && field.name !== "last_name" ? "error_arrow_left" 
        : View3 && field.name === "last_name" ? "error_arrow_right"
        : !View3 &&"error_arrow_bottom"}></div>}
      </div>
      )}
    </div>
  );
};

export default RegisterInput;
