"use client";
// import Chat from "@/_components/chat";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Suspense, useEffect, useState } from "react";
// import Loading from "./loading";
// import { Textarea } from "@/components/ui/textarea";
// import axios from "axios";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function Page() {

//     const router = useRouter();

//   useEffect(() => {

//     async function checkAccess(){
//       const token_status = await axios.get("/api/validate_request");

//       if (token_status.data.valid === false){
//         router.push("/")
//       } 

//     }
//     checkAccess()
//   } , [])

//     const [message, setMessage] = useState("");
//     const [userMessage, setUserMessage] = useState("");
//     const [mChatMessage, setMChatMessage] = useState("");
//     const [history , setHistory] = useState<{prompt : string , response : string}[]>([]);
//     const [loading, setLoading] = useState(false);


//     async function fetchMChatResponse() {

//         console.log("Before : " , history);

//         setLoading(() => true)
//         // const result = await axios.post("http://localhost:3000/api/m-chat/ask", {
//             const result = await axios.post("http://localhost:3000/api/m-chat/", {
//                 question: message,
//                 email : "keshavbaskarb.cse2021@citchennai.net",
//             })

//             // console.log(result);
//             // setMChatMessage(() => result?.data.response); uncommnet this for production
//             // setMChatMessage(() => result?.data.message);
//             // console.log(result?.data)
//             await setHistory((data ) => [...data , {prompt : message , response : result?.data.response}]);
//             setLoading(() => false);
//             // console.log(history);
//             console.log("After : " , history);


//     }

//     async function onClickSubmit() {

//         if (message.length != 0 && loading === false){   
//             setUserMessage(() => message);
//             setMessage(() => "");
//             fetchMChatResponse();
//             // console.log(history)
//         }

//     }

//     return (
//         <div className="flex flex-col overflow-hidden">

//             <div className="flex flex-col justify-between h-screen" onKeyDown={(event) => (event.key === "Enter") ? onClickSubmit() : null}>
//                 <ScrollArea className="px-5">

//                     {/* {
//                         history.map((chat , index) => (
//                             (index > 1)?
//                                 <div>
//                                     <Chat status="history" message={chat?.prompt} fallbackText="you" name="You" profile="" />
//                                     <Chat status="history" message={chat?.response} fallbackText="MChat" name="MChat" profile="" />
//                                 </div>
//                             :
//                             <div></div>
//                         ))
//                     } */}

//                     {/* {
//                         (userMessage && userMessage.length != 0) ?
//                             <div className="h-[10rem]">
//                                 <Chat status="history" message={userMessage} fallbackText="you" name="You" profile="" />
//                             </div>
//                             :
//                             <div className="flex justify-center flex-col items-center h-[80vh] gap-5">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     className="mr-2 h-12 w-12"
//                                 >
//                                     <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
//                                 </svg>
//                                 <p className="text-2xl">How can i guide you?</p>
//                             </div>
//                     } */}
//                     {
//                         (history && history.length != 0) ?
//                             <div className="h-[10rem]">
//                                 <Chat status="history" message={history[history.length - 1].prompt} fallbackText="you" name="You" profile="" />
//                             </div>
//                             :
//                             <div className="flex justify-center flex-col items-center h-[80vh] gap-5">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     className="mr-2 h-12 w-12"
//                                 >
//                                     <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
//                                 </svg>
//                                 <p className="text-2xl">How can i guide you?</p>
//                             </div>
//                     }

//                     {
//                         (mChatMessage && mChatMessage.length != 0) ?
//                             <div className="rounded-xl">
//                                 {
//                                     (loading === false) ?
//                                         <Chat status="history" message={history[history.length - 1].response} fallbackText="mChat" name="Sarah" profile="" />
//                                         :
//                                         <Loading />
//                                 }

//                             </div>
//                             :
//                             <></>
//                     }

//                 </ScrollArea>
//                 <div className="py-5">
//                 <div className="flex md:mx-[10em] mx-5 gap-2">
//                     <Input multiple value={message} className="md:col-span-9 col-span-3" placeholder="Type somthing here..." onChange={(e) => setMessage(e.target.value)} />
//                     <Button onClick={onClickSubmit} disabled={loading} className="sm:px-20">Send</Button>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import Chat from "@/_components/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState, useRef } from "react";
import Loading from "./loading";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
// import Speech from "speak-tts";

export default function Page() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function checkAccess() {
      const token_status = await axios.get("/api/validate_request");

      if (token_status.data.valid === false) {
        router.push("/");
      }
    }
    checkAccess();
  }, []);

  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [mChatMessage, setMChatMessage] = useState("");
  const [history, setHistory] = useState<{ prompt: string; response: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        // scrollRef.current.scrollTop = scrollRef?.current?.scrollHeight;
        scrollRef.current?.scrollTo(0, document.body.scrollHeight)
      }, 100); // Delay scrolling for 100 milliseconds to ensure DOM update
    }
  }, [history]);

  async function fetchMChatResponse() {
    setLoading(true);
    const result = await axios.post("http://172.16.23.13:8000/chat", {
      message: message,
      email: "keshavbaskarb.cse2021@citchennai.net",
    });
    await setHistory([...history, { prompt: message, response: result.data.response }]);
    setLoading(false);
  }

  function onClickSubmit() {
    if (message.length !== 0 && !loading) {
      setUserMessage(message);
      setMessage("");
      fetchMChatResponse();
    }
  }

  // async function speak() {
  //   if ('speechSynthesis' in window) {
  //     var msg = new SpeechSynthesisUtterance();
  //     var voices = window.speechSynthesis.getVoices();
  //     console.log(voices);
  //     msg.voice = voices[4];
  //     msg.volume = 1; // From 0 to 1
  //     msg.rate = 1; // From 0.1 to 10
  //     msg.pitch = 0.75; // From 0 to 2
  //     msg.text = history[history.length - 1].response;
  //     msg.lang = 'es';
  //     await speechSynthesis.speak(msg);
  //     speechSynthesis.cancel();
  //   } else {
  //     alert("Sorry, your browser doesn't support text to speech!");
  //   }
  // }


  return (
    <div className="flex flex-col">

      <div
        className="flex flex-col justify-between h-screen"
        onKeyDown={(event) => (event.key === "Enter" ? onClickSubmit() : null)}
      >
        <ScrollArea className="px-5" ref={scrollRef}>
          {
            (history.length == 0) ?
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
              :
              <></>

          }
          {history.map((chat, index) => (
            <div key={index}>
              <Chat
                status="history"
                message={chat.prompt}
                fallbackText="you"
                name="You"
                profile=""
              />
              <Chat
                status="history"
                message={chat.response}
                fallbackText="Sarah"
                name="Sarah"
                profile=""
              />
            </div>
          ))}
          {mChatMessage && mChatMessage.length !== 0 && (
            <div className="rounded-xl">
              {loading === false ? (
                <Chat
                  status="history"
                  message={history[history.length - 1].response}
                  fallbackText="mChat"
                  name="Sarah"
                  profile=""
                />
              ) : (
                <Loading />
              )}
            </div>
          )}
        </ScrollArea>
        <div className="py-5">
          <div className="flex md:mx-[10em] mx-5 gap-2">
            <Input
              multiple
              value={message}
              className="md:col-span-9 col-span-3"
              placeholder="Type something here..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={onClickSubmit} disabled={loading} className="sm:px-20">
              Send
            </Button>
            {/* <Button onClick={speak}>
              speak
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
