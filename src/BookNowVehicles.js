import { Link } from 'react-router-dom'
import { useState } from 'react'

const BookNoowVehicles = ({vehicles, imageUrls}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };


    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch = vehicle.Model.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterCategory === 'All' || vehicle.Type === filterCategory;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className='default_body' style={{paddingTop: '6em'}}>
            <div className="title_home" style={{marginBottom: '0.6em'}}>
                <p className="sss">Rental Vehicle Options</p>
                <p className='ssss'><i>Choose from a wide range of Vehicles to suit your needs!</i></p>
            </div>
            <br />
            <h1 className='subtitle'>Search Vehicle Rentals:</h1>

            <div className='search-filter-container'>
                <input
                type="text"
                placeholder="Search by Model"
                className='search-bar'
                value={searchQuery}
                onChange={handleSearchChange}
                />
                <span style={{paddingTop: '10px',marginLeft: '15px'}}><b>Filter: </b></span>
                <select className="filter-dropdown" value={filterCategory} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Economy">Economy</option>
                <option value="Family">Family</option>
                <option value="Electric">Electric</option>
                <option value="Luxury">Luxury</option>
                <option value="Sport">Sport</option>
                <option value="Supercar">Supercar</option>
                <option value="Adventure">Adventure</option>
                <option value="Utility">Utility</option>
                </select>
            </div>

            <div className='spacing_container'>

                {filteredVehicles.map(vehicle => (

            
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
                </Link>))}
            </div>

        </div>
    );
}
 
export default BookNoowVehicles;