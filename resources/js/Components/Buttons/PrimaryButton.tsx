import { ButtonHTMLAttributes } from 'react';
import { FallingLines } from 'react-loader-spinner'

export default function PrimaryButton(
        { className = '', disabled, children, processing = false, ...props}: 
        ButtonHTMLAttributes<HTMLButtonElement> & {processing?:boolean}) {

    const loader = <FallingLines
                        color="white"
                        width="30"
                        height='30'
                        visible={true}

                    />
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2  bg-blue-600 border border-transparent rounded-md text-l text-white  tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
           {processing? <> Loadingi{loader}</>: children}
        </button>
    );
}
