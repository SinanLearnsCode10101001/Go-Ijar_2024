import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
// import VehicleDetails from '../VehicleDetails'
// import FetchVehicleData from './FetchVehicleData'
import VehiclesAvailable from './AvailableVehicles';




function EconomyVehicles({ imageUrls }) {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Fetch data from the server when the component mounts
        axios.get('http://localhost:8080/VehicleEconomy')
            .then(response => {
                // Update the state with the retrieved data
                setVehicles(response.data);
                setLoading(false);

            })
            .catch(error => {
                // Handle errors if any
                console.error('Error fetching data:', error);
                setLoading(false);

            });
    }, []);


    return (
        <div className='economy_body'>

            <h1>Economy Vehicle List:</h1>
            <VehiclesAvailable imageUrls={imageUrls} vehicles={vehicles} loading={loading}/>
        </div>
    );
}
 
export default EconomyVehicles;