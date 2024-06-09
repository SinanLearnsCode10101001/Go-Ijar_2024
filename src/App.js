import axios from 'axios'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar';
import Home from './Home';
import EconomyVehicles from './rental_vehicles/EconomyVehicles'
import Sign_up from "./Sign_up"
import Log_in from './Log_in';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import TermsAndConditions from './TermsAndConditions';
import VehicleReceipt from './VehicleReceipt';
import logo from "./images/logo_go-ijar.png"
import BookNow from './BookNow';

import Destinations from './Destinations';
import BookNoowVehicles from './BookNowVehicles';

import Stamp from './images/stamp.png'

import 'react-chatbot-kit/build/main.css'


import VehicleDetails from './rental_vehicles/VehicleDetails'
import FamilyVehicles from './rental_vehicles/FamilyVehicles'
import ElectricVehicles from './rental_vehicles/ElectricVehicles'
import LuxuryVehicles from './rental_vehicles/LuxuryVehicles'
import SportVehicles from './rental_vehicles/SportVehicles'
import SupercarVehicles from './rental_vehicles/SupercarVehicles'
import AdventureVehicles from './rental_vehicles/AdventureVehicles'
import UtilityVehicles from './rental_vehicles/UtilityVehicles'

import EquipmentDetails from './rental_equipment/EquipmentDetails'
import TravelEquipment from './rental_equipment/TravelEquipment'
import ConstructionEquipment from './rental_equipment/ConstructionEquipment'
import FitnessSportsEquipment from './rental_equipment/FitnessSportsEquipment'
import PartyEventEquipment from './rental_equipment/PartyEventEquipment'
import AudioVisualEquipment from './rental_equipment/AudioVisualEquipment'
import BookNowEquipment from './BookNowEquipment';



function App({}) {



  const [vehicles, setVehicles] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginStatus, setLoginStatus ] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [username, setUsername] = useState('')
  


  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('http://localhost:8080/AllVehicle')
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

useEffect(() => {
  // Fetch data from the server when the component mounts
  axios.get('http://localhost:8080/AllEquipment')
      .then(response => {
          // Update the state with the retrieved data
          setEquipment(response.data);
          setLoading(false)

      })
      .catch(error => {
          // Handle errors if any
          console.error('Error fetching data:', error);
          setLoading(false)

      });
}, []);






const imageUrls = {
  
  ToyotaCorollaLE2024: require('./images/rental_vehicles/toyota_corolla_LE_2024.avif'),
  Accord2022: require('./images/rental_vehicles/honda_accord_2022.jpg'),
  Elentra2023: require('./images/rental_vehicles/hyundai_elentra_2023.jpg'),
  Civic2017: require('./images/rental_vehicles/honda_civic_2017.jpg'),

  Kodiaq2023: require('./images/rental_vehicles/kodiaq_2023.jpg'),
  Pajero2024: require('./images/rental_vehicles/pajero_2024.jpg'),
  Sportage2021: require('./images/rental_vehicles/sportage_2021.jpg'),
  Tucson2019: require('./images/rental_vehicles/tucson_2019.avif'),


  TeslaModelY2024: require('./images/rental_vehicles/tesla_model_Y_2024.jpg'),
  RRPhantom2024: require('./images/rental_vehicles/RR_phantom_2024.jpg'),
  Corvette2022: require('./images/rental_vehicles/chevrolet_corvette_2022.jpg'),
  Aventador2022: require('./images/rental_vehicles/lamborghini_aventador_2022.jpg'),
  Pioneer2021: require('./images/rental_vehicles/honda_pioneer_2021.jpg'),
  CATForklift2022: require('./images/rental_vehicles/CAT_forklift_2022.jpeg'),

  TravelBackpack: require('./images/rental_equipment/TravelBackpackTravelPro50.avif'),
  HelmetCAT: require('./images/rental_equipment/Helmet_CAT.jpg'),
  Dumbell: require('./images/rental_equipment/dumbell_weight_adjustable.jpg'),
  Chair: require('./images/rental_equipment/plastic_chair.avif'),
  Projector: require('./images/rental_equipment/projector_epson.jpg'),
  DrillingMachine: require('./images/rental_equipment/drilling_machine.jpg'),
  Tent: require('./images/rental_equipment/tent.jpg'),
  TravelPillow: require('./images/rental_equipment/travel-pillow.jpeg'),
  Football: require('./images/rental_equipment/football.jpg'),




};

  
  const location = useLocation()

  return (

    <div className="App">
      <Navbar loginStatus={loginStatus} setLoginStatus= {setLoginStatus} username={username} setUserInfo={setUserInfo}/>
      <div className="content">
        <AnimatePresence mode='wait'>
          <Switch location={ location } key={location.key}>
            <Route exact path="/">
              <Home loginStatus={loginStatus}/>
            </Route>

            <Route exact path="/Sign_up">
              <Sign_up />
            </Route>

            <Route exact path="/Log_in">
              <Log_in loginStatus={loginStatus} setLoginStatus={setLoginStatus} username={username}
              setUsername={setUsername}
              userInfo= {userInfo}
              setUserInfo={setUserInfo}/>
            </Route>


            <Route exact path="/Terms-and-Conditions">
              <TermsAndConditions />
            </Route>

            <Route exact path="/Book-Now">
              <BookNow />
            </Route>

            <Route exact path="/Book-Now/Vehicles">
              <BookNoowVehicles vehicles={vehicles} imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/Book-Now/Equipment">
              <BookNowEquipment equipment={equipment} imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/Destinations">
              <Destinations imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/vehicles/Economy">
              <EconomyVehicles imageUrls={imageUrls}/>
            </Route>


            <Route exact path="/vehicles/Family">
              <FamilyVehicles imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/vehicles/Electric">
              <ElectricVehicles imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/vehicles/Luxury">
              <LuxuryVehicles imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/vehicles/Sport">
              <SportVehicles imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/vehicles/Supercar">
              <SupercarVehicles imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/vehicles/Adventure">
              <AdventureVehicles imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/vehicles/Utility">
              <UtilityVehicles imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/equipment/Travel">
              <TravelEquipment imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/equipment/Construction">
              <ConstructionEquipment imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/equipment/Fitness & Sports">
              <FitnessSportsEquipment imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/equipment/Party & Event">
              <PartyEventEquipment imageUrls={imageUrls}/>
            </Route>

            <Route exact path="/equipment/Audiovisual">
              <AudioVisualEquipment imageUrls={imageUrls}/>
            </Route>



            {vehicles.map((vehicle) => (
              <Route
                key={vehicle.Id_vehicles} // Make sure to provide a unique key
                exact path={`/vehicles/${vehicle.Model}`}>
                <VehicleDetails vehicle={vehicle} imageUrls={imageUrls} loginStatus={loginStatus} userInfo={userInfo} logo={logo} Stamp={Stamp}/>
              </Route>
            ))}

            {equipment.map((equipment) => (
              <Route
                key={equipment.id_equipment} // Make sure to provide a unique key
                exact path={`/equipment/${equipment.Name}`}>
                <EquipmentDetails equipment={equipment} imageUrls={imageUrls} loginStatus={loginStatus} userInfo={userInfo} logo={logo}/>
              </Route>
            ))}

            <Route exact path="/Vehicle-Receipt">
              <VehicleReceipt />
            </Route>

          </Switch>
        </AnimatePresence>
      </div>


    </div>
    
  );
}

export default App;
