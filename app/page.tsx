// import Image from "next/image";
import Intro from "@/app/componente/intro"
import Navbar from "@/app/componente/navbar"

type TText = {
  _header:string,
  _description:string, 
  _inputPlaceholder:string,
  _button:string,
  _message:string
} 

export default function Home() {

  const text:TText = {
    _header:"Beste Freunde Quiz - Wie gut kennst du mich?",
    _description:"Schreibe deinen Namen auf",
    _inputPlaceholder:"Dein Name",
    _button:"Okei",
    _message:"Bitte schreibe zuerst deinen Namen auf!"
  }
  const lsKey:string = "name"
  const href:string = "/quiz"

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col justify-center items-center min-h-[90vh] ">
        <main className="sm:w-[60%]">
          <Intro _text={text} _lsKey={lsKey} _href={href}/>
        </main>
      </div>
    </div>
  );
}
