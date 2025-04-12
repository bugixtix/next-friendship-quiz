// import Image from "next/image";
import Intro from "@/app/componente/intro"
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
          <main className="sm:w-[60%]">
            <Intro/>
          </main>
    </div>
  );
}
