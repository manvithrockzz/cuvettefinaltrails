
//  checks for errors in the name and email fields of a userObj object.
 const ValidationForm = (userObj) => {
    // if found any field is missing, then throws an errror with red-Message
        const { name, email, mobile, password } = userObj;
        const error = {};
// here username is being checked by form
        if (!name) {
            error.name = 'Please Enter you name';
        }
// here Email-adress is being checked by form
        if (!email) {
            error.email = 'Please Enter your email';
        }

        //  else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) {
        //     error.email = 'Enter a valid email address';
        //   }

        // tired validation, hard but not working !

        else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = 'Enter valid email adress';
        }

        //This part is working!!
       
          
// here password is being checked by form

        if (!password) {
            error.password = 'Please Enter your password';
        }
        // loop-active {password length must be =/>4 characters}
        else if (password.length < 4) {
            error.password = 'Password must be atleast 4 characters';
        }
// Mobile length kept-10 
        if (!mobile) {
            error.mobile = 'Please Enter your mobile number';

        //       } else if (!/^(\+91|0)?[6789]\d{9}$/.test(mobile)) {
        // error.mobile = 'Enter a valid Indian mobile number';
        // }
// failed to make validation more stronger, but fails
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
            issue: error
        }

    

    }
    export {ValidationForm};


    