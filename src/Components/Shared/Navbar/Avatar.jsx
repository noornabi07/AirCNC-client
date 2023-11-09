import React, { useContext } from 'react';
import avatarImg from '../../../assets/placeholder.jpg'
import { AuthContext } from '../../../Provider/AuthProvider';

const Avatar = () => {
    const {user} = useContext(AuthContext)
    return (
        <img className='rounded-full w-[28px] h-[28px]' src={user && user.photoURL ? user.photoURL : avatarImg}  alt="profile" />
    );
};

export default Avatar;