import { useState } from 'react'
import destinationsData from './Data.json';

import Souq from './images/souq.jpeg'
import Mosque from './images/mosque.jpg'
import NaturalAttraction from './images/natural_attraction.jpeg'
import TownsCities from './images/towns_cities.jpg'
import HeritageSites from './images/heritage_sites.jpg'

const Destinations = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All');


    const imageUrls = {
        MuttrahSouq: require('./images/destinations/muttrah_souq.jpg'),
        Nizwa: require('./images/destinations/nizwa.jpg'),
        WahibaSands: require('./images/destinations/wahiba_sands.jpg'),
        SultanQabusMasjid: require('./images/destinations/Sultan_Qabus_Masjid.jpg'),
        WadiShab: require('./images/destinations/wadi_shab.jpg'),
        Salalah: require('./images/destinations/Salalah.jpg'),
        HazmCastle: require('./images/destinations/hazm_castle.jpg'),
        BahlaFort: require('./images/destinations/bahla_fort.jpg'),
    }

    const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    };

    const filteredDestinations = destinationsData.destinations.filter(destination => {
    const matchesSearch = destination.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || destination.type === filterType;
    return matchesSearch && matchesFilter;
    });


    return (
        <div className ='economy_body' style={{paddingTop: '6em'}}>
            <div className="title_home" style={{marginBottom: '0.6em'}}>
                <p className="sss">Explore Oman's Top Destinations!</p>
                <p className='ssss'><i>Discover the most popular hotsposts in Oman</i></p>
            </div>

            <div className='buttons_spacing'>
                <img src={Souq} alt="" className='destination_images' style={{width: '15em', height: '15em'}}/>
                <img src={Mosque} alt="" className='destination_images' style={{width: '15em', height: '15em'}} />
                <img src={NaturalAttraction} alt="" className='destination_images' style={{width: '15em', height: '15em'}} />
                <img src={TownsCities} alt="" className='destination_images' style={{width: '15em', height: '15em'}} />
                <img src={HeritageSites} alt="" className='destination_images' style={{width: '15em', height: '15em'}} />

            </div>
            <br />
            <br />
            <br />
            <div>
                <h1 className= 'subtitle'>Search Destinations: </h1>

        <div className='search-filter-container'>
            <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearchChange}
            className='search-bar'
            />
            <span style={{paddingTop: '10px',marginLeft: '15px'}}><b>Filter: </b></span>
            <select value={filterType} onChange={handleFilterChange} className="filter-dropdown">
            <option value="All">All</option>
            <option value="Souqs">Souqs</option>
            <option value="Mosques">Mosques</option>
            <option value="Natural Attractions">Natural Attractions</option>
            <option value="Towns & cities">Towns & cities</option>
            <option value="Cultural Heritage Sites">Cultural Heritage Sites</option>
            </select>
      </div>

                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>

                    {filteredDestinations.map((destination, index) => (
                        <div key={index} className='container_vehicle_categories' style={{height: '27em', width: '20em', }}>
                            <img src={imageUrls[destination.image]} alt="" className='destination_images'style={{width: '100%', borderRadius:'10px', margin: '0 0 10px 0'}}/>
                            <h2 className='vehicle_category_title'>{destination.title}</h2>
                            <p style={{paddingLeft: '30px'}}><b>Type:</b> {destination.type}</p>

                            <p style={{paddingLeft: '30px', paddingRight: '30px', textAlign: 'justify'}}>{destination.description}</p>
                            {/* <img src={destination.image} alt={destination.title} /> */}
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}
 
export default Destinations;