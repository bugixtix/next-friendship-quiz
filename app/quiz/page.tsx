
import React from 'react'
import Question from "@/app/componente/question"
import Navbar from "@/app/componente/navbar"

function Main() {
  return (
    <div>
      <Navbar/>

    <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <main className="  flex flex-col items-center justify-center">
            <Question/>
        </main>
    </div>
    </div>
  )
}

export default Main