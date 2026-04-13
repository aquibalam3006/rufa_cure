// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function BookAppointment() {
//   const { state } = useLocation();
//   const doctor = state?.doctor; // Ye Doctor ki PROFILE hai
//   const navigate = useNavigate();

//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     const user = JSON.parse(localStorage.getItem('user')); // Patient (Login) ID

//     try {
//       const response = await fetch('http://localhost:5000/api/appointments/book', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           patientId: user._id, 
          
//           // --- FIX IS HERE ---
//           // Hum pehle `doctor._id` bhej rahe the (jo Profile ID thi).
//           // Humein `doctor.userId` bhejna hai (jo Login ID hai).
//           doctorId: doctor.userId, 
          
//           date,
//           time
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Success: Appointment Request Sent!');
//         navigate('/'); 
//       } else {
//         alert('Error: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   if (!doctor) return <h1>No doctor selected</h1>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-blue-600">Book Appointment</h2>
//         {/* Doctor profile se phone number dikhao */}
//         <p className="mb-6 text-gray-600">Doctor Phone: <span className="font-bold">{doctor.phone}</span></p>

//         <form onSubmit={handleBooking}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Select Date</label>
//             <input 
//               type="date" 
//               className="w-full p-2 border rounded"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 font-bold mb-2">Select Time</label>
//             <input 
//               type="time" 
//               className="w-full p-2 border rounded"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               required
//             />
//           </div>

//           <button className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600">
//             Confirm Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BookAppointment;