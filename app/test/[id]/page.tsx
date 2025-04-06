'use client'
import React,{useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'

function page() {
    
    type TData = {
        QID:number,
        AID:number
    }
    
    const [data, setData] = useState<TData[]>([])
    let query:any = useSearchParams();
    
    useEffect(()=>{
        let queryEncode = query?.get('data')
        
        let querySplit = queryEncode.split(',')

        let dataArray = querySplit.map((item:string)=>{
            const [q,a] = item.split('-')
            return {QID:Number(q),AID:Number(a)}
        })
        setData(dataArray)
    },[])

    const HandleClick = () :void=>{
        console.log(data)
    }

  return (
    <div>
        
        <p>header</p>
        <button type="button" onClick={HandleClick}>clickme</button>
    </div>
  )
}

export default page