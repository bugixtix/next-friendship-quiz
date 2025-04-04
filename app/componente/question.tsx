"use client"

import Image from 'next/image'
import React,{useState, useEffect} from 'react'
import Data from '@/public/data.json'
function Question() { 
  const [questionNumber, setQuestionNumber] = useState(0)
  const [QUESTIONinfo, setQUESTIONinfo] = useState({question:"", answers:[""], id:0})
  const buttonTxt:string = "Diese Frage überspringen"
  const header:string = ""
  // let QUESTIONinfo:{ question?:string, answers?:string[], id?:number}={question:"", answers:[],id:0}

  useEffect(() => {
    setQUESTIONinfo({question:Data[questionNumber].text, answers:Data[questionNumber].options, id:Data[questionNumber].id})
  }, [questionNumber])

  function IncreaseQuestionNumber():void{
    setQuestionNumber((p)=>(p=p+1))
  }
  
  return (
    <div className='sm:w-[80%] flex flex-col items-center justify-center border-2 border-white'>
        <button className="" type="button" onClick={IncreaseQuestionNumber}>{buttonTxt}</button>
        <h2>{QUESTIONinfo.question}</h2>
        <div className="grid grid-cols-2 gap-4">
          {QUESTIONinfo.answers.map((_answer, _index)=>(<Option key={_index} text={_answer} />))}
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