import React,{useState,useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { Restaurantscontext } from '../context/RestaurantsContext';

function AddRestaurant() {
    const { addRestaurants} = useContext(Restaurantscontext);
    const [restaurant,setRestaurant] = useState("");
    const [location,setLocation] = useState("");
    const [pricerange,setPricerange] = useState("Price Range");

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/",{
                restaurant,
                location,
                price_range: pricerange
            });
            addRestaurants(response.data.data.restaurant);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }

  return (
    <div className='mt-5'>
        <form action=''>
            <div className="form-row">
                <div className="col">
                    <input onChange={e =>{setRestaurant(e.target.value)}} type='text' className='form-control' placeholder='Restaurantname' value={restaurant}/>
                </div>
                <div className="col">
                    <input onChange={e =>{setLocation(e.target.value)}} type='text' className='form-control' placeholder='location'value={location} />
                </div>
                <div className="col">
                    <select value={pricerange} onChange={e =>{setPricerange(e.target.value)}} className='custom-select  mr-sm-3'>
                        <option disabled >Price Range</option>
                        <option value='1'>$</option>
                        <option value='2'>$$</option>
                        <option value='3'>$$$</option>
                        <option value='4'>$$$$</option>
                        <option value='5'>$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} type='submit' className='btn btn-primary'>Add</button>
            </div>

        </form>
      
    </div>
  )
}

export default AddRestaurant;
