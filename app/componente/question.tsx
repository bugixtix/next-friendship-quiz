"use client"

import Image from 'next/image'
import React,{useState, useEffect} from 'react'
import Data from '@/public/data.json'
function Question() { 
  type item = {
    question:string,
    id:number,
    answer:string
  }
  type dataItem = {
    question:string,
    answers:string[],
    id:number
  }
  const [isDone, setIsDone] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [QUESTIONinfo, setQUESTIONinfo] = useState<dataItem>({question:"", answers:[""], id:0})
  const [USERanswer, setUSERanswer] = useState<item[]>([])
  const buttonTxt:string = "Diese Frage überspringen"
  const header:string = ""
  
  useEffect(() => {
    setQUESTIONinfo({question:Data[questionNumber].text, answers:Data[questionNumber].options, id:Data[questionNumber].id})
  }, [questionNumber])

  function IncreaseQuestionNumber():void{
    setQuestionNumber((p)=>(p=p+1))
  }
  function HandleAnswerClick(param:string):void{
    
    const newItem:item={question:QUESTIONinfo.question, id:QUESTIONinfo.id, answer:param}
    setUSERanswer((p)=>([...p,newItem]))
    setQuestionNumber((p)=>(p=p+1))
  }
  useEffect(()=>{
    if(USERanswer.length === 9){
      window.location.assign('/share')
    }
  },[USERanswer])
  return (
    <div className='sm:w-[80%] flex flex-col items-center justify-center border-2 border-white'>
        <button className="" type="button" onClick={IncreaseQuestionNumber}>{buttonTxt}</button>
        <h2>{QUESTIONinfo.question}</h2>
        <h2>{USERanswer.length+1}</h2>
        <div className="grid grid-cols-2 gap-4">
          {QUESTIONinfo.answers.map((_answer, _index)=>(<div key={_index} onClick={()=>{HandleAnswerClick(_answer)}}><Option text={_answer} /></div>))}
        </div>
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