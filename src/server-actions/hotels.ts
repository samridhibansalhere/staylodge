"use server";
import { connectMongoDB } from "@/config/db";
import HotelModel from "@/models/hotel-model";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const AddHotel = async (payload:any) => {
  try {
    const newHotel = new HotelModel(payload);
    await newHotel.save();
    revalidatePath("admin/hotels");
    return {
      success: true,
      message: "Hotel Added Successfully",
    };
  } catch (error:any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const EditHotel = async ({hotelId,payload}:{
    hotelId: string;
    payload: any;
}) => {
    try {
      await HotelModel.findByIdAndUpdate(hotelId,payload);
      revalidatePath("admin/hotels");
      return {
        success: true,
        message: "Hotel Updated Successfully",
      };
    } catch (error:any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

export const DeleteHotel = async (hotelId: string) => {
    try {
      await HotelModel.findByIdAndDelete(hotelId);
      revalidatePath("admin/hotels");
      return {
        success: true,
        message: "Hotel Deleted Successfully",
      };
    } catch (error:any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };