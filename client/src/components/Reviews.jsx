import React from 'react'
import StarRating from './StarRating';

function Reviews({reviews}) {
  return (
    <div className='row row-cols-3 mb-2 container'>
        {reviews.map(review=>{
            return(
                <div key={review.id} className="card text-white bg-primary mb-4 mr-5" style={{maxWidth:'40%'}}>
                    <div className="card-header d-flex justify-content-between align-text-center ">
                        <span>{review.name}</span>
                        <span style={{ marginLeft: '120px' }}><StarRating rating={review.rating} /></span>
                    </div>
                    <div className="card-body">
                        <div className="card-text">{review.review}</div>
                    </div>   
                </div>
            );
        })}
    </div>
  )
}

export default Reviews;
