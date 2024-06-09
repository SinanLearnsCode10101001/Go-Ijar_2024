import { motion } from 'framer-motion';
import { Link } from "react-router-dom"

import { useState } from 'react'
import home from './images/home_bg.jpg'
import home2 from './images/home_bg_1.jpg'

import Chatbox from './Chatbox';





import Background from './images/home_background.png'
import Background_2 from './images/background_2.png'

import EconomyCar from './images/economy_car.jpg'
import FamilyCar from './images/family_car.jpg'
import ElectricCar from './images/electric_car.jpg'
import LuxuryCar from './images/luxury_car.jpg'
import SportCar from './images/sport_car.jpg'
import Supercar from './images/supercar.jpg'
import AdventureCar from './images/adventure_car.jpg'
import UtilityVehicle from './images/utility_vehicle.jpg'

import MainImage from './images/home_image.png'

import Souq from './images/souq.jpeg'
import Mosque from './images/mosque.jpg'
import NaturalAttraction from './images/natural_attraction.jpeg'
import TownsCities from './images/towns_cities.jpg' 
import HeritageSites from './images/heritage_sites.jpg'

import Travel from './images/travel.jpeg'
import Construction from './images/construction.jpeg'
import Fitness from './images/fitness.jpg'
import Party from './images/party.jpeg'
import AudioVisual from './images/audiovisual.jpg'

const Home = ({loginStatus}) => {

    const containers_vehicle_categories = [
        {image: EconomyCar, title: 'Economy', description: 'affordable economy vehicles'},
        {image: FamilyCar, title: 'Family', description: 'affordable family vehicles'},
        {image: ElectricCar, title: 'Electric', description: 'electric vehicles'},
        {image: LuxuryCar, title: 'Luxury', description: 'luxury vehicles'},
        {image: SportCar, title: 'Sport', description: 'affordable sport vehicles'},
        {image: Supercar, title: 'Supercar', description: 'high-end sport vehicles'},
        {image: AdventureCar, title: 'Adventure', description: 'affordable adventure vehicles'},
        {image: UtilityVehicle, title: 'Utility', description: 'affordable utility vehicles'}
    ]  
    
    const containers_equipment = [
        {image: Travel, title: 'Travel', description: 'inexpensive travel equipment'},
        {image: Construction, title: 'Construction', description: 'efficient construction tools'},
        {image: Fitness, title: 'Fitness & Sports', description: 'fitness & sports equipment'},
        {image: Party, title: 'Party & Event', description: 'party & event items'},
        {image: AudioVisual, title: 'Audiovisual', description: 'audiovisual equipment'},
    ]

    const containers_destinations = [
        {image: Souq, title: 'Souqs', description: 'cultural marketplace'},
        {image: Mosque, title: 'Mosques', description: 'place of worship'},
        {image: NaturalAttraction, title: 'Natural Attractions', description: 'natural geographic landmark'},
        {image: TownsCities, title: 'Towns & Cities', description: 'towns & cities'},
        {image: HeritageSites, title: 'Cultural Heritage Sites', description: 'culturally rich landmarks'},
    ]


    
    const containerVariants = {
        hidden: {
            x:-700
        },
        visible: {
            x:0,
            transition: {
                delay: 0,
                duration: 0.1,
                type: 'spring',
                stiffness: 30
            }
        },
        exit: {
            x: '-100vw',
            transition: { ease: 'easeInOut' }
        }
    }



    return(
        
        

        <div className="home_body">
        {/* {console.log(loginStatus)} */}

            {/* <img src={Background} className='a' /> */}
            {/* <img src={Background_2} className='b' /> */}
            {/* <img src={home} className='lol' alt="" /> */}


            <Chatbox />

            

            {/* <motion.div className='title_home'
                variants={containerVariants}
                initial= 'hidden'
                animate = 'visible'
                exit='exit'> */}
            <div className = 'title_home'>

            <img src={home2} className='lol' alt="" />
            <span className='ss'>GO-IJAR</span> <p className='sss'>Vehicle & Travel Equipment</p>
            <p className='ssss'><i>Vehicle & Equipment Rental Has Never Been That Easy!</i></p>
            </div>

            <div className='vehicle_categories'>
                <h1 className='subtitle'>VEHICLE CATEGORIES</h1>    
                <div className='spacing_container'>

                { containers_vehicle_categories.slice(0,4).map((container) => {
                        return(
                            <Link to={`/vehicles/${container.title}`} key= {container.title}>

                                <div className= 'container_vehicle_categories'>
                                    <img src={container.image} alt='' className='vehicle_category_images'/>
                                    <h2 className='vehicle_category_title'>{container.title}</h2>
                                    <h5 className='vehicle_category_desc'>{container.description}</h5>
                                </div>

                            </Link>
                        )
                    })}
                </div>

                <div className='spacing_container'>


                    { containers_vehicle_categories.slice(4,8).map((container) => {
                        return(
                            <Link to={`/vehicles/${container.title}`} key= {container.title}>

                                <div className= 'container_vehicle_categories'>
                                    <img src={container.image} alt='' className='vehicle_category_images'/>
                                    <h2 className='vehicle_category_title'>{container.title}</h2>
                                    <h5 className='vehicle_category_desc'>{container.description}</h5>
                                </div>

                            </Link>
                        )
                    })}
                </div>
            </div>


            <div className='equipment'>

                <h1 className='subtitle'>EQUIPMENT CATEGORIES</h1>

                    <div className = 'spacing_container'>
                    { containers_equipment.map((container) => {
                        return(
                            <Link to={`/equipment/${container.title}`} key= {container.title}>

                                <div className= 'container_destinations_categories'>
                                    <img src={container.image} alt='' className='vehicle_category_images'/>
                                    <h2 className='vehicle_category_title'>{container.title}</h2>
                                    <h5 className='vehicle_category_desc'>{container.description}</h5>
                                </div>

                            </Link>
                        )
                    })}

                    </div>



            </div>

            <div className='destinations'>
                    <h1 className= 'subtitle'>DESTINATIONS IN OMAN</h1>
                <div className='spacing_container'>

                { containers_destinations.map((container) => {
                        return(
                            <Link to={`/Destinations`} key= {container.title}>

                                <div className= 'container_destinations_categories'>
                                    <img src={container.image} alt='' className='destination_images'/>
                                    <h2 className='vehicle_category_title'>{container.title}</h2>
                                    <h5 className='vehicle_category_desc'>{container.description}</h5>
                                </div>

                            </Link>
                        )
                    })}

                </div>
            </div>

            

            


        </div>

        

    );
}
 
export default Home;