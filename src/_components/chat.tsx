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
import { Button } from "@/components/ui/button";
import { Speaker } from "lucide-react";

type ChatType = {
    message: string
    className?: string
    fallbackText: string
    name: string
    profile: string
    status: string
}

export default function Chat({ profile, fallbackText, name, message, className, status }: ChatType) {

//     let utterance : SpeechSynthesisUtterance;
//     let synth : SpeechSynthesis;
    
//   function speak(message : string){

//     const voices : SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();

//     console.log(voices);
//   // Set the desired voice to a female voice
//   const desiredVoice = voices.find(voice => voice.name.includes('female'));

//   // If no female voice is found, use any available voice
//   const selectedVoice = desiredVoice || voices[0];

//   // Create a new SpeechSynthesisUtterance object
//   const msg = new SpeechSynthesisUtterance();

//   // Set the text to be spoken
//   msg.text = 'Hello, I am speaking with a female voice.';

//   // Set the desired voice for the utterance
//   msg.voice = selectedVoice;

//   // Speak the text
//   window.speechSynthesis.speak(msg);

//   }

//   function stopSpeak(){
//     synth.cancel();
//   }

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
                        <TypeAnimation
                        sequence={[message]}
                        wrapper="span"
                        cursor={false}
                        speed={99}
                        className="w-[90rem]"
                        style={{ whiteSpace: 'pre-line'}}
                        // style={{ fontSize: '1em', display: 'inline-block',marginRight: 20 }}
                    />
                    </div>
                    :
                    <></>
                }
            </CardContent>
        </Card>
    );
}

// twist silver lab -> TSL