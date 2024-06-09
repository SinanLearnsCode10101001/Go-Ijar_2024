import { useState, useEffect } from 'react'
import axios from 'axios';

import EquipmentAvailable from './AvailableEquipment';


const PartyEventEquipment = ({ imageUrls }) => {

    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the server when the component mounts
        axios.get('http://localhost:8080/Event')
            .then(response => {
                // Update the state with the retrieved data
                setEquipment(response.data);
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
            <h1>Travel Equipment List:</h1>
            <EquipmentAvailable imageUrls={imageUrls} equipment={equipment} loading={loading} />

        </div>
    );
}
 
export default PartyEventEquipment;