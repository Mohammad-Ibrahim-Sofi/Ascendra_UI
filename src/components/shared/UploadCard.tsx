import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UploadCard({
  uploaded,
  fileName,
  fileSize,
  onUpload,
  className,
}: {
  uploaded?: boolean;
  fileName?: string;
  fileSize?: string;
  onUpload?: () => void;
  className?: string;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); onUpload?.(); }}
      className={cn(
        'relative overflow-hidden rounded-xl border-2 border-dashed bg-card p-10 text-center transition-all duration-200',
        dragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-subtle hover:border-primary/40',
        className
      )}
    >
      <input
        type="file"
        id="resume-upload"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={onUpload}
      />
      <label htmlFor="resume-upload" className="cursor-pointer">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-2xl transition-colors',
              uploaded ? 'bg-success/10 text-success' : dragOver ? 'bg-primary/15 text-primary' : 'bg-primary/10 text-primary'
            )}
          >
            <AnimatePresence mode="wait">
              {uploaded ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Check className="h-7 w-7" />
                </motion.div>
              ) : (
                <motion.div key="upload" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <UploadCloud className="h-7 w-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {uploaded ? (
            <>
              <div>
                <p className="font-medium text-foreground">{fileName || 'Resume uploaded'}</p>
                {fileSize && <p className="text-sm text-muted-foreground mt-0.5">{fileSize}</p>}
              </div>
              <p className="text-xs text-muted-foreground">Click to replace</p>
            </>
          ) : (
            <>
              <div>
                <p className="font-medium text-foreground">
                  {dragOver ? 'Drop to upload' : 'Drop your resume here'}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">or click to browse — PDF, DOC, DOCX</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileText className="h-3.5 w-3.5" />
                Max 5MB
              </div>
            </>
          )}
        </div>
      </label>
    </motion.div>
  );
}
