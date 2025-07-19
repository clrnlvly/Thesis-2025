import { Bot, BotMessageSquare, Send, User, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

export default function ChatBubbles({ className = "", FAQ }) {
    const [isVisible, setIsVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const scrollRef = useRef(null);
    const againQuestion = "Would you like to ask another question?";

    useEffect(() => {
        if (!show) {
            const interval = setInterval(() => {
                setIsVisible((prev) => !prev);
            }, 7000);

            return () => clearInterval(interval);
        }
    }, [show]);

    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [chatHistory]);

    const handleChatBot = () => {
        setShow((prev) => !prev);
        setIsVisible(false);
    };

    const handleQuestionClick = (answer) => {
        setSelectedAnswer(answer);

        setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { sender: "user", message: answer.question },
            { sender: "bot", message: answer.answer },
            {
                sender: "bot",
                message: againQuestion,
            },
        ]);
    };

    const handleAskAnotherQuestion = () => {
        setChatHistory([]);
    };

    return (
        <div className={`${className} space-y-2`}>
            {show && (
                <div className="bg-white border relative shadow-lg min-w-80 max-w-80 h-96 space-y-2 rounded-lg rounded-br-none">
                    <div className="p-2 flex justify-between bg-primary rounded-lg rounded-bl-none rounded-br-none">
                        <p className="text-white font-medium">ChatBot (FAQ)</p>
                        <X
                            className="h-5 text-white cursor-pointer hover:bg-slate-50  hover:text-black"
                            onClick={() => setShow(false)}
                        />
                    </div>

                    <div className="h-72 overflow-y-auto" ref={scrollRef}>
                        <div className="flex flex-col gap-2 p-4">
                            <div className="flex gap-2 items-center">
                                <div className="flex justify-center items-center">
                                    <Bot className="text-black" />
                                </div>

                                <div className="text-sm p-2 bg-slate-100 max-w-96 border border-gray-300 rounded-lg">
                                    <p>
                                        Hey buddy! This is Nano. How can I help
                                        you?
                                    </p>
                                    <ul>
                                        {FAQ.map((faqList) => (
                                            <li
                                                key={faqList.id}
                                                className="text-primary cursor-pointer hover:underline"
                                                onClick={() =>
                                                    handleQuestionClick(faqList)
                                                }
                                            >
                                                • {faqList.question}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {chatHistory.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-2 items-center ${
                                        chat.sender === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    {chat.sender === "user" ? (
                                        <>
                                            <div className="text-sm p-2 bg-customBlue max-w-96 border border-gray-300 rounded-lg">
                                                {chat.message}
                                            </div>

                                            <div className=" flex justify-center items-center">
                                                <User className="text-black" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className=" flex justify-center items-center">
                                                <Bot className="text-black" />
                                            </div>

                                            <div
                                                onClick={
                                                    chat.message ===
                                                    againQuestion
                                                        ? handleAskAnotherQuestion
                                                        : ""
                                                }
                                                className={`text-sm p-2 ${
                                                    chat.message ===
                                                    againQuestion
                                                        ? "text-primary cursor-pointer"
                                                        : ""
                                                } bg-slate-100 max-w-96 border border-gray-300 rounded-lg`}
                                            >
                                                {chat.message}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-0 right-0 left-0 py-2">
                        <Separator />
                        <div className="mt-2 px-4 flex items-center gap-2">
                            <div className="bg-gray-50 text-center px-2 text-gray-600 font-medium w-full p-1 rounded text-sm cursor-not-allowed">
                                Ask Question
                            </div>
                            <Send className="text-primary h-5 cursor-not-allowed" />
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`avatar space-y-2 ${!show ? "animate-bounce" : ""}`}
            >
                {isVisible && (
                    <div className="bg-primary shadow-lg text-sm p-2 text-white rounded rounded-br-none">
                        Chat with me?
                    </div>
                )}
                <div className="flex justify-end" onClick={handleChatBot}>
                    <div className="w-14 h-14 shadow-lg cursor-pointer rounded-full left-0 flex justify-center items-center bg-primary">
                        <BotMessageSquare className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
