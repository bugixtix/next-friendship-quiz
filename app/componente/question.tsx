"use client"

import Image from 'next/image'
import React,{useState, useEffect} from 'react'
import Data from '@/public/data.json'
import Option from '@/app/componente/option'
function Question() { 
  type TAnswerInfo = {
    question:string,
    questionID:number,
    answer:string,
    answerID:number
  }
  type dataItem = {
    question:string,
    answers:string[],
    id:number,
    images?:string[]
  }

  const [nameEntered, setNameEntered] = useState<string>("")
  const [skippedIndex, setSkippedIndex] = useState<number>(20)
  const [isDone, setIsDone] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [QUESTIONinfo, setQUESTIONinfo] = useState<dataItem>({question:"", answers:[""], id:0, images:["/images/tea.jpg","/images/tea.jpg","/images/tea.jpg","/images/tea.jpg"]})
  const [USERanswer, setUSERanswer] = useState<TAnswerInfo[]>([])
  const buttonTxt:string = "Diese Frage überspringen"
  const header:string = ""
  
  useEffect(() => {
    setQUESTIONinfo({question:Data[questionNumber].text, answers:Data[questionNumber].options, id:Data[questionNumber].id, images:Data[questionNumber].images})
  }, [questionNumber])

  function IncreaseQuestionNumber():void{
      setQuestionNumber((p)=>(p=p+1))
      setSkippedIndex((p)=>(p=p-1))
  }
  function HandleAnswerClick(answer:string,answerID:number):void{
    
    const newAnswer:TAnswerInfo={question:QUESTIONinfo.question, questionID:QUESTIONinfo.id, answer:answer, answerID:answerID}
    setUSERanswer((p)=>([...p,newAnswer]))
    setQuestionNumber((p)=>(p=p+1))
  }
  useEffect(()=>{
    if(USERanswer.length === 8){
      setIsDone(true)
      localStorage.setItem("answers", JSON.stringify(USERanswer))
      window.location.assign('/share')
    }
  },[USERanswer])
  useEffect(()=>{
    let name:string = localStorage.getItem("name") || "Guest"
    name = JSON.parse(name)
    setNameEntered(name)
  },[])
  return (
    <div className='flex flex-col border-2 border-white sm:p-8 py-2 px-2 rounded-lg gap-2 m-4 sm:m-0 w-[100%]'>

      {!isDone ?
      <>
        <p className="text-lg">Hallo {nameEntered}, bereit um deine Freund zu testen? Los geht's!</p>
        <h2 className="text-lg py-2">{USERanswer.length+1 + ". " + QUESTIONinfo.question}</h2>
        <h2></h2>
        <div className="flex flex-wrap gap-2 items-stretch justify-evenly">
          {QUESTIONinfo.answers.map((_answer, _index)=>(<div className="flex flex-col items-stretch" key={_index} onClick={()=>{HandleAnswerClick(_answer, _index)}}><Option text={_answer} image={QUESTIONinfo.images[_index]} /></div>))}
        </div>
        <button title={skippedIndex===0 ? 'Du hast keine ausreichende Fragen, die du überspringen kannst.':''} disabled={skippedIndex===0} className={`${skippedIndex===0 ? 'bg-gray-600 cursor-not-allowed ':'bg-transparent hover:border-blue-500 cursor-pointer'} border-2 p-2 mt-4 border-white  transition duration-300 rounded-xs`} type="button" onClick={IncreaseQuestionNumber}>{buttonTxt}</button>
      </>
      :
      <>
        <p>...</p>
      </>
      }
    </div>
  )
}


export default Question