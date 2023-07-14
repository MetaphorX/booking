import React, { useState } from "react";
import { useBookingsContext } from "../hooks/useBookingsContext";

const Appointment = () => {

  const { dispatch } = useBookingsContext();

  const [petowner, setPetOwner] = useState("");
  const [email, setEmail] = useState("");
  const [pet, setPet] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
const [emptyFields, setEmptyfields] = useState([])
const [success, setSuccess] = useState(false)

  const handleName = (event) => {
    setPetOwner(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handlePet = (event) => {
    setPet(event.target.value);
  };
  const handleDesc = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const booking = { message, email, petowner, title, pet };
    const response = await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyfields(json.emptyFields)
    }
    if (response.ok) {
      setEmail("");
      setMessage("");
      setPet("");
      setPetOwner("");
      setTitle("");
      setError(null);
      setSuccess(true)
      setEmptyfields([])
      console.log("new booking added", json);
      console.log(error);
      dispatch({type: 'CREATE_BOOKING', payload:json})
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">
              Book Appointment
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Book appointment for consultations with any our physicians, a
              reply would be sent
            </p>
          </div>
          {error && (
                    <div className="w-full bg-red-500 text-white rounded-md p-2 shadow-md">
                      <p className="text-center">{error}</p>
                    </div>
                  )}
                
          {success && (
                    <div className="w-full bg-green-500 text-white rounded-md p-2 shadow-md">
                      <p className="text-center">Booking made successfully</p>
                    </div>
                  )}
                
          <form onSubmit={handleSubmit}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="petOwner"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="petowner"
                      name="petowner"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={handleName}
                      value={petowner}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={handleEmail}
                      value={email}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={handleTitle}
                      value={title}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Pet
                    </label>
                    <input
                      type="text"
                      id="pet"
                      name="pet"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={handlePet}
                      value={pet}
                    />
                  </div>
                </div>

                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="leading-7 text-sm text-gray-600"
                    >
                      message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      onChange={handleDesc}
                      value={message}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Submit
                  </button>
                  
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Appointment;
