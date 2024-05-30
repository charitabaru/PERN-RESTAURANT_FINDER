import React,{useEffect,useContext} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { Restaurantscontext } from '../context/RestaurantsContext';
import {useNavigate} from "react-router-dom";
import StarRating from './StarRating';

function RestaurantList(props) {
    
    const {restaurants,setRestaurants} = useContext(Restaurantscontext);

    const Navigate = useNavigate();

    useEffect(()=>{
       async function Fetchdata(){
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.error(error.message);
            }
        }
        Fetchdata();
    },[setRestaurants]);

    async function handleDelete(e,id){
        e.stopPropagation();
        try {
            // eslint-disable-next-line
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(el=>{
                return el.id !== id;
            }));
        } catch (error) {
            console.error(error.message);
        }
    };

     function handleUpdate(e,id){
        e.stopPropagation();
      Navigate(`/restaurants/${id}/update`);
    };

    function handcleRestaurantSelect(id){
        Navigate(`/restaurants/${id}`);
    }

    function renderrating(el){
        if(!el.count){
           return <span className="text-warning ml-1">0 reviews</span>
        }
       return(
        <>
       <StarRating rating={el.id} />
        <span className="text-warning ml-1">({el.count})</span>
        </>
        );
    }

  return (
    <div className='list-group mt-5'>
      <table className='table table-hover table-dark'>
        <thead>
            <tr className='bg-primary'>
                <th scope='col'>Restaurant</th>
                <th scope='col'>Location</th>
                <th scope='col'>Price Range</th>
                <th scope='col'>Ratings</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
                restaurants && restaurants.map(el=>{
                    return(
                    <tr onClick={()=>{handcleRestaurantSelect(el.id)}} key={el.id}>
                        <td>{el.restaurant}</td>
                        <td>{el.location}</td>
                        <td>{"$".repeat(el.price_range)}</td>
                        <td>{renderrating(el)}</td>
                        <td><button onClick={(e)=>handleUpdate(e,el.id)} className='btn btn-warning'>Update</button></td>
                        <td><button onClick={(e)=>handleDelete(e,el.id)} className='btn btn-danger'>Delete</button></td>
                    </tr>
                    )
                })
            }

            {/*<tr>
                <td>Meridian</td>
                <td>Punjagutta</td>
                <td>$</td>
                <td>Rating</td>
                <td><button className='btn btn-warning'>Edit</button></td>
                <td><button className='btn btn-danger'>Delete</button></td>
            </tr>
            <tr>
                <td>Meridian</td>
                <td>Punjagutta</td>
                <td>$</td>
                <td>Rating</td>
                <td><button className='btn btn-warning'>Edit</button></td>
                <td><button className='btn btn-danger'>Delete</button></td>
            </tr>*/}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList;
