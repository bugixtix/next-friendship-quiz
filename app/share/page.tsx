import React from 'react'
import GenerateLink from "@/app/componente/generateLink"
import Navbar from "@/app/componente/navbar"

function page() {
  return (
    <div>
    <Navbar/>
    <div className="w-[100%] p-4 flex flex-col items-center justify-center my-4 min-h-[90vh]">
        <GenerateLink/>
    </div>
    </div>
  )
}

export default page