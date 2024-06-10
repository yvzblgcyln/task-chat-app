import React, { useRef, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { TiTick, TiTickOutline } from "react-icons/ti";
import { IoIosSend } from "react-icons/io";

interface Message {
  sendByUser: boolean;
  seen: boolean;
  message: string;
  id: number;
  time: string;
}

interface Chat {
  date: string;
  messageList: Message[];
  id: number;
}

interface UserData {
  chatWith: string;
  chatWithImg?: string;
}

export default function ChatComponent() {
  const [message, setMessage] = useState<string>("");
  const [messageSent, setMessageSent] = useState<Message[]>([]);
  const lastMessage = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData>({
    chatWith: "Test",
    chatWithImg: "https://isbull.s3.eu-north-1.amazonaws.com/v2/no-image.png",
  });
  const [messages, setMessages] = useState<Chat[]>([
    {
      id: 1,
      date: "14.03.2024",
      messageList: [
        {
          id: 2,
          sendByUser: true,
          seen: true,
          message: "Hello",
          time: "13:26",
        },
        {
          id: 3,
          sendByUser: false,
          seen: true,
          message: "Hello sir",
          time: "14:26",
        },
      ],
    },
    {
      id: 3,
      date: "18.03.2024",
      messageList: [
        {
          id: 4,
          sendByUser: true,
          seen: false,
          message: "Hello again",
          time: "14:46",
        },
      ],
    },
  ]);

  // scroll to last message
  const scrollToLast = () => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  // send message
  const sendMessage = () => {
    if (!message) return;
    setMessageSent([
      ...messageSent,
      {
        id: 4,
        sendByUser: true,
        seen: false,
        message: message,
        time: "14:46",
      },
    ]);

    scrollToLast();
    setMessage("");
  };

  // enter key submit
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className=" bg-[#f3f1f1] flex flex-col">
      {/* nav area */}
      <div className="flex items-center gap-2 bg-white py-2">
        <Link to={"/"}>
          <MdOutlineArrowBackIos />
        </Link>
        <div className="w-12">
          <img className="w-full rounded-full aspect-square object-cover" src={userData?.chatWithImg} alt="" />
        </div>
        <p>{userData?.chatWith}</p>
      </div>

      {/* chat  */}
      <div className=" px-4 py-6 calc-height overflow-y-auto">
        {messages.map((chat, chatIndex) => (
          <div key={chatIndex}>
            <div className="text-center bg-blue-500 w-fit rounded-[20px] px-4 py-2 text-white mx-auto">{chat.date}</div>
            <div className="flex flex-col">
              {chat.messageList.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col gap-2 shadow-xl rounded-lg py-2 px-4 w-fit ${
                    message.sendByUser ? "self-end bg-green-200" : "justify-start bg-blue-50"
                  }`}
                >
                  <p>{message.message}</p>
                  <div className="self-end flex  items-center">
                    <p className="text-[10px]">{message.time}</p>
                    <div>{message.seen ? <TiTick color="blue" /> : <TiTickOutline />}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2 mt-2">
          {messageSent.map((message, index) => (
            <div
              key={index}
              ref={messageSent.length - 1 === index ? lastMessage : null}
              className="flex flex-col gap-2 shadow-xl rounded-lg py-2 px-4 w-fit self-end bg-green-200   "
            >
              <p>{message.message}</p>
              <div className="self-end flex  items-center">
                <p className="text-[10px]">{message.time}</p>
                <div>{message.seen ? <TiTick color="blue" /> : <TiTickOutline />}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* chat input */}
      <div className="flex gap-2 px-4 py-2">
        <input
          onKeyDown={handleKeyDown}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Mesaj"
          className="w-full border-black border rounded-sm px-2 "
        />
        <button
          onClick={sendMessage}
          className="rounded-full bg-blue-600 aspect-square w-8 flex items-center justify-center text-white"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
