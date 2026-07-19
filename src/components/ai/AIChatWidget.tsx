"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAIChat } from "@/hooks/useAI";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Bot,
  User,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What should I look for when buying a used car?",
  "How do I determine a fair price for my car?",
  "What's the difference between hybrid and plug-in hybrid?",
  "Tips for selling a luxury car?",
  "What maintenance records should I keep?",
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AutoBazaar assistant. Ask me anything about cars, buying, selling, or the marketplace.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingRef = useRef("");

  const chat = useAIChat();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  async function handleSend(message: string) {
    if (!message.trim() || chat.isPending) return;

    const userMsg: Message = { role: "user", content: message.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    streamingRef.current = "";
    setStreamingText("");

    const history = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    try {
      await chat.mutateAsync({
        message: message.trim(),
        history,
        onChunk: (text) => {
          streamingRef.current += text;
          setStreamingText(streamingRef.current);
        },
        onDone: () => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant" as const, content: streamingRef.current },
          ]);
          setStreamingText("");
          streamingRef.current = "";
        },
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      setStreamingText("");
    }
  }

  return (
    <>
      {/* Bubble button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer"
        aria-label="Open AI chat"
      >
        <MessageSquare className="size-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
              onClick={() => setOpen(false)}
            />

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed bottom-24 right-6 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl sm:bottom-28"
              style={{ height: "520px" }}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                    <Bot className="size-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold">AI Assistant</span>
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      Online
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-7 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-hover)]"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${
                        msg.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center rounded-xl ${
                          msg.role === "user"
                            ? "bg-[var(--accent)]/10"
                            : "bg-[var(--surface-secondary)]"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="size-3.5 text-[var(--accent)]" />
                        ) : (
                          <Bot className="size-3.5 text-[var(--muted)]" />
                        )}
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                            : "bg-[var(--surface-secondary)]"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {/* Streaming message */}
                  {streamingText && (
                    <div className="flex gap-2.5">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                        <Bot className="size-3.5 text-[var(--muted)]" />
                      </div>
                      <div className="max-w-[85%] rounded-2xl bg-[var(--surface-secondary)] px-3.5 py-2.5 text-sm leading-relaxed">
                        {streamingText}
                        <span className="ml-0.5 inline-block size-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {messages.length === 1 && !streamingText && (
                    <div className="pt-2">
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                        Try asking
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSend(s)}
                            className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] text-[var(--muted)] transition-colors hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="shrink-0 border-t border-[var(--border)] p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about cars..."
                    disabled={chat.isPending}
                    className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || chat.isPending}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {chat.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
