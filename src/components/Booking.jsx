import React from 'react'
import { useBookingsContext } from '../hooks/useBookingsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const Booking = ({booking:{petowner,title,email,message, createdAt, _id}}) => {
  
  const {dispatch} = useBookingsContext()
  const handleDelete = async() =>{
    const response = await fetch('/api/bookings/' + _id, {
      method: 'DELETE'
    })

    const json = await response.json()
    if(response.ok){
      dispatch({type:'DELETE_BOOKING', payload:json})
    }
  }
  return (
    <>

      
              <div className='shadow-md w-full mx-auto font-semibold py-2 px-2 mb-4' >
              <h4 className='text-blue-500 font-semibold'>{petowner}</h4>
              <p className='text-gray-500'>{email}</p>
              <p className='text-gray-500'>{title}</p>
              <p className='text-gray-500 text-xs'>
              {message}
              </p>
              <p className='text-xs pt-2'>{formatDistanceToNow(new Date(createdAt), {addSuffix:true})}</p>
              <div className='mt-4 border-t py-4'>
                <button className='mr-2 bg-green-500 text-white px-2 py-2 rounded-md hover:bg-green-600 text-sm'>Accept</button>
                <button className='mr-2 bg-gray-500 text-white px-2 py-2 rounded-md hover:bg-gray-800 text-sm'>Reschedule</button>
                <button className='mr-2 bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600 text-sm'
                  onClick={handleDelete}
                >Delete</button>
              </div>
              </div>
      

      
      
    
    </>
  )
}

export default Booking