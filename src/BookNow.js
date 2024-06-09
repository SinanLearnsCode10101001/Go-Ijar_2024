import car from './images/supercar.jpg'
import equipment from './images/travel.jpeg'
import { Link } from "react-router-dom"

const BookNow = () => {
    return (
        <div className='economy_body' style={{paddingTop: '6em'}}>
            <div className="title_home" style={{marginBottom: '0.6em'}}>
                <p className="sss">Explore Our Rental Options Today!</p>
                <p className='ssss'><i>Choose from a wide range of Vehicles and Equipment to suit your needs!</i></p>
            </div>

            <div className='spacing_container' style={{justifyContent: 'center'}}>

                <Link to='/Book-Now/Vehicles'><div className= 'container_vehicle_categories' style={{backgroundColor:'white', width: '30em', height: '25em', marginRight:'9em'}}>
                    <div className='book-now-overlay' style={{width: '30em', height: '25em', zIndex:'2em', borderRadius:'10px', position:'absolute', }}></div>
                        <img src={car} alt=""  style={{width: '100%', height: '100%', borderRadius:'10px', zIndex:'1em'}}/>
                        <h1 style={{position: 'absolute', top: '13em', left: '14.5em', color:'white'}}>Vehicles</h1>
                    
                </div></Link>

                <Link to='/Book-Now/Equipment'><div className= 'container_vehicle_categories' style={{backgroundColor:'white', width: '30em', height: '25em'}}>
                <div className='book-now-overlay' style={{width: '30em', height: '25em', zIndex:'2em', borderRadius:'10px', position:'absolute', }}></div>
                <img src={equipment} alt=""  style={{width: '100%', height: '100%', borderRadius:'10px', zIndex:'1em'}}/>
                <h1 style={{position: 'absolute', top: '13em', right: '13.5em', color:'white'}}>Equipment</h1>

                </div></Link>
            </div>
        </div>
    );
}
 
export default BookNow;