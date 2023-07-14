import React, { useState, useEffect } from "react";
import Booking from "../components/Booking";
import { useBookingsContext } from "../hooks/useBookingsContext";

const Admin = () => {

    const {bookings, dispatch} = useBookingsContext()
  useEffect(() =>{
    const fetchBookings = async() =>{
        const response = await fetch('/api/bookings')
        const json = await response.json()

        if(response.ok){
        dispatch({type:'SET_BOOKINGS', payload:json})
        }
    }
    fetchBookings()
  }, [dispatch])
console.log(bookings)
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">
            All Appointments
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            View all appointments
          </p>
        </div>

        <div className="lg:w-full md:w-full mx-auto">
        
        {/* booking section */}
        {bookings && bookings.map((booking) =>(
            <Booking key={booking._id} booking={booking}/>
        ))}

        </div>
      </div>
    </section>
  );
};

export default Admin;
