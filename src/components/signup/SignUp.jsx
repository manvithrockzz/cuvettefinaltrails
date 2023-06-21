import { useContext, useState } from 'react';
import styles from './SignUp.module.css'
import { ValidationForm } from '../../Client/Formvalidation';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { getsucessfullRegisteredUser} from '../../Client/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


    function SignUp() {

    const [clientInfo, setClientInfo] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const {setActivePopup} = useContext(UserContext);

    const processInput = (e) => {
        setClientInfo((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const attemptLogin = async () => {
        const userToBeValidated = {
            name: clientInfo.name,
            email: clientInfo.email,
            mobile: clientInfo.mobile,
            password: clientInfo.password
        }
        const result = ValidationForm(userToBeValidated);
        if (result.success) {
            const userRegistration = await getsucessfullRegisteredUser(userToBeValidated);

            if (userRegistration.success) {
                toast.success(userRegistration.message, { autoClose: 2000 });
                setActivePopup('AddProducts');
            }
            else {
                toast.error(userRegistration.message, {autoClose: 2000});
            }
        }
        else {
            setErrors(result.errors);
        }
    }

    const handleLogin = () => {
        setActivePopup('LogIn');
    }

    return (
        

            <div className={styles.signupContainer}>
                <span className={styles.signupMessage}>Sign-up to continue</span>
                <div className={styles.mainDiv}>
                    <img src="../../Images/IconU.png" alt="Enter your name" className={styles.signupImages} />
                    <input placeholder='Name' className={styles.entervalueOne} name='name' onChange={processInput} ></input>
                </div>
                {errors.name && <span className={styles.redMessage}>{errors.name}</span>}

                <div className={styles.mainDiv}>
                    <img src="../../Images/IconE.png" alt="Enter you email-id" className={styles.signupImages} />
                    <input placeholder='Email' className={styles.entervalueOne} name='email' onChange={processInput} ></input>
                </div>
                {errors.email && <span className={styles.redMessage}>{errors.email}</span>}

                <div className={styles.mainDiv}>
                    <img src="../../Images/Phone.png" alt="Enter your Mobile Number" className={styles.signupImages} />
                    <input type='Number' placeholder='Mobile' className={styles.entervalueOne} name='mobile' onChange={processInput} ></input>
                </div>
                {errors.mobile && <span className={styles.redMessage}>{errors.mobile}</span>}

                <div className={styles.subDiv}>
                    <img src="../../Images/Lock.png" alt="Enter your Password" className={styles.secondsignupImage} />
                    <input type="password" placeholder='Password' className={styles.entervalueTwo} name='password' onChange={processInput} />
                </div>
                {errors.password && <span className={styles.redMessage}>{errors.password}</span>}

                <span className={styles.buttomDiv}>Already have an account? <span className={styles.messageB} onClick={handleLogin} >Login</span></span>

                <div className={styles.buttonDiv}>
                    <span className={styles.signupButton} onClick={attemptLogin} >Signup</span>
                </div>
            </div>
        
    )
}

export default SignUp;