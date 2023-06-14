import { AiOutlineLogin } from "react-icons/ai"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../shadcdn/dialog"

import { useAuth } from "../context/UserContext"
import { useState, useRef } from "react"

const SignUpModal = () => {
    const [login, setLogin] = useState(true)
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);

    const { user, signIn, signUp, gLogin } = useAuth()


    const userHandler = async (e:any) => {
        e.preventDefault()
        try {
            if (login) {
                await signIn(userName?.current?.value, password?.current?.value)
                alert("login")
                return
            }
            if (password?.current?.value !== confirmPassword?.current?.value) return alert("password does not match")
            await signUp(userName?.current?.value, password?.current?.value)
        } catch (error:any) {
            alert(error.message)
            
        }
    }
    const googleLogin = async () => {
        try {
            await gLogin()
        } catch (error:any) {
            alert(error.message)
        }
    }


    return (
        <Dialog>
            <DialogTrigger className="text-black bg-slate-50 p-2 rounded-full text-lg mx-2">
                <AiOutlineLogin />
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-center items-center w-[80vw] my-[20vh] border-2 border-solid border-teal-400 p-16 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-4xl font-bold">{user ? "Login" : "Sign Up"}</DialogTitle>
                    <DialogDescription className="flex justify-center items-center">
                        <button onClick={() => setLogin(true)} className={`text-2xl font-bold mx-2 ${login ? "text-teal-500" : "text-gray-400"}`}>Login</button>
                        <button onClick={() => setLogin(false)} className={`text-2xl font-bold mx-2 ${login ? "text-gray-400" : "text-teal-500"}`}>Sign Up</button>
                        <button onClick={googleLogin} className={`text-2xl font-bold mx-2 ${login ? "text-gray-400" : "text-teal-500"}`}>Google</button>

                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col justify-center items-center">
                    <input ref={userName} className="border-2 border-gray-400 p-2 rounded-lg my-2" type="text" placeholder="Username" />
                    <input ref={password} className="border-2 border-gray-400 p-2 rounded-lg my-2" type="password" placeholder="Password" />
                    {!login && <input ref={confirmPassword} className="border-2 border-gray-400 p-2 rounded-lg my-2" type="password" placeholder="Confirm Password" />}
                    <button onClick={userHandler} className="bg-teal-500 text-white p-2 rounded-lg my-2">{login ? "Login" : "Sign Up"}</button>
                    <p className="text-sm text-gray-700">Don&apos;t have an account?<span onClick={() => setLogin(!login)} className="text-sm text-teal-700 cursor-pointer"> {login ? "Register" : "Login"}</span></p>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpModal