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

  return (
    <div>
        <Navbar/>

        {
            friendName === '' && 
            <Intro/>
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