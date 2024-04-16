import { MdOutlineWifiOff } from "react-icons/md";

export default function NetworkStatus(){

    return (
        <div className="h-screen flex justify-center items-center flex-col ">
            <MdOutlineWifiOff className="h-[20rem] w-[20rem] text-gray-500"/>
            <p className="text-2xl text-center">
                Oops! It seems you've lost internet connection.<br/>
                 Please check your connection and try again shortly.
            </p>
        </div>
    )

}