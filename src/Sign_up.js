import axios from 'axios';
import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

    
const Sign_up = () => {



    const [usernameReg, setUsernameReg] = useState('')
    // const [DOB, setDOB] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    // const [user_email, setUser_email] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const [signupSuccessfulModal, setSignupSuccessfulModal] = useState(false)
    const [redirect, setRedirect] = useState(false);
    
    
    const toggleSignSuccessfulModal = () => {
      setSignupSuccessfulModal(!signupSuccessfulModal)
      setRedirect(true)
      } 
      
      
      const usernamePattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
      
      const submitHandler = (e) => {

      e.preventDefault();
      if (!usernamePattern.test(usernameReg)) {
        setError('Username must have at least 9 characters and include at least one number and one character.');
        return;
    }
    if (!passwordPattern.test(passwordReg)) {
        setError('Password must have at least 9 characters and include at least one number and one character.');
        return;
    }
      if (passwordReg !== confirmPassword) {
          setError('Passwords do not match');
          return;
      }

    axios.post('http://localhost:8080/signup', {usernameReg: usernameReg, passwordReg: passwordReg})
    .then((data) => {
    // console.log(data)
    setUsernameReg('')
    setPasswordReg('')
    // setUser_email('')
    // setDOB('')
    setSignupSuccessfulModal(!signupSuccessfulModal)
  }).catch((error) => {
    console.error('An error occurred:', error);
    // You can add further handling here, such as displaying an error message to the user
})}

  if (redirect) {
    return <Redirect to='/Log_in' />;

  }


  return (

    <div className="signup_and_login_page">

      <motion.div className="form_container"
      initial= {{x: '100vw'}}
      animate= {{x: 0}}
      transition= {{delay: 0, duration: 0.3, type: 'spring', stiffness: 35 }}>
      <h1 className = "signup_and_login_title">Sign-up</h1><br/>
        <p>Fill in the details to create Go-Ijar account</p><br/>

        <form onSubmit={submitHandler}>
          <label> Username:</label><br/>
          <input placeholder="Enter name" type="text" value={usernameReg} id='username' onChange={(e) => {setUsernameReg(e.target.value)}} required/><br/><br/>

          {/* <label> Date of Birth:</label><br/>
          <input placeholder="DOB" type="date" value={DOB} id='DOB' onChange={(e) => {setDOB(e.target.value)}} required/><br/><br/> */}

          {/* <label> Your Email ID:</label><br/>
          <input placeholder="example@gmail.com" type="email" value={user_email} id='user_email' onChange={(e) => {setUser_email(e.target.value)}} required/><br/><br/> */}

          <label> New Password:</label><br/>
          <input placeholder="password" type="password" value={passwordReg} id='password' onChange={(e) => {setPasswordReg(e.target.value)}} required/><br/><br/>

          <label>Confirm Password:</label><br/>
          <input placeholder="password" type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} required/><br/><br/>

          <div className ='checkbox-container'>
        <input
          type="checkbox"
          // checked={termsAccepted}
          // onChange={(e) => setTermsAccepted(e.target.checked)}
          required
        />
        <label>I accept the <Link to='/Terms-and-Conditions'>terms and conditions</Link></label>
        </div><br/><br/>


          {error && <p style={{ color: 'red', paddingBottom: '10px' }}>{error}</p>}

          <button className = "submit" type='submit'>Submit</button>
        </form>
      </motion.div>
      {signupSuccessfulModal && 
            <div className='logout-modal'>
            <div className="overlay"></div>
            <div className="logout-modal-content" style={{right: '20%', top: '50%'}}>
                <h2 style={{textAlign: 'center'}}>Your Go-Ijar account has been created!</h2>
                <div className="buttons_spacing" style={{justifyContent: 'center'}}>
                    <button className='default'
                    onClick={toggleSignSuccessfulModal}>Login</button>
                </div>
            </div>
            </div>}


   </div>
    );
}
 
export default Sign_up;