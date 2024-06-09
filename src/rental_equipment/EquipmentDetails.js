import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import VehicleReceipt from '../VehicleReceipt';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const EquipmentDetails = ({ equipment, imageUrls, loginStatus, userInfo, logo }) => {

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
        setTotalPrice(equipment.Price*rentalPeriod)
    }, [rentalPeriod]);

    useEffect(() => {
        setItemName(equipment.Name);
    }, [equipment]);

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
        axios.post('http://localhost:8080/order', {name: name, mobileNumber: mobileNumber, rentalPeriod: rentalPeriod, totalPrice: totalPrice, user_id: user_id, itemName: itemName})
        .then((data) => {
        // console.log(data)
        // setName('')
        // setMobileNumber()
        // setRentalPeriod()
        setBookModal(!bookModal)
        setBookSuccessfulModal(!bookSuccessfulModal)
        setGetOrder_status(true)
        // setSignupSuccessfulModal(!signupSuccessfulModal)
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
        return <Redirect to='/equipment-Receipt' />;
    }








    return (
        <div className='vehicle_details_body'>

            <h1 className='subtitle'>{equipment.Name}</h1>

            <div className='container_vehicle_details'>
                    <img className='vehicle_details_img' src={imageUrls[equipment.Image]} alt="" />
                <div className="vehicle_details">
                    <h1 className='vehicle_specs'>Equipment Details:</h1>
                    <ul className='rental_vehicles_desc'>
                        <hr />
                        <li><span className='desc_label_details'>Name : </span><span className='desc_value_details'>{equipment.Name}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Brand :</span><span className='desc_value_details'> {equipment.Brand}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Condition :</span><span className='desc_value_details'>{equipment.Condition}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Type :</span><span className='desc_value_details'>{equipment.Type}</span></li>
                        <hr />
                        <li><span className='desc_label_details'>Price :</span><span className='price'>{equipment.Price} OMR</span></li>
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
                            <br/><br/><br/>
                            <div className='spacing_container'>

                            <section style={{lineHeight: '1.5em'}}>
                                <h3>Customer Details</h3><br/>
                                <p><strong>Name: {name}</strong> </p>
                                <p><strong>User ID: {userInfo[0].user_id}</strong> </p><br/>
                            </section>
                            <section style={{lineHeight: '1.5em'}}>
                                <h3>Order Details</h3><br/>
                                <p><strong>Order ID: {order_id}</strong> {}</p>
                                <p><strong>Vehicle: {equipment.Name}</strong> {}</p>
                                <p><strong>Rental Duration: {rentalPeriod}</strong> {}</p>
                                <p><strong>Total Price: {rentalPeriod * equipment.Price}</strong></p> 
                            </section></div><br/><br/><br/>
                                <section style={{justifyContent: 'center', display: 'flex'}}>
                            <table className='PDF-table'>
                                <thead>
                                    <tr>
                                    <th className='PDF-table-rows'>No.</th>
                                    <th className='PDF-table-rows'>Item</th>
                                    <th className='PDF-table-rows'>Order ID</th>
                                    <th className='PDF-table-rows'>User ID</th>
                                    <th  className='PDF-table-rows'>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td>1.</td> 
                                        <td>{equipment.Name}</td>
                                        <td>{order_id}</td>
                                        <td>{userInfo[0].user_id}</td>
                                        <td>{rentalPeriod * equipment.Price}</td>
                                    </tr>
                                </tbody>
                                </table>
                                </section><br/><br/><br/>
                            <footer>
                                <p>Thank you for your business!</p>
                                <p>For any inquiries, please contact us at support@rentalvehiclewebsite.com</p>
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

export default EquipmentDetails;