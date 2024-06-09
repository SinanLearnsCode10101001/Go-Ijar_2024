import {useEffect,useState} from 'react';
import VehiclesAvailable from './AvailableVehicles';
import axios from 'axios';

const AdventureVehicles = ({imageUrls}) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle ] = useState(null);


    useEffect(() => {
        
        // Fetch data from the server when the component mounts
        axios.get('http://localhost:8080/AdventureVehicle')
            .then(response => {
                // Update the state with the retrieved data
                setVehicles(response.data);
                setLoading(false)

            })
            .catch(error => {
                // Handle errors if any
                console.error('Error fetching data:', error);
                setLoading(false)

            });
    }, []);


    return (
        <div className='economy_body'>
        <VehiclesAvailable imageUrls={imageUrls} vehicles={vehicles} loading={loading}/>
        </div>
    );
}
 
export default AdventureVehicles;