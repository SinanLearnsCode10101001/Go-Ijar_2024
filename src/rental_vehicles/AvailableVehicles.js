import {useState} from 'react';
import {Link} from 'react-router-dom';

const AvailableVehicles = ({imageUrls, vehicles, loading}) => {



    return (
    <div className='spacing_container'>

        {loading ? (<p>loading...</p>) : (vehicles.map(vehicle => (

            
            <Link to={`/vehicles/${vehicle.Model}`} key={vehicle.Id_vehicles} state={{ vehicleData: vehicle }}>
                <div className='container_rental_vehicle' key={vehicle.Id_vehicles}>
                    <img src={imageUrls[vehicle.Image]} className= 'rental_vehicle_images' alt="" />
                    <div className='container_rental_vehicles_desc'>
                        <ul className='rental_vehicles_desc'>
                            <li><span className='desc_label'>Make: </span>{vehicle.Make}</li>
                            <li><span className='desc_label'>Model:</span> {vehicle.Model}</li>
                            <li><span className='desc_label'>Year:</span>{vehicle.Year}</li>
                        </ul>
                        <div className='book_div'>
                            <button className='book_small'>Book</button>
                        </div>
                        <div className='price_book'>
                            <div className='rental_vehicle_price'> {vehicle.Price} OMR/DAY</div>
                        </div>
                    </div>

                </div>
            </Link>
            
        

        )))}
        
    </div>
    );
}
 
export default AvailableVehicles;