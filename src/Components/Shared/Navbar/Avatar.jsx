import React, { useContext } from 'react';
import avatarImg from '../../../assets/placeholder.jpg'
import { AuthContext } from '../../../Provider/AuthProvider';

const Avatar = () => {
    const {user} = useContext(AuthContext)
    return (
        <img className='rounded-full' src={user && user.photoURL ? user.photoURL : avatarImg} width='30' height="30" alt="profile" />
    );
};

export default Avatar;