import React from 'react'
import ReactDOM from "react-dom"
import {Component} from "react"

const Input = ({type, placeHolder, id, style}) => {
  console.log(placeHolder);
  return (
    <input 
      type={type} 
      placeholder={placeHolder} 
      id={id} 
      style={style}
    />
  )
}

const inputOf = (BaseComp, type="text") => {
  const types = [
    {
      name: "button",
      bgColor: "black",
      placeholder: "Button"
    },
    {
      name: "text",
      bgColor: "f44336",
      placeholder: "Text"
    },
    {
      name: "textarea",
      bgColor: "4CAF50",
      placeholder: "Textarea"
    },
    {
      name: "checkbox",
      bgColor: "4CAF50",
      placeholder: "Checkbox"
    },
    {
      name: "file",
      bgColor: "4CAF50",
      placeholder: "File"
    },
    {
      name: "hidden",
      bgColor: "4CAF50",
      placeholder: "Hidden"
    },
    {
      name: "image",
      bgColor: "4CAF50",
      placeholder: "Image"
    },
    {
      name: "radio",
      bgColor: "4CAF50",
      placeholder: "Radio"
    },
    {
      name: "reset",
      bgColor: "4CAF50",
      placeholder: "Reset"
    },
    {
      name: "password",
      bgColor: "4CAF50",
      placeholder: "Password"
    },
    {
      name: "submit",
      bgColor: "61dbfb"
    },
  ]
  const {bgColor: backgroundColor,placeholder} = types.find((ele) => ele.name === type)
  const inputStyles = {
    backgroundColor: backgroundColor||"white",
    margin: "0",
    padding: ".5rem",
    color: "red",
  }
  return (props) => {
    return (
    <BaseComp 
      {...props} 
      style={inputStyles} 
      type={type} 
      placeHolder={placeholder}
    />);
  }
}

const ButtonInput = inputOf(Input, "button");
const CheckboxInput = inputOf(Input, "checkbox");
const TextInput = inputOf(Input, "text");
const TextareaInput = inputOf(Input, "textarea")
const SubmitInput = inputOf(Input, "submit");
const FileInput = inputOf(Input, "file");
const HiddenInput = inputOf(Input, "hidden");
const PasswordInput = inputOf(Input, "password");
const RadioInput = inputOf(Input, "radio");
const ResetInput = inputOf(Input, "reset");

class App extends Component {
  render() {
    return (
      <div className='App'>
        <TextInput 
        />
        <TextareaInput />
        <SubmitInput 
        />
        <ButtonInput />
        <CheckboxInput />
        <TextInput />
        <FileInput />
        <HiddenInput />
        <PasswordInput />
        <RadioInput />
        <ResetInput />
      </div>
    )
  }
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)