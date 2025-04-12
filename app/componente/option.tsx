
import Image from 'next/image'
function Option({text, image="/images/tea.jpg"}:{text:string, image?:string}){
    return(
      <div className="border-2 border-white rounded-sm p-4 flex flex-col gap-2 items-center flex-auto max-w-[180px]">
            <Image src={image} width="100" height="40" alt="Bild"/>
            <p>{text}</p>
      </div>
    )
}

export default Option