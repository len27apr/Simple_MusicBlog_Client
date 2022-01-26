import classes from './miniCategories.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
export const MiniCategories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // console.log('use Effect running in miniCaegories');
        const getCategories = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`);
            setCategories(res.data)
        }
        getCategories();
    }, [])


    // console.log('the minicategories are: ', categories);
    return (
        <div className={classes.MiniCategories}>
           <h4 className={classes.MiniCategoriesHeader}>CATEGORIES</h4>
           <ul className={classes.MiniCategoriesList}>
            {categories.map(category => {
                return (
                <Link to={`/?cat=${category.name}`} className='link' key={category.name}>
                    <li className={classes.MiniCategoriesListItem}>
                        {category.name==='Punk rock' ? 'PUNKROCK':category.name.toUpperCase()}
                    </li>
                </Link>
            )})}
        </ul>
        </div>
    )
}