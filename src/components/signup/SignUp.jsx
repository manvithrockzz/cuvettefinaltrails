import { useContext, useState } from 'react';
import component from './SignUp.module.css'
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
    const [issue, setIssue] = useState({});
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
            setIssue(result.issue);
        }
    }

    const handleLogin = () => {
        setActivePopup('LogIn');
    }

    return (
        

            <div className={component.signupContainer}>
                <span className={component.signupMessage}>Sign-up to continue</span>
                <div className={component.mainDiv}>
                    <img src="../../Images/IconU.png" alt="Enter your name" className={component.signupImages} />
                    <input placeholder='Name' className={component.entervalueOne} name='name' onChange={processInput} ></input>
                </div>
                {issue.name && <span className={component.redMessage}>{issue.name}</span>}

                <div className={component.mainDiv}>
                    <img src="../../Images/IconE.png" alt="Enter you email-id" className={component.signupImages} />
                    <input placeholder='Email' className={component.entervalueOne} name='email' onChange={processInput} ></input>
                </div>
                {issue.email && <span className={component.redMessage}>{issue.email}</span>}

                <div className={component.mainDiv}>
                    <img src="../../Images/Phone.png" alt="Enter your Mobile Number" className={component.signupImages} />
                    <input type='Number' placeholder='Mobile' className={component.entervalueOne} name='mobile' onChange={processInput} ></input>
                </div>
                {issue.mobile && <span className={component.redMessage}>{issue.mobile}</span>}

                <div className={component.subDiv}>
                    <img src="../../Images/Lock.png" alt="Enter your Password" className={component.secondsignupImage} />
                    <input type="password" placeholder='Password' className={component.entervalueTwo} name='password' onChange={processInput} />
                </div>
                {issue.password && <span className={component.redMessage}>{issue.password}</span>}

                <span className={component.buttomDiv}>Already have an account? <span className={component.messageB} onClick={handleLogin} >Login</span></span>

                <div className={component.buttonDiv}>
                    <span className={component.signupButton} onClick={attemptLogin} >Signup</span>
                </div>
            </div>
        
    )
}

export default SignUp;