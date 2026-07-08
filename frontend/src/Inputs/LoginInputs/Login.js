
import "./style.css";
import { ErrorMessage, useField } from "formik";
import {useMediaQuery} from "react-responsive";

const LoginInput = ({ placeholder, type = "text",  bottom, ...props }) => {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 768px)"
   })

  return (
    <div className="login_input">
     {meta.touched && meta.error && !bottom &&(
       <div className={desktopView ? "input_error_msg input_error_desktop" : "input_error_msg"} style={{ transform: "translateY(4px)" }}>
        {meta.touched && meta.error && <ErrorMessage name={field.name}/>}
        {meta.touched && meta.error && <div className={ desktopView ? "error_arrow_left" :"error_arrow_top"}></div>}
      </div>
      )}
      <input
      className={meta.touched && meta.error ? "input_error" : ""}
        type={type}          
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom &&(
       <div className={desktopView ? "input_error_msg input_error_desktop" : "input_error_msg"} >
        {meta.touched && meta.error && <ErrorMessage name={field.name}/>}
        {meta.touched && meta.error && <div className={ desktopView ? "error_arrow_left" :"error_arrow_bottom"}></div>}
      </div>
      )}
    </div>
  );
};

export default LoginInput;
