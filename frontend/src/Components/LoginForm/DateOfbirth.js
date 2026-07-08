import { useMediaQuery } from "react-responsive"

const DateOfbirth = (
   { values,
    handleChange,
    days,
    setFieldValue,
    months,
    setDay,
    calculateDay,
    years,
    dateError}
) => {
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
     style={{marginBottom: `${dateError && !View3 ? "70px" : "0px"}`}}     
     >
                                <select 
                                name="bDay"
                                value={values.bDay}
                                 onChange={(e) => {
                                    handleChange(e);
                                    console.log("current value:", {
                                    ...values,
                                    [e.target.name]: e.target.value
                                    });
                                 }}

                                >
                                    <option value= "">Day</option>
                                    
                                        {days?.map((day)=> (
                                            <option key={day} value={day}> {day}</option>
                                        ))}
                                    
                                </select>
                                <select 
                                    name="bMonth"
                                    value={values.bMonth}
                                     onChange={(e) => {
                                        const newMonth = Number(e.target.value)
                                        setFieldValue("bMonth", e.target.value)
                                        setDay(calculateDay(years, newMonth))
                                        }}
                                >
                                    <option value="">Month</option>
                                    
                                        {months.map((month)=>(
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                    
                                </select>

                                <select
                                 name="bYear"
                                 value={values.bYear}
                                  onChange={(e) => {
                                    const newYear = parseInt(e.target.value, 10)
                                    setFieldValue("bYear", newYear)
                                    setDay(calculateDay(newYear, values.bMonth))
                                }}
                                 >
                                    <option value="">Year</option>
                                
                                        {years.map((year)=>(
                                        <option key={year} value={year}>
                                           {year} 
                                        </option>

                                    ))}
                                    
                                    
                                </select>
                                {dateError && (<div className={!View3 ? "input_error_msg" : "input_error_msg input_error_sellect_large"}>
                                    <div className={!View3 ? 'error_arrow_bottom' : "error-arrow_left"}></div>
                                    {dateError}</div>)}
                            </div>
  )
}

export default DateOfbirth
