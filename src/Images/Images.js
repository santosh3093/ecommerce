import React, { useEffect, useState } from 'react';

function Images({index}){
    const [image, setImage] = useState(null);
    useEffect(()=>{
        
    },[]);
    let imgVal = image[index].Image;
    return(
        <div>
            <img className="card-img-top" src={imgVal} alt="Book Card"/>
        </div>
    );

}

export default Images;