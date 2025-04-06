
'use client'
import {useRouter} from 'next/navigation'
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
    const [answers, setAnswers] = useState<TAnswerInfo[]>([{question:"",questionID:0,answer:"",answerID:0}])
    const text:TText = {
        header:"Dein Quiz ist fertig!",
        todo:["Link kopieren","Sende den Link an deine Freunde und ermutige sie, an deinem Quiz teilzunehmen.","Teile dein Quiz über eines der folgenden sozialen Netzwerke.","Komm später wieder, um die Ergebnisse deiner Freunde zu sehen!"],
        header2:"Teile dein Quiz",
        info2:"Dein Link",
        button:{first:"Link Kopieren", second:"Auf Whatsapp Teilen"}
    }

    
    const HandleLink =(answers:TAnswerInfo[]):void=>{
        const testID:string = uuidv4()
        const encoded = answers.map(a=>`${a.questionID}-${a.answerID}`)
        router.push(`/test/${testID}?data=${encoded}`)
    }
    useEffect(()=>{
        // console.log(id)
        let lsAnswers:any = localStorage.getItem("answers") || [{question:"",questionID:0,answer:"",answerID:0}]
        lsAnswers = JSON.parse(lsAnswers)
        setAnswers(lsAnswers)
        console.log(lsAnswers)
    },[])

  return (
    <div className="flex flex-col border-2 border-white p-8 rounded-lg gap-2 m-4 sm:m-0 sm:w-[60%]">
        <div>
            <p>{text.header}</p>
            <ol>
                {text.todo.map((item,index)=>(<li key={index}>{item}</li>))}
            </ol>
            <p>{text.header2}</p>
            <p>{text.info2}</p>
            <label>
                <input name="first" id="input" type="text"/>
            </label>
            <button name="first" type="button" >{text.button.first}</button>
            <button name="second" type="button" >{text.button.second}</button>
            <button name="third" type="button" onClick={()=>HandleLink(answers)}>click me</button>
        </div>
    </div>
  )
}

export default GenerateLink

