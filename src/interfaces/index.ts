export interface UserType {
    _id: string;
    name: string;
    email: string;
    clerkUserId: string;
    profilePic: string;
    isActive: boolean;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface HotelType {
    _id: string;
    name: string;
    email: string;
    owner: string;
    media: string[];
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}
export interface RoomType {
    _id: string;
    hotel: HotelType;
    name: string;
    type: string;
    rentPerDay: number;
    bedrooms: number;
    roomNumber: number;
    amenities: string;
    media: string[];
    createdAt: string;
    updatedAt: string;
}
export interface BookingType {
    _id: string;
    user: UserType;
    hotel: HotelType;
    room: RoomType;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
    totalDays: number;
    bookingStatus: 'Booked' | 'Cancelled';
    paymentId: string;
    createdAt: string;
    updatedAt: string;
}