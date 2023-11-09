import React from 'react';

const CategoryBox = ({label, icon: Icon}) => {
    return (
        <div className='flex gap-2 flex-col items-center justify-center p-3 border-b-2 hover:text-neutral-800 border-transparent text-neutral-500'>
            <Icon size={26}></Icon>
            <div className='text-sm font-medium'>{label}</div>
        </div>
    );
};

export default CategoryBox;