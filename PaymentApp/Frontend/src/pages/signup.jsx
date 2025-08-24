import { Heading } from "../components/heading"
import { SubHeading } from "../components/subheading"
import { InputBox } from "../components/inputbox"
import { Button } from "../components/button1"
import { BottomBody } from "../components/bottomwarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios"

export const Signup= ()=>{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return  <div className="bg-slate-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 px-4 h-max">
                <Heading headlabel={"Sign Up"} />
                <SubHeading label={"Enter your credentials to create an account"} />
                <InputBox onChange={e=>{setFirstname(e.target.value)}} label={"First Name"} placeholder={"John"} />
                <InputBox onChange={e=>{setLastname(e.target.value)}} label={"Last Name"} placeholder={"Doe"} />
                <InputBox onChange={e=>{setUsername(e.target.value)}} label={"Email"} placeholder={"john_doe@gmail.com"} />
                <InputBox onChange={e=>{setPassword(e.target.value)}} label={"Password"} placeholder={"*********"} />
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        firstname,
                        lastname,
                        password
                    });
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }} label={"Sign Up"} />
                <BottomBody label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}