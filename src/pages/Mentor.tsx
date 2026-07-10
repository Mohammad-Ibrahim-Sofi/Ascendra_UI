import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Sparkles, MessageSquarePlus, History, Pin } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { ChatBubble } from '@/components/shared/ChatBubble';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { initialMessages, suggestedPrompts, mockResponses } from '@/data/chat';
import type { ChatMessage } from '@/types';

const pinnedConversations = [
  { id: 'p1', title: 'Career path guidance', time: '2h ago' },
  { id: 'p2', title: 'Resume improvement tips', time: '1d ago' },
];

const conversationHistory = [
  { id: 'c1', title: 'System design roadmap', time: '3d ago' },
  { id: 'c2', title: 'Interview preparation', time: '5d ago' },
  { id: 'c3', title: 'Opportunity matching', time: '1w ago' },
];

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('skill')) return mockResponses.skills;
  if (lower.includes('resume')) return mockResponses.resume;
  if (lower.includes('roadmap') || lower.includes('system design')) return mockResponses.roadmap;
  if (lower.includes('opportunit') || lower.includes('match')) return mockResponses.opportunities;
  if (lower.includes('interview')) return mockResponses.interview;
  return mockResponses.default;
}

export default function Mentor() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const mentorMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'mentor',
        content: getMockResponse(text),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, mentorMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">AI Career Mentor</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get personalized career guidance powered by AI
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Conversation History */}
        <Card className="hidden p-4 lg:block lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">History</h2>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="New conversation">
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            <div className="rounded-lg bg-primary/10 px-3 py-2.5 cursor-pointer">
              <p className="text-sm font-medium text-primary truncate">Current conversation</p>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
            {pinnedConversations.length > 0 && (
              <div className="pt-3">
                <div className="flex items-center gap-1.5 px-3 pb-1.5">
                  <Pin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">Pinned</span>
                </div>
                {pinnedConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="rounded-lg px-3 py-2.5 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <p className="text-sm text-foreground truncate">{conv.title}</p>
                    <p className="text-xs text-muted-foreground">{conv.time}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-3">
              <p className="px-3 pb-1.5 text-xs text-muted-foreground font-medium">Previous</p>
              {conversationHistory.map((conv) => (
                <div
                  key={conv.id}
                  className="rounded-lg px-3 py-2.5 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <p className="text-sm text-foreground truncate">{conv.title}</p>
                  <p className="text-xs text-muted-foreground">{conv.time}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Chat Interface */}
        <Card className="flex h-[600px] flex-col lg:col-span-3 shadow-card">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-subtle p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-blue">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">Ascendra Mentor</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">Online · Ready to help</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto scrollbar-thin p-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isTyping && (
              <ChatBubble
                message={{
                  id: 'typing',
                  role: 'mentor',
                  content: '',
                  timestamp: new Date().toISOString(),
                }}
                typing
              />
            )}
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 1 && (
            <div className="border-t border-subtle p-4">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-lg border border-subtle px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-subtle p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your career, skills, resume..."
                className="flex-1 rounded-lg border border-subtle bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button type="submit" variant="gradient" size="icon" disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
