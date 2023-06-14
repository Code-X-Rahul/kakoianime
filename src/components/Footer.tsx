import Image from 'next/image'
import logo from '../assets/logo.png'
const Footer = () => {
    return (
        <footer className='flex flex-col justify-center items-center my-6'>
            <a className='text-2xl text-teal-500 animate-bounce' href="#header"> ^..^ BACK TO TOP ^..^</a>
            <div className='w-[8rem]'>
                <Image className='w-full h-full' src={logo} alt="mangekyoreader.to" />
            </div>
            <p className='text-md text-slate-300 m-1'>
                Copyright © MangekyoReader.to. All Rights Reserved
            </p>
            <div className='flex flex-col items-center justify-center text-slate-300'>
                <p className='text-sm text-center px-4 my-1'>
                    Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
                </p>
                <p>Made with <span className='text-red-600'>&#10084;</span> for anime users!</p>
            </div>
        </footer>
    )
}

export default Footer