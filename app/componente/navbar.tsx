

import React from 'react'

function Navbar() {
  const text = "Hallo, Willkommen auf unsere Webseite!"
  return (
    <div className="p-4  relative top-0 border-b-1 border-white flex flex-row items-center justify-center">
      <div>

      </div>
      <div className="text-lg sm:w-[60%] px-2 sm:p-0">
        {text}
      </div>
    </div>
  )
}

export default Navbar