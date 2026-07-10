import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

export function ChatBubble({ message, typing = false }: { message: ChatMessage; typing?: boolean }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex gap-3', isUser && 'flex-row-reverse')}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          isUser ? 'bg-primary/15 text-primary' : 'bg-gradient-blue text-white'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={cn('max-w-[75%]', isUser && 'text-right')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-sm'
              : 'bg-card border border-subtle text-foreground rounded-tl-sm'
          )}
        >
          {typing ? (
            <div className="flex items-center gap-1.5 py-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="h-2 w-2 rounded-full bg-muted-foreground"
                />
              ))}
            </div>
          ) : (
            message.content
          )}
        </div>
        <p className="mt-1.5 px-1 text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}
