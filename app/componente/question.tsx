"use client"

import Image from 'next/image'
import React,{useState, useEffect} from 'react'
import Data from '@/public/data.json'
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
    id:number
  }

  const [nameEntered, setNameEntered] = useState<string>("")
  const [isDone, setIsDone] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [QUESTIONinfo, setQUESTIONinfo] = useState<dataItem>({question:"", answers:[""], id:0})
  const [USERanswer, setUSERanswer] = useState<TAnswerInfo[]>([])
  const buttonTxt:string = "Diese Frage überspringen"
  const header:string = ""
  
  useEffect(() => {
    setQUESTIONinfo({question:Data[questionNumber].text, answers:Data[questionNumber].options, id:Data[questionNumber].id})
  }, [questionNumber])

  function IncreaseQuestionNumber():void{
    setQuestionNumber((p)=>(p=p+1))
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
    <div className='flex flex-col border-2 border-white p-8 rounded-lg gap-2 m-4 sm:m-0 sm:w-[60%]'>

      {!isDone ?
      <>
        <p>{nameEntered}</p>
        <button className="" type="button" onClick={IncreaseQuestionNumber}>{buttonTxt}</button>
        <h2>{QUESTIONinfo.question}</h2>
        <h2>{USERanswer.length+1}</h2>
        <div className="grid grid-cols-2 gap-4">
          {QUESTIONinfo.answers.map((_answer, _index)=>(<div key={_index} onClick={()=>{HandleAnswerClick(_answer, _index)}}><Option text={_answer} /></div>))}
        </div>
      </>
      :
      <>
        <p>...</p>
      </>
      }
    </div>
  )
}

function Option({text}:{text:string}):any{
    return(
      <div>
            {/* <Image src={null} alt=""/> */}
            <p>{text}</p>
      </div>
    )
}

export default Question