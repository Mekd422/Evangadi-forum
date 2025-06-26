import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from '../axiosConfig'

export const Login = () => {
    const navigate = useNavigate();
    const emailDom = useRef();
    const passwordDom = useRef();

    async function handleSubmit(e){
        e.preventDefault();

        const emailvalue = emailDom.current.value;
        const passvalue = passwordDom.current.value;

        if (!emailvalue || !passvalue) {
            alert("please provide all required information");
            return
        }
        try {
            await axios.post("/users/register",{
                email: emailvalue,
                password: passvalue
            });
            alert("login successful please login")
            navigate("/")
            
        } catch (error) {
            alert(error?.response?.data?.msg)
            console.log(error.response)
            
        }
        
        
    }
  return (
    <section>
        <form onSubmit={handleSubmit}>
            <div>
                <span>email: </span>
                <input ref={emailDom} type="text" placeholder='email' />
            </div>
            <div>
                <span>password: </span>
                <input ref={passwordDom} type="text" placeholder='password' />
            </div>
            <button type='submit'>Login</button>
        </form>
    </section>
  )
}
