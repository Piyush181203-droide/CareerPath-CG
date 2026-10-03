import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  User, 
  ArrowRight, 
  Compass, 
  Copy, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

export const AIChatView: React.FC = () => {
  const { currentUser, setActiveTab } = useApp();

  const initialGreeting: ChatMessage = {
    id: 'msg-initial',
    sender: 'assistant',
    content: `Hello! I'm **CareerPath AI**, your personal career and higher education counselor.

Tell me about your current education, interests, or career goal, and I'll help you plan your next steps, suitable courses, entrance examinations, and scholarships.

You can ask me in **English**, **Hindi (हिंदी)**, or **Hinglish**!`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedFollowUps: [
      'What can I do after 10th?',
      'How can I become a doctor?',
      'What are the best options after 12th Science?',
      'How can I become a software engineer?',
      'What government career options are available?',
      'Which course is suitable for me?'
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('careerpath_chat');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [initialGreeting];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('careerpath_chat', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorNotice(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentProfile: currentUser?.profile,
          conversationHistory: newHistory,
          userQuestion: text
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: data.reply || "I couldn't process that query. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: data.suggestedFollowUps || [
          'What are the entrance exams for this?',
          'Tell me about scholarships available.',
          'What alternative paths can I consider?'
        ],
        relatedCareerId: data.relatedCareerId
      };

      setMessages([...newHistory, aiMsg]);
    } catch (err: any) {
      console.warn('AI chat error, using graceful local response:', err);
      // Graceful local counselor response fallback
      const fallbackReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: `### 🎯 Career Guidance Recommendation\n\nThank you for asking about **"${text}"**.\n\n* **Primary Pathway:** Complete your Class 11-12 with relevant subject combinations.\n* **Key Exams:** Research national examinations such as JEE Main, NEET, CUET UG, or CLAT depending on your discipline.\n* **Next Step:** Explore our interactive Career Explorer and build your personalized roadmap in the Student Wizard.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'Show me entrance exam dates',
          'Which scholarships can I apply for?',
          'Compare science vs commerce'
        ]
      };
      setMessages([...newHistory, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear all conversation history?')) {
      setMessages([initialGreeting]);
      localStorage.removeItem('careerpath_chat');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-800">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // H3 Heading ###
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-base font-bold text-slate-900 font-display mt-3 mb-1 text-[#0D9488]">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }

          // H2 Heading ##
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-lg font-bold text-slate-900 font-display mt-4 mb-2 text-[#0284C7]">
                {trimmed.replace('## ', '')}
              </h2>
            );
          }

          // Bullet points
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const itemText = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-[#0D9488] font-bold">•</span>
                <span>{renderInlineMarkdown(itemText)}</span>
              </div>
            );
          }

          // Numbered list
          if (/^\d+\.\s/.test(trimmed)) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="font-bold text-[#0284C7] font-mono text-xs">
                  {trimmed.match(/^\d+\./)?.[0]}
                </span>
                <span>{renderInlineMarkdown(trimmed.replace(/^\d+\.\s*/, ''))}</span>
              </div>
            );
          }

          // Blank line
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Standard paragraph
          return <p key={idx}>{renderInlineMarkdown(trimmed)}</p>;
        })}
      </div>
    );
  };

  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-emerald-50 border border-emerald-200 px-1 py-0.5 rounded font-mono text-[11px] text-[#065F46]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-5rem)] flex flex-col text-slate-800">
      
      {/* Chat Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-emerald-100 px-6 py-4 flex items-center justify-between flex-shrink-0 mb-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0D9488] flex items-center justify-center text-white shadow-xs font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 font-display">
                CareerPath AI
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 border border-emerald-200 text-[#0F766E]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Active Counselor
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Glass × AI Career Guidance · English · हिंदी · Hinglish
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer text-xs flex items-center gap-1 border border-slate-200"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-5 px-1 py-2 pr-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div 
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-2xs ${
                  isUser 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-[#0D9488] text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div className={`space-y-2 max-w-[85%] sm:max-w-[75%]`}>
                
                <div
                  className={`p-4 sm:p-5 rounded-2xl shadow-xs ${
                    isUser
                      ? 'bg-[#0090A8] text-white rounded-tr-none shadow-teal-900/5'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none'
                  }`}
                >
                  {isUser ? (
                    <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-normal">
                      {msg.content}
                    </p>
                  ) : (
                    renderFormattedMarkdown(msg.content)
                  )}

                  {/* Bubble timestamp & copy button */}
                  <div className={`mt-2 pt-2 flex items-center justify-between text-[10px] ${
                    isUser ? 'text-teal-100 border-t border-white/15' : 'text-slate-400 border-t border-slate-100'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-[#0D9488] flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#0D9488]" />
                            <span className="text-[#0D9488]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Related Quick Links from AI response */}
                {msg.relatedCareerId && (
                  <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-xs">
                    <span className="text-[#0F766E] font-semibold flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
                      View Related Visual Roadmap
                    </span>
                    <button
                      onClick={() => setActiveTab('careers')}
                      className="px-3 py-1 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Suggested Follow-up Questions Chips */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Suggested Next Questions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-xs bg-white hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-[#0D9488] px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs transition-all text-left cursor-pointer font-medium"
                        >
                          💬 {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {/* Typing Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0D9488] text-white flex items-center justify-center text-xs flex-shrink-0 font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-slate-500 ml-2">CareerPath AI is reasoning...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="flex-shrink-0 pt-3">
        {errorNotice && (
          <div className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorNotice}</span>
          </div>
        )}

        <div className="relative bg-white border border-slate-300 focus-within:border-[#0D9488] focus-within:ring-2 focus-within:ring-teal-500/15 shadow-sm rounded-2xl p-2.5 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask CareerPath AI anything (e.g. 'What can I do after 10th?', 'How to crack NEET?')..."
            className="w-full resize-none px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none max-h-32"
          />

          <button
            type="button"
            disabled={!inputValue.trim() || isLoading}
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex-shrink-0 shadow-2xs font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-500 mt-2 font-normal">
          CareerPath AI assists with academic discovery. Verify official deadlines with examination bodies.
        </p>
      </div>

    </div>
  );
};
