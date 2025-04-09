'use client'

import React, {useEffect, useState} from 'react'
import Option from '@/app/componente/option'
function Test() {

    const nameEntered = useState<string>('')

    useEffect(()=>{
        
    },[])
  return (
    <div>

        <div className='flex flex-col border-2 border-white p-8 rounded-lg gap-2 m-4 sm:m-0 sm:w-[60%]'>

            <p>{nameEntered}</p>
            <button className="" type="button" onClick={IncreaseQuestionNumber}>{buttonTxt}</button>
            <h2>{QUESTIONinfo.question}</h2>
            <h2>{USERanswer.length+1}</h2>
            <div className="grid grid-cols-2 gap-4">
                {QUESTIONinfo.answers.map((_answer, _index)=>(<div key={_index} onClick={()=>{HandleAnswerClick(_answer, _index)}}><Option text={_answer} /></div>))}
            </div>
            
        </div>
    </div>
  )
}

export default Test