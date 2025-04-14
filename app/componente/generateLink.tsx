
'use client'
import {useRouter, usePathname} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import { FaWhatsapp as Whatsapp} from "react-icons/fa";
import { FaSnapchat as Snapchat} from "react-icons/fa";

// TODO: 15.04.2025 - Die daten aus dem localStorage in Link (uuid ist wichtig) konvertieren und es in den localStorage einspeichern, somit wenn die Seite neugeladen ist, wird der Link aus dem localStorage benutzt und wird nicht neu generieret (da die Daten sich ja nicht verändert haben)  
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
        button:{first:string, second:string, third:string},
    }
    const router = useRouter()
    const pathname = usePathname()
    const [copied, setCopied] = useState<boolean>(false)
    const [link, setLink] = useState<string>("")
    const [answers, setAnswers] = useState<TAnswerInfo[]>([{question:"",questionID:0,answer:"",answerID:0}])
    const [name, setName] = useState<string>('')
    const text:TText = {
        header:"Dein Quiz ist fertig!🎉",
        todo:["Sende den Link an deine Freunde und ermutige sie, an deinem Quiz teilzunehmen.","Komm später wieder, um die Ergebnisse deiner Freunde zu sehen!"],
        header2:"Teile dein Quiz!",
        info2:"Dein Link",
        button:{first:"Link Kopieren", second:"Auf Whatsapp teilen", third:"Auf Snapchat teilen"}
    }

    const HandleLink =(answers:TAnswerInfo[]):void=>{
        const testID:string = uuidv4()
        const encoded = answers.map(a=>`${a.questionID}-${a.answerID}`)
        router.push(`/test/${testID}?data=${encoded}&name=${name}`)
    }

    const HandleSocialMedia = (e:React.MouseEvent<HTMLButtonElement>):void=>{
        const x:any = e.target
        const y:string =x.name
        
        const message:string = "Schaue dir das mal an: " + link
        
        const whatsappURL:string = `https://wa.me/?text=${message}`
        const snapchatURL:string = `https://www.snapchat.com/scan?attachmentUrl=${message}`

        if(y==="whatsapp") window.open(whatsappURL, '_blank') 
        else if(y==="snapchat") window.open(snapchatURL, '_blank');
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
        
        const encodedData = lsAnswers.map((a:any)=>`${a?.questionID}-${a?.answerID}`)
        const testID:string = uuidv4()
        const link_ = window.location.host + '/test/' + testID + '?data=' + encodedData + '&name=' + name_
        setLink(link_)
        console.log(link_)
        // console.log(lsAnswers)

        return()=>localStorage.removeItem('answers')
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
                <input name="first" id="input" type="text" className="bg-gray-800 focus:outline-none text-lg px-2 py-1" value={link} onChange={()=>{}}/>
                <button name="fourth" type="button" className={`px-2 border-2 mx-2 py-1 cursor-pointer transition-all duration-300 ${copied?'bg-gray-800 border-gray-800':'hover:border-blue-400'}`} onClick={DoCopyToClipboard}>{copied ? "Kopiert!" : "Link Kopieren"}</button>
            </div>

            <div className="flex flex-row flex-wrap gap-2 items-start">
                <button className="flex flex-row items-center gap-1 bg-green-800 px-2 py-1 cursor-pointer border-2 border-green-800 transition-all duration-300 hover:border-gray-400 my-2" name="whatsapp" type="button" onClick={HandleSocialMedia}>{text.button.second} <Whatsapp/></button>
                <button className="flex flex-row  items-center  gap-1 bg-yellow-400 px-2 py-1 cursor-pointer border-2 text-black border-yellow-400 transition-all duration-300 hover:border-orange-500 my-2" name="snapchat" type="button" onClick={HandleSocialMedia}>{text.button.third} <Snapchat/></button>
                <button className="bg-yellow-400 px-2 py-1 cursor-pointer border-2 text-black border-yellow-400 transition-all duration-300 hover:border-orange-500 my-2" name="third" type="button" onClick={()=>HandleLink(answers)}>Test</button>
            </div>
        </div>
    </div>
  )
}

export default GenerateLink

