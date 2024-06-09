import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Log_in = ( {loginStatus, setLoginStatus, username, setUsername, userInfo, setUserInfo} ) => {

    // const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginMessage,setLoginMessage] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [loginSuccessfulModal, setLoginSuccessfulModal] = useState(false)
    // const [userInfo, setUserInfo] = useState({})

    const toggleLoginSuccessfulModal = () => {
        setLoginSuccessfulModal(!loginSuccessfulModal)
        setRedirect(true)
    } 

  
    const login = (event) => {
        event.preventDefault();
        console.log(`Attempting to login with username: ${username} and password: ${password}`);
        
        axios.post('http://localhost:8080/login', { username: username, password: password })
            .then((response) => {
                console.log('Response from server:', response.data);
                setUserInfo(response.data)
                if (response.data.length > 0) {
                    // If the response contains a user record, log the username and password
                    console.log('Username:', username);
                    console.log('Password:', password);
                }
                if (response.data.message) {
                    setLoginMessage(response.data.message)
                    console.log('Message from server:', response.data.message);
                } else {
                    setLoginMessage(`Welcome ${response.data[0].username}`)
                    setLoginStatus(true)
                    setLoginSuccessfulModal(!loginSuccessfulModal)
                }
            }).catch((error) => {
                console.error('An error occurred:', error);
            });
    }

    if (redirect) {
        return <Redirect to='/' />;
    }



    return (
        <div className='signup_and_login_page'>
            {userInfo.length > 0 && (
            console.log("User ID:",userInfo[0].user_id)
            )}
        <div className='form_container'>
            <h1 className='signup_and_login_title'>Log-in</h1><br/>
            <p>Log-in to your Go-Ijar account.</p><br/>
            

            <form >
                <FaEnvelope className='envelope_icon'/>
                <FaLock className='lock_icon'/>
                <label> Username:</label><br/>
                <input placeholder="Enter username" name='username' onChange={(e) => {setUsername(e.target.value)}}
                type="text" /><br/><br/>

                <label> Password:</label><br/>
                <input placeholder="Enter password" name='password' onChange={(e) => {setPassword(e.target.value)}}
                type="password"  id='password' /><br/><br/><br/><br/>

                <button className = "submit" onClick={login}>Log-in</button>
                

            </form>
            <h1>{loginMessage}</h1>

        </div>
        {loginSuccessfulModal && 
            <div className='logout-modal'>
            <div className="overlay"></div>
            <div className="logout-modal-content" style={{right: '33%', top: '50%'}}>
                <h2 style={{textAlign: 'center'}}>Login Successful</h2>
                <div className="buttons_spacing" style={{justifyContent: 'center'}}>
                    <button className='default'
                    onClick={toggleLoginSuccessfulModal}>Home</button>
                </div>
            </div>
            </div>}
        </div>
    );
}
 
export default Log_in;