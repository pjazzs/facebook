import { useMediaQuery } from "react-responsive";
const GenderSelect = ({
    values,
    handleChange,
    genderError
}) => {
        const View1 = useMediaQuery({
    query: "(min-width: 539px)"
   })
  const View2 = useMediaQuery({
    query: "(min-width: 768px)"
   })
  const View3 = useMediaQuery({
    query: "(min-width: 1170px)"
   })
  return (
   <div className="reg_grid"
    style={{marginBottom: `${genderError && !View3 ? "70px" : "0px"}`}}   
   >
                                <label htmlFor="male">
                                    Male
                                    <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                                    />
                                </label>
                                <label htmlFor="Female">
                                    Female
                                    <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                     onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                                    />
                                </label>
                                <label htmlFor="custom">
                                    Custom
                                    <input
                                    type="radio"
                                    name="gender"
                                    id="custom"
                                    value="custom"
                                    onChange={(e) => {
                        handleChange(e);
                        console.log("current value:", {
                          ...values,
                          [e.target.name]: e.target.value
                        });
                      }}
                                    />
                                </label>
                                {genderError && (<div className={!View3 ? "input_error_msg" : "input_error_msg input_error_sellect_large"}>
                                    <div className={!View3 ? 'error_arrow_bottom' : "error-arrow_left"}></div>
                                    {genderError}</div>) }
                            </div>
  )
}

export default GenderSelect
