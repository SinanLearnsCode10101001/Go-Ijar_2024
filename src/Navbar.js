import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "./images/logo_go-ijar.png"
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Redirect } from 'react-router-dom'


const Navbar = ({loginStatus, setLoginStatus, username, setUserInfo}) => {

    const buttonVariants = {
        hover: {
            scale: 1.1,
            textShadow: '0px 0px 8px rgb(255,255,255)',
            boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }
    }

    const [hidden, setHidden] = useState(false)
    const { scrollY } = useScroll()
    const [logoutModal, setLogoutModal] = useState(false)
    const [logoutSuccessfulModal, setLogoutSuccessfulModal] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const toggleLogoutModal = () => {
        setLogoutModal(!logoutModal)
    }
    
    
    const handleLogout = () => {
        setLogoutModal(!logoutModal)
        setLogoutSuccessfulModal(!logoutSuccessfulModal)
    }
    
    
    const toggleLogoutSuccessfulModal = () => {
        setLogoutSuccessfulModal(!logoutSuccessfulModal)
        setLoginStatus(false)
        setUserInfo({})
        setRedirect(true)
    }




    
    useMotionValueEvent(scrollY, scrollY.on('change', (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    }))


    // if (redirect) {
    // return <Redirect to='/Sign_up/successful' />;

    // }



    return (
        <motion.header className="navbar"
        variants={{
            visible: { y: 0 },
            hidden: { y: '-100%'}
        }}
        animate= { hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut'}}>
            <img src={logo} className="logo" alt="logo" />
            <ul className="links">
                <li style={{textDecoration: 'none'}}><Link to="/">Home</Link></li>
                <li><Link to="/Book-Now">Book Now</Link></li>
                <li><Link to="/Destinations">Destinations</Link></li>
                <li><Link to="/Feedback">Feedback</Link></li>
            </ul>

            <div className="buttons_navbar">
            {/* <Link to="/Sign_up"><motion.button className="sign_up"
            variants = {buttonVariants}
            whileHover='hover'>
                Sign-up</motion.button></Link>
            <Link to="/Log_in"><motion.button className="login"
             variants = {buttonVariants}
             whileHover='hover'>
                Log-in</motion.button></Link> */}

            
                {!loginStatus ? (
                    <>
                        <Link to="/Sign_up">
                            <motion.button className="sign_up"
                                variants={buttonVariants}
                                whileHover='hover'>
                                Sign-up
                            </motion.button>
                        </Link>
                        <Link to="/Log_in">
                            <motion.button className="login"
                                variants={buttonVariants}
                                whileHover='hover'>
                                Log-in
                            </motion.button>
                        </Link>
                    </>
                ) : (
                    <>
                        <motion.button className="login"
                        variants={buttonVariants}
                        whileHover='hover'
                        style={{backgroundColor: 'White', color: 'Black', fontWeight: 900 }}
                        onClick={toggleLogoutModal}>
                        Log-out
                        </motion.button>
                        {logoutModal && 
                        <div className='logout-modal'>
                        <div className="overlay"></div>
                        <div className="logout-modal-content">
                            <h2 style={{textAlign: 'center'}}>Logout?</h2>
                            <p>Are you sure you want to log out from {username}?</p>
                            <div className="buttons_spacing">
                                <button className='default'
                                onClick={toggleLogoutModal}>CLOSE</button>
                                <button className='default'
                                onClick={handleLogout}>Log-out</button>
                            </div>
                        </div>
                        </div>}

                        {logoutSuccessfulModal && 
                        <div className='logout-modal'>
                        <div className="overlay"></div>
                        <div className="logout-modal-content" style={{right: '33%', top: '600%'}}>
                            <h2 style={{textAlign: 'center'}}>Log-out Successful</h2>
                            <div className="buttons_spacing" style={{justifyContent: 'center'}}>
                                <button className='default'
                                onClick={toggleLogoutSuccessfulModal}>CLOSE</button>
                            </div>
                        </div>
                        </div>}



                    </>
                )}

            </div>
        </motion.header>
    );
}
 
export default Navbar;