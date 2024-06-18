'use client'
import { Button } from 'antd'
import { useRouter } from 'next/navigation';
import React from 'react'

function LinkButton({title,path}:{title: string,path: string}) {
  const router=useRouter();
    return <Button type="primary" onClick={()=>router.push(path)
    }>{title}</Button>
}

export default LinkButton
