import "../css/input.css"

import React, { useState } from "react";

const FormInput = (props) => {
    const [input, setInput] = useState();

    const inputHandler = (e) => {
        setInput(e.target.value);
    }
    
    return(
        <div className = "input">
            <label htmlFor = {props.id}>{props.label}</label>
            <input id = {props.id}  type = {props.type} onChange = {inputHandler}/>
        </div>
    );
}

export default FormInput;