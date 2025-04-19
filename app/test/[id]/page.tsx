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

    const [data, setData] = useState<TData[]>([{QID:0,AID:0}])
    const [name, setName] = useState<string>('')
    const [friendName, setFriendName] = useState<string>('')
    let query:any = useSearchParams();
    
    useEffect(()=>{
        let name:string = query?.get('name')
        setName(name)

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

        {
            friendName === '' && 
            <Intro _text={text} _lsKey={lsKey} _href={href}/>
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