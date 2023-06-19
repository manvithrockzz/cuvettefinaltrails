
export
    const clientSideValidation = (userObj) => {
        const { name, email, mobile, password } = userObj;
        const error = {};

        if (!name) {
            error.name = 'Please Enter you name';
        }

        if (!email) {
            error.email = 'Please Enter your email';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = 'Enter valid email adress';
        }

        if (!password) {
            error.password = 'Please Enter your password';
        }
        else if (password.length < 4) {
            error.password = 'Password must be atleast 4 characters';
        }

        if (!mobile) {
            error.mobile = 'Please Enter your mobile number';
        } else if (!/^[0-9]{10}$/.test(mobile)) {
            error.mobile = 'Enter valid mobile number';
        }

        let allOK;
        if (Object.keys(error).length === 0)
            allOK = true;
        else
            allOK = false;
        return {
            success: allOK,
            errors: error
        }
    }