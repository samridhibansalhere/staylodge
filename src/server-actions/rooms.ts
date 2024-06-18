"use server";
import { connectMongoDB } from "@/config/db";
import RoomModel from "@/models/room-model";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const AddRoom = async (payload:any) => {
  try {
    const newRoom = new RoomModel(payload);
    await newRoom.save();
    revalidatePath("admin/rooms");
    return {
      success: true,
      message: "Room Added Successfully",
    };
  } catch (error:any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const EditRoom = async ({roomId,payload}:{
    roomId: string;
    payload: any;
}) => {
    try {
      await RoomModel.findByIdAndUpdate(roomId,payload);
      revalidatePath("admin/rooms");
      return {
        success: true,
        message: "Room Updated Successfully",
      };
    } catch (error:any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

export const DeleteRoom = async (roomId: string) => {
    try {
      await RoomModel.findByIdAndDelete(roomId);
      revalidatePath("admin/rooms");
      return {
        success: true,
        message: "Room Deleted Successfully",
      };
    } catch (error:any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };