import React,{useState,createContext} from "react";

export const Restaurantscontext = createContext();

export function RestaurantscontextProvider(props){
    const [restaurants,setRestaurants] = useState([]);
    const [selectedRestaurant,setSelectedRestaurant] = useState(null);

    function addRestaurants(restaurant){
        setRestaurants([...restaurants,restaurant]);
    };
    return (
        <Restaurantscontext.Provider value={{restaurants,setRestaurants,addRestaurants,selectedRestaurant,setSelectedRestaurant}}>
            {props.children}
        </Restaurantscontext.Provider>
    );
};