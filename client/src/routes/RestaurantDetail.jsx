import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Restaurantscontext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import Addreview from '../components/Addreview';
import StarRating from '../components/StarRating';

function RestaurantDetail() {
  const {id} = useParams();
  const {selectedRestaurant,setSelectedRestaurant} = useContext(Restaurantscontext);

  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  },[]);
  return (
    <div>
    {selectedRestaurant && (
      <>
      <h1 className='text-center font-weight-bold mt-5 mb-3 display-4'>{selectedRestaurant.restaurant.restaurant}</h1>
      <div className="text-center">
        <StarRating rating={selectedRestaurant.restaurant.average_rating} />
        <span className="text-warning ml-1">
          {selectedRestaurant.restaurant.count ?`(${selectedRestaurant.restaurant.count})`:"0"}
        </span>
      </div>
      <div className="mt-5 container">
      <Reviews reviews={selectedRestaurant.reviews}/>
      </div>
      <Addreview />
      </>
    )}
    </div>
  )
}

export default RestaurantDetail;
