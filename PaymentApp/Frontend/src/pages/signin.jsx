import { Heading } from "../components/heading"
import { SubHeading } from "../components/subheading"
import { InputBox } from "../components/inputbox"
import { Button } from "../components/button1"
import { BottomBody } from "../components/bottomwarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios"

export const Signin = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 px-4 h-max">
                <Heading headlabel ={"Sign-in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={e=>{setUsername(e.target.value)}} label={"E-mail"} placeholder={"john_doe@gmail.com"} />
                <InputBox onChange={e=>{setPassword(e.target.value)}} label={"Password"} placeholder={"**********"} />
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username,
                        password
                    });
                    if(!response.data) alert("Wrong Data")
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }}  label={"Sign In"} />
                <BottomBody label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}