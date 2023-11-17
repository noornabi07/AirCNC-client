import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import RoomDetails from "../Components/RoomDetails/RoomDetails";
import PrivetRoute from "./PrivetRoute";
import DashboardLayout from "../MainLayout/DashboardLayout";
import AddRoom from "../Components/Dashboard/AddRoom/AddRoom";
import { getRoom } from "../API/rooms";
import MyBookings from "../Components/Dashboard/MyBookings/MyBookings";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/room/:id',
                element: (<PrivetRoute><RoomDetails></RoomDetails></PrivetRoute>),
                loader: ({params}) => getRoom(params.id)
            }
        ]

    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <Register></Register>
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            {
                path: '/dashboard/add-room',
                element: <AddRoom></AddRoom>
            },
            {
                path: '/dashboard/my-bookings',
                element: <MyBookings></MyBookings>
            }
        ]
    }
])

export default router;