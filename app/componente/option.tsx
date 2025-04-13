
import Image from 'next/image'
function Option({text, image="/images/tea.jpg"}:{text:string, image?:string}){
    return(
      <div className="border-2 border-white rounded-sm py-6 sm:px-2 my-2 flex flex-col gap-2 items-center flex-auto h-[280px] w-[136px] sm:w-[180px] hover:border-blue-500 transition duration-300 cursor-pointer">
            <Image src={image} className="w-[80%] h-[160px] object-cover rounded-sm" width="100" height="40" alt="Bild"/>
            <p className="text-sm px-1 text-center">{text}</p>
      </div>
    )
}

export default Option