import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetail from './routes/RestaurantDetail';
import { RestaurantscontextProvider } from './context/RestaurantsContext';

function App() {
  return (
    <RestaurantscontextProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/restaurants/:id/update' element ={<UpdatePage />}/>
          <Route path='/restaurants/:id' element={<RestaurantDetail />}/>
        </Routes>
      </Router>
    </div>
    </RestaurantscontextProvider>
  );
};

export default App;
