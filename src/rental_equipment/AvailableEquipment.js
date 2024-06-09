import { Link } from 'react-router-dom';

const AvailableEquipment = ({imageUrls, equipment, loading}) => {

    return (
        <div className='spacing_container'>

        {loading ? (<p>loading...</p>) : (equipment.map(equipment => (

            
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
            </Link>
            
        

        )))}
        
    </div>
    );
}
 
export default AvailableEquipment;