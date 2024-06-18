'use client'
import { uploadImageToFirebaseAndReturnUrls } from '@/helpers/image-upload';
import { HotelType } from '@/interfaces';
import { AddRoom, EditRoom } from '@/server-actions/rooms';
import { Button, Form,Input, message, Select, Upload} from 'antd'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function RoomsForm({type='add',initialData,hotels}:{type?: string,initialData?: any,hotels:HotelType[]}) {
    const [uploadedFiles,setUploadedFiles] =useState([]) as any[];
    const [existingMedia=[],setExistingMedia]=useState(initialData?.media|| [])
    const [loading,setLoading]=useState(false)
    const router=useRouter();
    const onFinish=async (values:any)=>{
        try{
            setLoading(true);
            const newUrls=await uploadImageToFirebaseAndReturnUrls(uploadedFiles);
            values.media=[...existingMedia,...newUrls];
            let response:any=null;
            if(type==='add'){
                response= await AddRoom(values);
            } else{
                response= await EditRoom({
                    roomId: initialData._id,
                    payload: values,
                });
            }
            if(response.success){
                message.success(response.message);
                router.push("/admin/rooms");
            }
            if(!response.success){
                message.error(response.error);
            }
            
        } catch(error: any){
            message.error(error.message);
        } finally{
            setLoading(false);
        }
    };
  return (
    <Form layout='vertical' className='grid grid-cols-3 mt-5 gap-5' onFinish={onFinish} initialValues={initialData}>
        <Form.Item label="Hotel Name" name="hotel" className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Hotel name is required. Please enter the hotel's name." }]}>
            <Select placeholder='Select Hotel Name'>
                {hotels.map((hotel)=>(<Select.Option value={hotel._id} key={hotel._id}>
                    {hotel.name}
                </Select.Option>))}
            </Select>
        </Form.Item>
        <Form.Item label="Room Name" name="name" className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Room name is required. Please enter the room's name." }]}>
            <Input placeholder="Room Name" />
        </Form.Item>
        <Form.Item label="Room Number" name="roomNumber" className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Room Number is required. Please enter the room's number." }]}>
            <Input placeholder="Room Number" />
        </Form.Item>
        <Form.Item label="Room Type" name="type" className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Room Type is required. Please enter the room's type." }]}>
            <Select placeholder="Select Room Type">
                <Select.Option key="accessible" value="Accessible Room">Accessible Room</Select.Option>
                <Select.Option key="adjoining" value="Adjoining Rooms">Adjoining Rooms</Select.Option>
                <Select.Option key="deluxe" value="Deluxe Room">Deluxe Room</Select.Option>
                <Select.Option key="duplex" value="Duplex or Loft">Duplex or Loft</Select.Option>
                <Select.Option key="executive" value="Executive Room">Executive Room</Select.Option>
                <Select.Option key="junior" value="Junior Suite">Junior Suite</Select.Option>
                <Select.Option key="standard" value="Standard Room">Standard Room</Select.Option>
                <Select.Option key="suite" value="Suite">Suite</Select.Option>
                <Select.Option key="connecting" value="Connecting Rooms">Connecting Rooms</Select.Option>
                <Select.Option key="villa" value="Villa or Cottage">Villa or Cottage</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item label="Bedrooms" name="bedrooms" className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Bedrooms is required. Please enter the bedrooms." }]}>
            <Input placeholder="Bedrooms" />
        </Form.Item>
        <Form.Item label="Rent Per Day" name="rentPerDay" className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Rent Per Day is required. Please enter the rent per day." }]}>
            <Input placeholder="Rent Per Day" />
        </Form.Item>
        <Form.Item label="Amenities" name="amenities" className="col-span-3"
        rules={[{ required: true, message: "Amenities is required. Please enter the amenities." }]}>
            <Input.TextArea placeholder="Amenities" />
        </Form.Item>
        <div className='col-span-3 flex'>
            <div className='flex gap-5'>
                {existingMedia.map((media:any,index: number)=>(
                    <div className='flex flex-col border border-solid rounded p-3 border-gray-200 gap-5 items-center' key={index}>
                        <img src={media} alt="media" className='h-16 w-16 object-cover'/>
                        <span className='text-gray-500 underline text-sm cursor-pointer' onClick={()=>{
                            setExistingMedia(
                                existingMedia.filter((item:string,i:number)=>i!==index)
                            )
                        }}>Remove</span>
                    </div>
                ))}
            </div>
            <Upload listType='picture-card' beforeUpload={(file)=>{
                setUploadedFiles([...uploadedFiles,file]);
                return false;
            }} multiple>
                <span className='text-xs text-gray-500 p-3'>Upload Media</span>
            </Upload>
        </div>

        <div className='col-span-3 flex justify-end gap-5'>
            <Button disabled={loading} onClick={()=>router.push("/admin/rooms")}>Cancel</Button>
            <Button type='primary' htmlType='submit'loading={loading}>
                {type==="add"?"Add":"Update"}
            </Button>
        </div>
    </Form>
  )
}


export default RoomsForm
