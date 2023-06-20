import { useContext, useState } from 'react';
import styles from './Login.module.css'
import { ValidationForm } from '../../Client/Formvalidation';
import { LoginUser } from '../../Client/api';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';


export default
    function Login() {

    const [clientInfo, setClientInfo] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const { setUserLoggedIn, setModalToShow } = useContext(UserContext);


    const handleChange = (e) => {
        setClientInfo((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleSubmit = async () => {
        const userToBeLoggedIn = {
            name: '0000000',
            email: clientInfo.email,
            mobile: '0000000000',
            password: clientInfo.password
        }
        const result = ValidationForm(userToBeLoggedIn);
        if (result.success) {
            // do the API call
            const userLogIn = await LoginUser(userToBeLoggedIn);

            if (userLogIn.success) {
                toast.success(userLogIn.message, { autoClose: 2000 });
                setUserLoggedIn(true);
                setModalToShow('AddProducts');
            }
            else {
                toast.error(userLogIn.message, { autoClose: 2000 });
            }

        }
        else {
            setErrors(result.errors);
        }
    }

    const handleSignUp = () => {
        setModalToShow('SignUp');
    }

    return (
       
            <div className={styles.signinContainer}>
            <span className={styles.signinMessage}>Log-in to continue</span>
            <div className={styles.mainDiv}>
                <img src="../../Images/IconE.png" alt="Enter your Email adress" className={styles.emailIcon} />
                <input placeholder='Email' className={styles.entervalueOne} name='email' onChange={handleChange}></input>
            </div>
            {errors.email && <span className={styles.error}>{errors.email}</span>}
            <div className={styles.subDiv}>
                <img src="../../Images/Lock.png" alt="Enter your password" className={styles.passwordIcon} />
                <input type="password" placeholder='Password' className={styles.entervalueTwo} name='password' onChange={handleChange} />
            </div>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
            <span className={styles.bottomDiv}>Don’t have an account? <span className={styles.signupMessage} onClick={handleSignUp}>Sign up </span></span>
            <div className={styles.buttonDiv}>
                <span className={styles.loginButton} onClick={handleSubmit}>Login</span>
            </div>
        </div>
      

    )
}



