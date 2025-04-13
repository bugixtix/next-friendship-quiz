
'use client'
import {useRouter, usePathname} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from "uuid";

function GenerateLink() {
    type TAnswerInfo = {
        question:string,
        questionID:number,
        answer:string,
        answerID:number
    }
    type TText = {
        header:string,
        todo:string[],
        header2:string,
        info2:string,
        button:{first:string, second:string},
    }
    const router = useRouter()
    const pathname = usePathname()
    const [copied, setCopied] = useState<boolean>(false)
    const [link, setLink] = useState<string>("Dein Link")
    const [answers, setAnswers] = useState<TAnswerInfo[]>([{question:"",questionID:0,answer:"",answerID:0}])
    const [name, setName] = useState<string>('')
    const text:TText = {
        header:"Dein Quiz ist fertig!🎉",
        todo:["Sende den Link an deine Freunde und ermutige sie, an deinem Quiz teilzunehmen.","Komm später wieder, um die Ergebnisse deiner Freunde zu sehen!"],
        header2:"Teile dein Quiz!",
        info2:"Dein Link",
        button:{first:"Link Kopieren", second:"Auf Whatsapp Teilen"}
    }

    const HandleLink =(answers:TAnswerInfo[]):void=>{
        const testID:string = uuidv4()
        const encoded = answers.map(a=>`${a.questionID}-${a.answerID}`)
        router.push(`/test/${testID}?data=${encoded}&name=${name}`)
    }

    const DoCopyToClipboard = ():void =>{
        navigator.clipboard.writeText(link)
        setCopied(true)
    }
    useEffect(()=>{
        // console.log(id)
        let lsName_:any = localStorage.getItem('name')
        let name_ :string = JSON.parse(lsName_)
        setName(name_)
        // 
        let lsAnswers:any = localStorage.getItem("answers") || [{question:"",questionID:0,answer:"",answerID:0}]
        lsAnswers = JSON.parse(lsAnswers)
        setAnswers(lsAnswers)
        
        const encodedData = lsAnswers.map(a=>`${a?.questionID}-${a?.answerID}`)
        const testID:string = uuidv4()
        const link_ = window.location.host + '/test/' + testID + '?data=' + encodedData + '&name=' + name_
        setLink(link_)
        console.log(link_)
        // console.log(lsAnswers)
    },[])

  return (
    <div className="flex flex-col border-2 border-white p-8 rounded-lg gap-2 m-4 sm:m-0 sm:w-[60%]">
        <div>
            <p className=" text-lg sm:text-xl py-2">{text.header}</p>
            <ul>
                {text.todo.map((item,index)=>(<li className="text-lg sm:text-xl my-1" key={index}>⏺️ {item}</li>))}
            </ul>

            <div className="my-4">
                <p className="text-lg sm:text-lg ">{text.header2}</p>
                <input name="first" id="input" type="text" className="bg-gray-800 focus:outline-none text-lg px-2" value={link} onChange={()=>{}}/>
                <button name="fourth" type="button" className="px-2 border-2 mx-2 cursor-pointer hover:border-gray-800 transition-all duration-300" onClick={DoCopyToClipboard}>{copied ? "Kopiert!" : "Link Kopieren"}</button>
            </div>

            <div className="flex flex-col items-start">
                <button name="second" type="button" >{text.button.second}</button>
                <button name="third" type="button" onClick={()=>HandleLink(answers)}>click me</button>
            </div>
        </div>
    </div>
  )
}

export default GenerateLink

