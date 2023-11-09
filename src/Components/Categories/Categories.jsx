import React from 'react';
import Container from '../Shared/Container';
import { categories } from './CategoriesDate';
import CategoryBox from './CategoryBox';

const Categories = () => {
    return (
        <Container>
            <div className='pt-4 flex flex-row justify-between items-center overflow-x-auto'>
                {
                    categories.map(item => (<CategoryBox label={item.label} icon={item.icon} key={item.label}></CategoryBox>))
                }
            </div>
        </Container>
    );
};

export default Categories;