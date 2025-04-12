
import React from 'react'
import Question from "@/app/componente/question"

function Main() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
        <main className="sm:w-[60%] min-h-[100vh] flex flex-col items-center justify-center">
            <Question/>
        </main>
    </div>
  )
}

export default Main