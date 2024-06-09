import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import VehicleReceipt from '../VehicleReceipt';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const VehicleDetails = ({ vehicle, imageUrls, loginStatus, userInfo, logo, Stamp }) => {

    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState()
    const [rentalPeriod, setRentalPeriod] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [user_id, setUser_id] = useState()
    const [getOrder_status, setGetOrder_status] = useState(false)
    const [getOrder, setGetOrder] = useState([])
    const [order_id, setOrder_id] = useState()

    const [itemName, setItemName] = useState()
    const [loginModal, setLoginModal] = useState(false)
    const [bookModal, setBookModal] = useState(false)
    const [bookSuccessfulModal, setBookSuccessfulModal] = useState(false)
    const [loginRedirect, setLoginRedirect] = useState(false)
    const [receiptRedirect, setReceiptRedirect] = useState(false)

    
    const [loader, setLoader] = useState(false)

    const currentDate = new Date().toLocaleDateString();
    
    useEffect(() => {
        if (userInfo.length > 0) {
            setUser_id(userInfo[0].user_id);
        }
    }, [userInfo]);

    useEffect(() => {
        if (getOrder.length > 0) {
            setOrder_id(getOrder[0].order_id);
        }
    }, [getOrder]);



    useEffect(() => {
        setTotalPrice(vehicle.Price*rentalPeriod)
    }, [rentalPeriod]);

    useEffect(() => {
        setItemName(vehicle.Model);
    }, [vehicle]);

    const handleBook = () => {
        if (loginStatus == false) {
                setLoginModal(!loginModal)

        } else {
            setBookModal(!bookModal)
        }
    }

    const toggleLoginModal = () => {
        setLoginModal(!loginModal)
    }

    const toggleBookModal = () => {
        setBookModal(!bookModal)
    }


    const downloadPDF = () => {
        const capture = document.querySelector('.pdf-container')
        setLoader(true)
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png')
            const doc = new jsPDF('p', 'mm', 'a4')
            const componentWidth = doc.internal.pageSize.getWidth()
            const componentHeight = doc.internal.pageSize.getHeight()
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
            setLoader(false)
            doc.save('receipt.pdf')
        })
    }

    // const toggleBookSuccessfulModal = () => {
    //     setBookSuccessfulModal(!bookSuccessfulModal)
    // }

    const HandleLoginRedirect = () => {
        setLoginModal(!loginModal)
        setLoginRedirect(true)
    }

    const HandleReceiptRedirect = () => {
        setBookSuccessfulModal(!bookSuccessfulModal)
        setReceiptRedirect(true)
    }

    const handleBookSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/order', {name: name, mobileNumber: mobileNumber,
             rentalPeriod: rentalPeriod, totalPrice: totalPrice, user_id: user_id, itemName: itemName})
        .then((data) => {
        setBookModal(!bookModal)
        setBookSuccessfulModal(!bookSuccessfulModal)
        setGetOrder_status(true)
      }).catch((error) => {
        console.error('An error occurred:', error);
        // You can add further handling here, such as displaying an error message to the user
    })
    }

    useEffect(() => {
        console.log(`Fetching orders for user_id: ${user_id}`);
        axios.get(`http://localhost:8080/getOrder?user_id=${user_id}`)
        .then(response => {
            // Update the state with the retrieved data
            setGetOrder(response.data); 


        })
        .catch(error => {
            // Handle errors if any
            console.error('Error fetching data:', error);

        });
    }, [getOrder_status, user_id]);




    if (loginRedirect) {
        return <Redirect to='/Log_in' />;
    }

    if (receiptRedirect) {
        return <Redirect to='/Vehicle-Receipt' />;
    }








    return (
        <div className='vehicle_details_body'>

            <h1 className='subtitle'>{vehicle.Model}</h1>

            <div className='container_vehicle_details'>
                    <img className='vehicle_details_img' src={imageUrls[vehicle.Image]} alt="" />
                <div className="vehicle_details">
                    <h1 className='vehicle_specs'>Vehicle Specs:</h1>
                    <ul className='rental_vehicles_desc'>
                        <hr />
                        <li><span className='desc_label_details'>Make : </span><span className='desc_value_details'>{vehicle.Make}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Model :</span><span className='desc_value_details'> {vehicle.Model}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Year :</span><span className='desc_value_details'>{vehicle.Year}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Type :</span><span className='desc_value_details'>{vehicle.Type}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Color :</span><span className='desc_value_details'>{vehicle.Color}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Mileage :</span><span className='desc_value_details'>{vehicle.Mileage}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Seating Capacity :</span><span className='desc_value_details'>{vehicle.Seating_Capacity}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Transmission:</span><span className='desc_value_details'>{vehicle.Transmission}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Price :</span><span className='price'>{vehicle.Price} OMR</span></li>
                    </ul>

                    <button className='book' onClick={handleBook}>BOOK</button>
                </div>
            </div>
            {loginModal && 
            <div className='logout-modal'>
            <div className="overlay"></div>
            <div className="logout-modal-content" style={{right: '33%', top: '50%'}}>
                <h2 style={{textAlign: 'center'}}>Please Login to Book</h2>
                <div className="buttons_spacing">
                    <button className='default'
                    onClick={toggleLoginModal}>Back</button>
                    <button className='default' onClick={HandleLoginRedirect}>Login</button>
                </div>
            </div>
            </div>}

            {bookModal && 
            <div className='logout-modal'>
            <div className="overlay"></div>
            <div className="logout-modal-content" style={{right: '20%', top: '50%'}}>
                <h2 style={{textAlign: 'center'}}>Fill in the Details to Book your Vehicle:</h2>

                <form onSubmit={handleBookSubmit}>
                <br/><hr/>
                <label> Full Name:</label><br/>
                <input placeholder="Enter full name" name='name' onChange={(e) => {setName(e.target.value)}}
                type="text"  id='name' required/><br/><br/>

                <label> Mobile Number:</label><br/>
                <input placeholder="Enter mobile number" name='mobile_number' onChange={(e) => {setMobileNumber(e.target.value)}}
                type="number" required/><br/><br/>

                <label> Location:</label><br/>
                <input placeholder="Enter location" name='location' 
                type="text"  id='location' required/><br/><br/>

                <label> Rental Period (Days):</label><br/>
                <input placeholder="Enter number of days" name='mobile_number' onChange={(e) => {setRentalPeriod(e.target.value)}}
                type="number" required/><br/><br/><br/><br/>

                
                <div className="buttons_spacing">
                    <button className='default' 
                    onClick={toggleBookModal}>Back</button>
                    <button className = "submit" type='submit'>Book</button>
                </div>
            </form>
            </div>
            </div>}
            {bookSuccessfulModal && 
                <div className='logout-modal'>
                    {/* {console.log(getOrder)} */}
                <div className="overlay"></div>
                <div className="logout-modal-content" style={{right: '33%', top: '50%'}}>
                    <h2 style={{textAlign: 'center'}}>Booking Successful</h2>
                    <div className="buttons_spacing" style={{justifyContent: 'center'}}>
                        {/* <button className='default' onClick={HandleReceiptRedirect} style={{width: '200px'}}>View Receipt</button> */}
                        {/* <VehicleReceipt /> */}

                        <div className='pdf-container' style={{ position: 'absolute', left: '-9999px' }}>
                   {/* style={{ position: 'absolute', left: '-9999px' }}             */}
                            <header style={{textAlign: 'center'}}>
                            <img src={logo} className="logo" alt="logo" style={{position: 'absolute', left: '3em', top: '5em'}}/>
                                <h1>Rental Vehicle & Equipment</h1><br/>
                                <h2>Receipt</h2>
                            </header><br/><br/>
                            <h3>Date: {currentDate}</h3>
                            <br/>
                            <div className='spacing_container'>

                            <section style={{lineHeight: '1.5em'}}>
                                <h3>Customer Details:</h3><br/>
                                <p><strong>Name: {name}</strong> </p>
                                <p><strong>User ID: {userInfo[0].user_id}</strong> </p><br/>
                            </section>
                            <section style={{lineHeight: '1.5em'}}>
                                <h3>Order Details:</h3><br/>
                                <p><strong>Order ID: {order_id}</strong> {}</p>
                                <p><strong>Vehicle: {vehicle.Model}</strong> {}</p>
                                <p><strong>Rental Duration: {rentalPeriod} Days</strong> {}</p>
                                <p><strong>Total Price: {rentalPeriod * vehicle.Price} OMR</strong></p> 
                            </section></div>
                            <h3>Vehicle Details:</h3><br/>
                                <section style={{justifyContent: 'center', display: 'flex'}}>
                            <table className='PDF-table'>
                                <thead>
                                    <tr>
                                    <th className='PDF-table-rows'>No.</th>
                                    <th className='PDF-table-rows'>Model</th>
                                    <th className='PDF-table-rows'>Transmission</th>
                                    <th className='PDF-table-rows'>Seating Capacity</th>
                                    <th className='PDF-table-rows'>Mileage</th>
                                    <th className='PDF-table-rows'>Color</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td className='PDF-table-rows'>1.</td> 
                                        <td className='PDF-table-rows'>{vehicle.Model}</td>
                                        <td className='PDF-table-rows'>{vehicle.Transmission}</td>
                                        <td className='PDF-table-rows'>{vehicle.Seating_Capacity} Seats</td>
                                        <td className='PDF-table-rows'>{vehicle.Mileage} km</td>
                                        <td className='PDF-table-rows'>{vehicle.Color}</td>
                                    </tr>
                                </tbody>
                                </table>
                                </section><br/>
                            <footer>
                                <p><b>Terms and Conditions:</b><br />
                                    1. The vehicle and equipment must be returned in the same condition as at the start of the rental. Any damages or loss will be charged to the renter based on the damages made.<br />
                                    2. The rental period is defined in the rental agreement and must be strictly adhered to.<br />
                                    3. The rental includes a mileage limit of 300KM. Additional charges apply for excess mileage (0.05/- OMR per KM).<br />
                                    4. The vehicle must not be used for illegal activities like drifting or racing.<br />
                                    5. 24/7 roadside assistance is available. Contact the Go-Ijar staff member immediately in case of a breakdown.<br />
                                    6. In case of an accident or theft, the renter must inform Go-Ijar staff member and local authorities (ROP) immediately. <br />
                                    7. Any extension of the rental period must be approved by Go-Ijar staff member and is subject to availability and additional charges.<br />
                                    8. Late returns will incur additional charges as specified in the rental agreement.<br />
                                    9. Go-Ijar reserves the right to terminate the rental agreement without notice in case of violation of terms and conditions.<br />
                                    10. The rental agreement is governed by the laws of Oman. Any disputes arising from this agreement will be settled in the courts of Oman.</p><br />
                                <p>Thank you for your business!</p>
                                <p>For any inquiries, please contact us at go-ijar@gmail.com</p>
                                <img src={Stamp} className="stamp" alt="logo" style={{position: 'absolute', right: '3em', top: '62em',
                                    width: '7em', height: '7em'
                                }}/>

                            </footer>
                            

                        </div>
                        <button className='default' style={{width: '200px'}}
                        onClick={downloadPDF}
                        disabled={loader}>
                            {loader ? (
                                <span>Downloading...</span>
                            ):(
                                <span>Download Receipt</span>
                            )

                            }


                        </button>


                    </div>
                </div>
                </div>
            }

        </div>
    );
}

export default VehicleDetails;