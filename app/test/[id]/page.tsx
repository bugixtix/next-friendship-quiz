'use client'
import React,{useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import Test from '@/app/componente/test'
import Navbar from '@/app/componente/navbar'
import Intro from '@/app/componente/intro'
function page() {
    
    type TData = {
        QID:number,
        AID:number
    }
    
    type TText = {
        _header:string,
        _description:string, 
        _inputPlaceholder:string,
        _button:string,
        _message:string
    } 
    const [text, setText] = useState<TText>({
        _header:"Beste Freunde Quiz - Wie gut kennst du",
        _description:"Schreibe bitte deinen Namen auf",
        _inputPlaceholder:"Dein Name",
        _button:"Okei",
        _message:"Bitte schreibe zuerst deinen Namen auf!"
    })
    const [data, setData] = useState<TData[]>([{QID:0,AID:0}])
    const [name, setName] = useState<string>('')
    const [friendName, setFriendName] = useState<string>('')
    const [cbValue, setCbValue] = useState<boolean>(false)
    let query:any = useSearchParams();
    
    useEffect(()=>{
        let name:string = query?.get('name')
        setName(name)
        // 
        setText((p)=>({...p,_header:`Beste Freunde Quiz - Wie gut kennst du ${name}?`}))
        // 
        let queryEncode = query?.get('data')
        
        let querySplit = queryEncode.split(',')

        let dataArray = querySplit.map((item:string)=>{
            const [q,a] = item.split('-')
            return {QID:Number(q),AID:Number(a)}
        })
        setData([...dataArray])
        console.log(dataArray)
    },[])


    const lsKey:string = "friendName"
    const href:string = ""
  return (
    <div>
        <Navbar/>

        {
            cbValue === false && 
            <div className="w-[100%] flex flex-col flex-wrap justify-center items-center min-h-[80vh]">
            <div className="sm:w-[60%] flex flex-wrap justify-center items-center">
            <Intro _text={text} _lsKey={lsKey} _href={href} callback={setCbValue}/>
            </div>
            </div>
        }

        {
            friendName !== '' &&
        <div className="flex flex-col items-center justify-center min-h-[90vh]">
            <Test name={name} data={data}/>
        </div>
        }
    </div>
  )
}

export default page