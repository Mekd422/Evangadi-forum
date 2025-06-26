import { useRef } from 'react'
import axios from "../axiosConfig"
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();

    const UserNameDom = useRef();
    const firstNameDom = useRef();
    const lastNameDom = useRef();
    const emailDom = useRef();
    const passwordDom = useRef();

    async function handleSubmit(e){
        e.preventDefault();

        const usernamevalue = UserNameDom.current.value;
        const firstvalue = firstNameDom.current.value;
        const lastvalue = lastNameDom.current.value;
        const emailvalue = emailDom.current.value;
        const passvalue = passwordDom.current.value;

        if ( !usernamevalue || !firstvalue || !lastvalue || !emailvalue || !passvalue) {
            alert("please provide all required information");
            return
        }
        try {
            await axios.post("/users/register",{
                username: usernamevalue,
                firstname: firstvalue,
                lastname: lastvalue,
                email: emailvalue,
                password: passvalue
            });
            alert("register successful please login")
            navigate("/login")
            
        } catch (error) {
            alert("something went wrong")
            console.log(error.response)
            
        }
        console.log(UserNameDom.current.value)
        
    }


  return (
    <section>
        <form onSubmit={handleSubmit}>
            <div>
                <span>username: </span>
                <input ref={UserNameDom} type="text" placeholder='username' />
            </div>
            <div>
                <span>First name: </span>
                <input ref={firstNameDom} type="text" placeholder='first name' />
            </div>
            <div>
                <span>Last name: </span>
                <input ref={lastNameDom} type="text" placeholder='last name' />
            </div>
            <div>
                <span>email: </span>
                <input ref={emailDom} type="text" placeholder='email' />
            </div>
            <div>
                <span>password: </span>
                <input ref={passwordDom} type="text" placeholder='password' />
            </div>
        </form>
    </section>
  )
}
