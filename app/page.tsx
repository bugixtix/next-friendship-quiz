// import Image from "next/image";
import Intro from "@/app/componente/intro"
import Navbar from "@/app/componente/navbar"

export default function Home() {
  return (
    <div>
      <Navbar/>
    <div className="flex flex-col justify-center items-center min-h-[90vh] ">
          <main className="sm:w-[60%]">
            <Intro/>
          </main>
    </div>
    </div>
  );
}
