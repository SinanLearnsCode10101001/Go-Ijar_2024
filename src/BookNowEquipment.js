import { Link } from 'react-router-dom'
import { useState } from 'react'

const BookNowEquipment = ({equipment, imageUrls}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };


    const filteredEquipment = equipment.filter(equipment => {
        const matchesSearch = equipment.Name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterCategory === 'All' || equipment.Type === filterCategory;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className='default_body' style={{paddingTop: '6em'}}>
            <div className="title_home" style={{marginBottom: '0.6em'}}>
                <p className="sss">Rental Equipment Options</p>
                <p className='ssss'><i>Choose from a wide range of Equipment to suit your needs!</i></p>
            </div>
            <br />
            <h1 className='subtitle'>Search Equipment Rentals:</h1>

            <div className='search-filter-container'>
                <input
                type="text"
                placeholder="Search by Name"
                className='search-bar'
                value={searchQuery}
                onChange={handleSearchChange}
                />
                <span style={{paddingTop: '10px',marginLeft: '15px'}}><b>Filter: </b></span>
                <select className="filter-dropdown" value={filterCategory} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Travel">Travel</option>
                <option value="Construction">Construction</option>
                <option value="Fitness">Fitness</option>
                <option value="Event">Event</option>
                <option value="Audiovisual">Audiovisual</option>
                </select>
            </div>

            <div className='spacing_container'>

                {filteredEquipment.map(equipment => (

            
                <Link to={`/equipment/${equipment.Name}`} key={equipment.id_equipment} state={{ equipmentData: equipment }}>
                    <div className='container_rental_vehicle' key={equipment.id_equipment}>
                        <img src={imageUrls[equipment.Image]} className= 'rental_vehicle_images' alt="" />
                        <div className='container_rental_vehicles_desc'>
                            <ul className='rental_vehicles_desc'>
                                <li><span className='desc_label'>Name: </span>{equipment.Name}</li>
                                <li><span className='desc_label'>Brand:</span> {equipment.Brand}</li>
                                <li><span className='desc_label'>Condition:</span>{equipment.Condition}</li>
                            </ul>
                            <div className='book_div'>
                                <button className='book_small'>Book</button>
                            </div>
                            <div className='price_book'>
                                <div className='rental_vehicle_price'> {equipment.Price} OMR/DAY</div>
                            </div>
                        </div>

                    </div>
                </Link>))}
            </div>

        </div>
    );
}
 
export default BookNowEquipment;