import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TypewriterEffect, TypewriterEffectSmooth } from "./type-writer"
// import Typewriter from 'typewriter-effect';
import { TypeAnimation } from 'react-type-animation';

type ChatType = {
    message: string
    className?: string
    fallbackText: string
    name: string
    profile: string
    status: string
}

export default function Chat({ profile, fallbackText, name, message, className, status }: ChatType) {
    return (
        <Card className="border-none mt-5 shadow-none w-screen" >
            <CardHeader className="">
                <div className="flex items-center gap-2">
                    {
                        (name != "You")?
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-8 w-8"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                        :
                    <Avatar>
                        <AvatarImage src={profile} />
                        <AvatarFallback>{fallbackText}</AvatarFallback>
                    </Avatar>
                    }
                    <CardTitle>{name}</CardTitle>
                </div>
                <CardDescription className="text-wrap">{new Date().toDateString()}</CardDescription>
            </CardHeader>
            <CardContent className={`flex m-auto text-wrap pt-5 w-[80rem] rounded-xl ${(name === "You") ? "" : "bg-gray-100"}`}>
                {(status === "history") ?
                    <div className="text-wrap">
                        <span className="h-[30rem]">{message}</span>
                    </div>
                    :
                    // <Typewriter
                    //     onInit={(typewriter) => {
                    //         typewriter.typeString(message)
                    //             .callFunction(() => {
                    //                 console.log('String typed out!');
                    //             })
                    //             .start();
                    //     }}
                    // />
                    <TypeAnimation
                        sequence={[message]}
                        wrapper="span"
                        cursor={false}
                        speed={99}
                        className="w-[90rem]"
                        style={{ fontSize: '1em', display: 'inline-block',marginRight: 20 }}
                    />
                    // <TypewriterEffectSmooth words = {message.split(" ").map((item , index) => ({text : item}))} className="w-[90rem] text-wrap"/>
                }
            </CardContent>
        </Card>
    );
}

// twist silver lab -> TSL