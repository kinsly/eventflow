import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export default function TextAreaInput({className, ...props}:TextareaHTMLAttributes<HTMLTextAreaElement>)
{
  return(
    <textarea
      {...props}
      className={
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
        className
  }
    >

    </textarea>
  )
}