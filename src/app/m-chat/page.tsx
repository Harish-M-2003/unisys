"use client";
import Chat from "@/_components/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    
  useEffect(() => {
    
    async function checkAccess(){
      const token_status = await axios.get("/api/validate_request");

      if (token_status.data.valid === false){
        router.push("/")
      } 

    }
    checkAccess()
  } , [])

    const [message, setMessage] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [mChatMessage, setMChatMessage] = useState("");
    const [history , setHistory] = useState([{}]);
    const [loading, setLoading] = useState(false);


    async function fetchMChatResponse() {

        setLoading(() => true)
        const result = await axios.post("http://172.16.21.79:5000/ask", {
            question: message,
            email : "keshavbaskarb.cse2021@citchennai.net",
        })

        setMChatMessage(() => result?.data.response);
        // setHistory((data) => [...data , {prompt : userMessage , response : result?.data.response}]);
        setLoading(() => false);
    
           
    }
    
    async function onClickSubmit() {
        
        if (message.length != 0 && loading === false){   
            setUserMessage(() => message);
            setMessage(() => "");
            fetchMChatResponse();
            console.log(history)
        }

    }

    return (
        <div className="flex flex-col overflow-hidden">
           
            <div className="flex flex-col justify-between h-screen" onKeyDown={(event) => (event.key === "Enter") ? onClickSubmit() : null}>
                <ScrollArea className="px-5">

                    {/* {
                        history.map((chat , index) => (
                            (index > 1)?
                                <div>
                                    <Chat status="history" message={chat?.prompt} fallbackText="you" name="You" profile="" />
                                    <Chat status="history" message={chat?.response} fallbackText="MChat" name="MChat" profile="" />
                                </div>
                            :
                            <div></div>
                        ))
                    } */}

                    {
                        (userMessage.length != 0) ?
                            <div className="h-[10rem]">
                                <Chat status="history" message={userMessage} fallbackText="you" name="You" profile="" />
                            </div>
                            :
                            <div className="flex justify-center flex-col items-center h-[80vh] gap-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-12 w-12"
                                >
                                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                                </svg>
                                <p className="text-2xl">How can i guide you?</p>
                            </div>
                    }

                    {
                        (mChatMessage.length != 0) ?
                            <div className="rounded-xl">
                                {
                                    (loading === false) ?
                                        <Chat status="" message={mChatMessage} fallbackText="mChat" name="Sarah" profile="" />
                                        :
                                        <Loading />
                                }

                            </div>
                            :
                            <></>
                    }

                </ScrollArea>
                <div className="py-5">
                <div className="flex md:mx-[10em] mx-5 gap-2">
                    <Input multiple value={message} className="md:col-span-9 col-span-3" placeholder="Type somthing here..." onChange={(e) => setMessage(e.target.value)} />
                    <Button onClick={onClickSubmit} disabled={loading} className="sm:px-20">Send</Button>
                </div>
                </div>
            </div>
        </div>
    );
}
