"use client";
import { Button } from "antd";
import { FilterX, Search } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

function Filters({ searchParams }: { searchParams: any }) {
  const today = dayjs().format("YYYY-MM-DD");
  const [checkIn, setCheckIn] = React.useState(searchParams.checkIn || today);
  const [checkOut, setCheckOut] = React.useState(searchParams.checkOut || dayjs(today).add(1, 'day').format("YYYY-MM-DD"));
  const [type, setType] = React.useState(searchParams.type || "");
  const router = useRouter();

  const onSearch = () => {
    const newSearchParamsObject = { ...searchParams, checkIn, checkOut, type };
    const newSearchParams = new URLSearchParams(newSearchParamsObject).toString();
    router.push(`/?${newSearchParams}`);
  };

  const onClear = () => {
    setCheckIn(today);
    setCheckOut(dayjs(today).add(1, 'day').format("YYYY-MM-DD"));
    setType("");
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7 items-end">
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">Check In Date</span>
        <input
          placeholder="Check-in"
          className="h-14 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (dayjs(e.target.value).isAfter(checkOut) || e.target.value === checkOut) {
              setCheckOut(dayjs(e.target.value).add(1, 'day').format("YYYY-MM-DD"));
            }
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">Check Out Date</span>
        <input
          placeholder="Check-out"
          className="h-14 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
          type="date"
          value={checkOut}
          min={dayjs(checkIn).add(1, 'day').format("YYYY-MM-DD")}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">Type</span>
        <select
          className="h-14 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Accessible Room">Accessible Room</option>
          <option value="Adjoining Rooms">Adjoining Rooms</option>
          <option value="Deluxe Room">Deluxe Room</option>
          <option value="Duplex or Loft">Duplex or Loft</option>
          <option value="Executive Room">Executive Room</option>
          <option value="Junior Suite">Junior Suite</option>
          <option value="Standard Room">Standard Room</option>
          <option value="Suite">Suite</option>
          <option value="Connecting Rooms">Connecting Rooms</option>
          <option value="Villa or Cottage">Villa or Cottage</option>
        </select>
      </div>

      <div className="flex gap-5">
        <Button
          icon={<FilterX size={20} />}
          className="h-14 px-10 flex items-center"
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          className="h-14 px-10 flex items-center"
          type="primary"
          icon={<Search size={20} />}
          onClick={onSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default Filters;
