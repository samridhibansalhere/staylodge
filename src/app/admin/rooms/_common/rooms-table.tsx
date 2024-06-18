'use client'
import { RoomType } from '@/interfaces'
import { message, Table } from 'antd'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { DeleteRoom } from '@/server-actions/rooms'
function RoomsTable({rooms}:{rooms:RoomType[]}) {
    const router= useRouter();
    const[loading=false,setLoading]=React.useState<boolean>(false)
    const onDelete=async(roomId:string)=>{
        try{
            setLoading(true);
            const response = await DeleteRoom(roomId);
            if(response.success) {
                message.success(response.message);
            }
            if(!response.success) {
                message.error(response.error);
            }
        }catch(error:any){
            message.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    const columns=[
        {
            title: 'Hotel',
            dataIndex: 'hotel',
            key: 'hotel',
            render:(text:any ,record:RoomType)=>record.hotel.name
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Rent Per Day',
            dataIndex: 'rentPerDay',
            key: 'rentPerDay',
        },
        {
            title: 'Bedrooms',
            dataIndex: 'bedrooms',
            key: 'bedrooms',
        },
        {
            title: 'Room Number',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
            
        },
        {
            title: 'Amenities',
            dataIndex: 'amenities',
            key: 'amenities',
            
        },
        {
            title: 'Created At',
            key: 'createdAt',
            render:(text:any,record:RoomType)=>dayjs(record.createdAt).format('MM DD,YYYY hh:mm A')
        },
        {
            title: 'Action',
            key: 'action',
            render:(text:any,record:RoomType)=>(
                <div className='flex gap-5 items-center'>
                    <Trash2 className='cursor-pointer text-red-700' size={18}
                    onClick={()=>onDelete(record._id)}/>
                    <Edit className='cursor-pointer text-yellow-700' size={18}
                    onClick={()=>router.push(`/admin/rooms/edit/${record._id}`)}/>
                </div>
            )
        },
    ]
  return (
    <div>
     <Table loading={loading} dataSource={rooms} columns={columns}/>
    </div>
  )
}

export default RoomsTable
