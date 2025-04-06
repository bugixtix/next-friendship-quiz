
'use client'
import React, { useState, useRef } from 'react'

function Intro() {
    const ref = useRef<any>(null)
    const [nameEntered, setNameEntered] = useState<string>("")
    const [submitted, setSubmitted] = useState<boolean>(false)
    const message:string = "Bitte schreibe zuerst deinen Namen hinauf"
    type TText = {
        _header:string,
        _description:string, 
        _inputPlaceholder:string,
        _button:string
    } 
    const text:TText = {
        _header:"Beste Freunde Quiz - Wie gut kennst du mich?",
        _description:"Schreibe deinen Namen auf",
        _inputPlaceholder:"Dein Name",
        _button:"Okei"
    }
    const DoSubmit = ():void =>{
        if(ref.current.value.length >= 2){
            localStorage.setItem('name', JSON.stringify(nameEntered))
            window.location.assign('/quiz')
        }
        else setSubmitted(true)

        console.log(submitted)
    }
    const DoChangeName=(e:any):void=>{
        setNameEntered(e.target.value)
    }
  return (
    <div className='w-[100%] flex flex-col items-center my-4 relative'>
        <div className='flex flex-col border-2 border-white p-8 rounded-lg gap-2 m-4 sm:m-0 sm:w-[60%]'>
            <h2 className='text-2xl'>{text._header}</h2>
            <p>{text._description}</p>
            <input type='text' ref={ref} onChange={DoChangeName} value={nameEntered} placeholder={text._inputPlaceholder} className='p-2 my-2 border-2 rounded-sm focus:outline-none focus:border-blue-400'/>
            <button  type="button" onClick={DoSubmit} className='bg-blue-400 cursor-pointer rounded-sm text-black text-center hover:bg-blue-500 transition-all duration-500 hover:scale-105 p-2 '> {text._button}</button>
            <p >{submitted && <span>{message}</span>}</p>
        </div>
    </div>
  )
}

export default Intro