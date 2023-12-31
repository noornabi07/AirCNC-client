import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://air-cnc-server-one.vercel.app/'
})

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        // 1. interceptors request (client -------> server)
        axiosSecure.interceptors.request.use(config => {
            const token = `Bearer ${localStorage.getItem('access-token')}`;
            if (token) {
                config.headers.Authorization = token;
            }
            return config
        })

        // 2. interceptors response (client <---------- server)
        axiosSecure.interceptors.response.use(response => response, async error =>{
            if(error.response && error.response.status === 401 || error.response.status === 403){
                await logOut()
                navigate('/login');
            }
            return Promise.reject(error);
        })
    }, [logOut, navigate, axiosSecure])
    return [axiosSecure]
}

export default useAxiosSecure;