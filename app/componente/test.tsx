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
function Test({name="Gast",data=[{QID:-1,AID:0}], friendName}:{name:string, data?:TData[], friendName?:string|boolean}) {
  const [data_, setData_] = useState<TFinalData[]>([{id:0, question:'',correctAnswer:'',correctAnswerId:0,answers:['','','','']}])
  const [index, setIndex] = useState<number>(0)
  const [finish, setFinish] = useState<boolean>(false)
  const [mount, setMount] = useState<boolean>(false)
  const [correctAnswered, setCorrectAnswered] = useState<number>(0)
    useEffect(()=>{
        if(data[0].QID !== 0){
          const idMap = new Map(data.map(item=>[item.QID, item.AID]))
          const result:any = Data
          .filter(item=>idMap.has(item.id))
          .map((item)=>{
            const correctIndex = idMap.get(item.id)
            let text_ = item.text2
            text_ = text_.replace(/\.{4}/g, name+"'s")
            text_ = text_.replace(/\_{3}/g, name)
            return{
              id:item.id,
              question:text_,
              correctAnswer:item.options[correctIndex!],
              answers:item.options,
              correctAnswerId:correctIndex
            }
          })
          setData_(result)
        }
        setMount(true)
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

      const TestComponente = ()=>{
        return(
          <div>
            {!friendName && <p className="text-lg">Hallo {name}!</p>}
            {friendName && <p className="text-lg">Hallo {friendName}, wie gut kennst du {name}?</p>}
            {/* <button className="" type="button" onClick={IncreaseQuestionNumber}>{Text.buttonText}</button> */}
            <h2 className="text-lg">{data_[index]?.question}</h2>
            {/* <h2>{data_[index].correctAnswer}</h2>  */}
            <div className="flex flex-row flex-wrap items-center justify-center sm:gap-4 gap-2">
                {data_[index]?.answers.map((_answer, _index)=>(<div key={_index} onClick={()=>{HandleAnswerClick(_answer, _index)}}><Option text={_answer} /></div>))}
            </div>
          </div>
        )
      }

      const FinalComponente = ()=>{
        return(
          <div>
            Glückwünsch {friendName}! Du hast {correctAnswered} von 8 Punkte erreicht! 
          </div>
        )
      }
    
  return (
    <div>

        <div className='flex flex-col border-2 border-white sm:p-8 p-1 rounded-lg gap-1 m-1 sm:m-0'>

          {
             finish ? <FinalComponente/> : <TestComponente/>
          }

            
        </div>
    </div>
  )
}

export default Test