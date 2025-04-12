'use client'
import React,{useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import Test from '@/app/componente/test'

function page() {
    
    type TData = {
        QID:number,
        AID:number
    }
    
    const [data, setData] = useState<TData[]>([{QID:0,AID:0}])
    const [name, setName] = useState<string>('')
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
        <Test name={name} data={data}/>
    </div>
  )
}

export default page