import PageTitle from '@/components/page-title'
import React from 'react'
import RoomForm from '../../_common/rooms-form'
import RoomModel from '@/models/room-model';
import HotelModel from '@/models/hotel-model';

async function EditRoomPage({params}:{params:{id:string}}) {
    const roomId=params.id;
    const response= await RoomModel.findById(roomId);
    const room=JSON.parse(JSON.stringify(response));
    const hotelsResponse= await HotelModel.find();
    const hotels=JSON.parse(JSON.stringify(hotelsResponse));
    return (
      <div>
        <PageTitle title="Edit Room" />
        <RoomForm type='edit' initialData={room} hotels={hotels}/>
      </div>
    )
  }

export default EditRoomPage
