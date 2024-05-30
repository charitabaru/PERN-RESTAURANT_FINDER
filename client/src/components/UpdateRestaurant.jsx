import React,{useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Restaurantscontext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import {useNavigate} from "react-router-dom";

function UpdateRestaurant() { 
    const {id} = useParams();
    // eslint-disable-next-line
    const {restaurants} = useContext(Restaurantscontext);
    const [restaurant,setRestaurant] =useState("");
    const [location,setLocation] =useState("");
    const [pricerange,setPricerange] =useState("");

    const Navigate = useNavigate();

    useEffect(()=>{
        async function fetchData(){
            try {
            const response = await RestaurantFinder.get(`/${id}`);
            const data = response.data.data.restaurant;
            setRestaurant(data.restaurant);
            setLocation(data.location);
            setPricerange(data.price_range);
            } catch (error) {
                console.error("Error fetching restaurant data", error);
            }
            
        };
        fetchData();
    },[id]);

    async function handleSubmit(e){
        e.preventDefault();
        try {
            // eslint-disable-next-line
            const updateRestaurant = await RestaurantFinder.put(`/${id}`,{
                restaurant,
                location,
                price_range: pricerange
            });
            Navigate("/")
        } catch (error) {
            console.error("Error updating".error)
        }
        
    }

  return (
    <div>
      <form action=''>
        <div className='form-group'>
            <label htmlFor='restaurant'>Restaurant</label>
            <input value={restaurant} onChange={e=>{setRestaurant(e.target.value)}} id='restaurant' className='form-control' type='text' />
        </div>
        <div className='form-group'>
            <label  htmlFor='location'>Location</label>
            <input value={location} onChange={e=>{setLocation(e.target.value)}} id='location' className='form-control' type='text' />
        </div>
        <div className='form-group'>
            <label  htmlFor='pricerange'>Price Range</label>
            <select value={pricerange} onChange={e=>{setPricerange(e.target.value)}} className='custom-select mt-3 mr-sm-3'>
                <option disabled >Price Range</option>
                <option value='1'>$</option>
                <option value='2'>$$</option>
                <option value='3'>$$$</option>
                <option value='4'>$$$$</option>
                <option value='5'>$$$$$</option>
            </select>
        </div>
        <button onClick={handleSubmit} type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant;
