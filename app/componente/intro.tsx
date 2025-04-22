
'use client'
import React, { useState, useRef } from 'react'
type TText = {
    _header:string,
    _description:string, 
    _inputPlaceholder:string,
    _button:string,
    _message:string
} 

function Intro({_text={
    _header: "",
    _description: '',
    _inputPlaceholder: '',
    _button: '',
    _message:''
}, _href, _lsKey, callback}:{_text:TText,_href:string, _lsKey:string,callback?:()=>void}) {
    const ref = useRef<any>(null)
    const [nameEntered, setNameEntered] = useState<string>("")
    const [submitted, setSubmitted] = useState<boolean>(false)
    const message:string = "Bitte schreibe zuerst deinen Namen hinauf"
    const text:TText = {
        _header:"Beste Freunde Quiz - Wie gut kennst du mich?",
        _description:"Schreibe deinen Namen auf",
        _inputPlaceholder:"Dein Name",
        _button:"Okei",
        _message:""
    }
    const DoSubmit = ():void =>{
        if(ref.current.value.length >= 2){
            localStorage.setItem(_lsKey, JSON.stringify(nameEntered))
            if(_href){
                window.location.assign(_href)
            }
        }
        else setSubmitted(true)

        // I'm seeing this method for the first time in my life!
        callback?.()
    }
    const DoChangeName=(e:any):void=>{
        setNameEntered(e.target.value)
    }
  return (
    <div className='w-[100%] flex flex-col items-center my-4 relative'>
        <div className='flex flex-col border-2 border-white p-2 sm:p-8 rounded-lg gap-2 sm:m-4 sm:w-[100%]'>
            { _text._header!== '' && <h2 className='text-lg sm:text-2xl'>{_text._header}</h2>}
            { _text._description!=='' && <p>{_text._description}</p>}
            <input type='text' ref={ref} onChange={DoChangeName} value={nameEntered} placeholder={_text._inputPlaceholder} className='p-2 my-2 border-2 rounded-sm focus:outline-none focus:border-blue-400'/>
            <button  type="button" onClick={DoSubmit} className='bg-blue-400 cursor-pointer rounded-sm text-black text-center hover:bg-blue-600 transition-all duration-500 p-2 '> {_text._button}</button>
            <p >{submitted && <span>{_text._message}</span>}</p>
        </div>
    </div>
  )
}

export default Intro