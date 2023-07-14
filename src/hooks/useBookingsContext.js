import { BookingsContext } from "../context/BookingContext";
import { useContext } from "react";

export const useBookingsContext = () =>{
    const context = useContext(BookingsContext)

    if(!context){
        throw Error('there seems to be an error from us, we are working on it')
    }

    return context
}