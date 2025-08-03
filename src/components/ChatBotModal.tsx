import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { Bot, X, SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import type { ChatMessage } from "../types/chat";
import TypingLoader from "./TypingLoader.tsx";
import Markdown from "react-markdown";
import { API_BASE } from "../config";

const ChatBotModal = () => {
  const { token } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };

    const userMessagesCount = messages.filter((m) => m.role === "user").length;
    if (userMessagesCount >= 20) {
      toast.error(
        "You have reached the maximum number of messages for today, please try again tomorrow."
      );
      return;
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/Chat/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch response from the bot"
        );
      }

      const data = await response.json();
      const botMessage: ChatMessage = { role: "bot", content: data.response };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(
          "An unexpected error occurred while fetching the bot response."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-purple-800 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 z-50 transition-colors duration-300 ease-in-out"
        title="Open chat"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Bot size={24} />
      </motion.button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-end justify-end p-6">
            <Dialog.Panel className="w-full max-w-sm rounded-xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-xl border border-white/10 p-4 shadow-xl flex flex-col h-[500px]">
              <div className="flex justify-between items-center mb-2">
                <Dialog.Title className="text-lg font-semibold text-white">
                  AI Assistant
                </Dialog.Title>
                <button onClick={toggleModal}>
                  <X className="text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="flex-1 border border-white/10 rounded p-2 overflow-y-auto mb-2 space-y-2">
                {messages.length === 0 && (
                  <p className="text-sm text-gray-400">
                    Hello! I'm your healthy habits assistant. I can help with
                    advice on exercise, nutrition, rest, hydration, or overall
                    well-being. How would you like to improve today?
                  </p>
                )}

                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-end gap-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "bot" && (
                      <div className="bg-purple-700 text-white rounded-full p-1">
                        <Bot size={16} />
                      </div>
                    )}
                    <div
                      className={`p-2 rounded-xl max-w-[80%] text-sm shadow-md ${
                        msg.role === "user"
                          ? "bg-purple-700 text-white self-end ml-12"
                          : "bg-white/10 backdrop-blur-md text-gray-200 border border-white/10 self-start mr-12"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <Markdown>{msg.content}</Markdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 self-start mr-12">
                    <div className="bg-purple-700 text-white rounded-full p-1">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white/10 backdrop-blur-md text-gray-200 p-2 rounded-xl border border-white/10">
                      <TypingLoader />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2 mt-auto">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-white/10 backdrop-blur-md text-white placeholder:text-gray-400 border border-white/10 px-3 py-2 rounded-full focus:outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800 flex items-center gap-1 disabled:opacity-50"
                  disabled={loading}
                >
                  <SendHorizonal size={16} />
                  Send
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChatBotModal;
