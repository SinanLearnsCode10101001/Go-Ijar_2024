// FetchVehicleData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const FetchVehicleData = ({ setData, setLoading }) => {
    useEffect(() => {
        axios.get('http://localhost:8080/VehicleEconomy')
            .then(response => {
                // Update the state with the retrieved data
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                // Handle errors if any
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return null; // Since this component doesn't render anything
};

export default FetchVehicleData;