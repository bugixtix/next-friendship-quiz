'use client'
import React, {useEffect, useState} from 'react'
import Option from '@/app/componente/option'

import Data from '@/public/data.json'

type TData = {
  QID:number,
  AID:number
}
type TFinalData = {
  id:number,
  question:string,
  correctAnswer:string,
  correctAnswerId:number,
  answers:string[]
}
type TText = {
  buttonText:string,
}
function Test({name="Gast",data=[{QID:-1,AID:0}]}:{name:string, data?:TData[]}) {
  const [data_, setData_] = useState<TFinalData[]>([{id:0, question:'',correctAnswer:'',correctAnswerId:0,answers:['','','','']}])
  const [index, setIndex] = useState<number>(0)
  const [finish, setFinish] = useState<boolean>(false)
  const [correctAnswered, setCorrectAnswered] = useState<number>(0)
    useEffect(()=>{
        if(data[0].QID !== 0){
          const idMap = new Map(data.map(item=>[item.QID, item.AID]))
          const result:any = Data
          .filter(item=>idMap.has(item.id))
          .map((item)=>{
            const correctIndex = idMap.get(item.id)
            return{
              id:item.id,
              question:item.text,
              correctAnswer:item.options[correctIndex!],
              answers:item.options,
              correctAnswerId:correctIndex
            }
          })
          setData_(result)
        }
      },[JSON.stringify(data)])
      
      const IncreaseQuestionNumber = ():void =>{
        if(index !== data_.length-1){
          setIndex(p=>p + 1)
        }
        else{
          console.log('limit!')
          setFinish(true)
        }
      }

      const Text:TText = {
        buttonText:"index ++"
      }
      const HandleAnswerClick = (_answer:string, _index:number):void =>{
        if(_index === data_[index].correctAnswerId){
          console.log('Richtige Antwort')
          setCorrectAnswered(p=>p+1)
        }else{console.log('Falsche Antwort')}
        IncreaseQuestionNumber();
      }
    
  return (
    <div>

        <div className='flex flex-col border-2 border-white p-8 rounded-lg gap-2 m-4 sm:m-0 sm:w-[60%]'>

            <p>{name}</p>
            <p>hier</p>
            <button className="" type="button" onClick={IncreaseQuestionNumber}>{Text.buttonText}</button>
            <h2>{data_[index].question}</h2>
            <h2>{data_[index].correctAnswer}</h2>
            <div className="grid grid-cols-2 gap-4">
                {data_[index].answers.map((_answer, _index)=>(<div key={_index} onClick={()=>{HandleAnswerClick(_answer, _index)}}><Option text={_answer} /></div>))}
            </div>

            {finish && <h2>Du hast {correctAnswered} Fragen richtig beantwortet! </h2>}
            
        </div>
    </div>
  )
}

export default Test