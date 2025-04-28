'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence, MotionValue } from 'framer-motion';
import { CodeBlock } from '../ui/code-block';

const INITIAL_CODE = `const ApplicantTracker = () => {
  const [applicants, setApplicants] = React.useState(0);

  const handleAddApplicant = () => {
    setApplicants(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xs sm:text-xl font-bold mb-4">Applicant Tracker</h2>
      <p className="mb-2">Loading applicant data...</p>
      <button className="px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed">
        Track New Applicant
      </button>
    </div>
  );
};`;

interface CodeBlockDemoProps {
  scrollProgress?: MotionValue<number>;
}

export function CodeBlockDemo({ scrollProgress }: CodeBlockDemoProps) {
  const codeRef = useRef(null);
  const isInView = useInView(codeRef, { once: false, amount: 0.2 });
  const [codeContent, setCodeContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationStarted = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const editOperations = useCallback(
    () => [
      {
        find: '  const [applicants, setApplicants] = React.useState(0);\n\n  const handleAddApplicant = () => {\n    setApplicants(prev => prev + 1);\n  };',
        replace:
          '  const [applicants, setApplicants] = React.useState(0);\n\n  const handleAddApplicant = () => {\n    setApplicants(prev => prev + 1);\n  };',
        line: 1,
        delay: 35,
      },
      {
        find: '      <p className="mb-2">Loading applicant data...</p>',
        replace: '      <p className="mb-2">Total Applicants: {applicants}</p>',
        line: 6,
        delay: 40,
      },
      {
        find: '      <button className="px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed">',
        replace:
          '      <button \n        onClick={handleAddApplicant}\n        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">',
        line: 7,
        delay: 30,
      },
    ],
    [],
  );

  useEffect(() => {
    setCodeContent(INITIAL_CODE);
  }, []);

  useEffect(() => {
    if (isInView && !animationStarted.current) {
      animationStarted.current = true;

      const timer = setTimeout(() => {
        setIsTyping(true);
        setCurrentOperation(0);
      }, 800);

      return () => clearTimeout(timer);
    }

    if (!isInView && !scrollProgress) {
      animationStarted.current = false;
      setCurrentOperation(null);
      setIsTyping(false);
    }
  }, [isInView, scrollProgress]);

  useEffect(() => {
    if (!isTyping || currentOperation === null) return;

    const operations = editOperations();
    if (currentOperation >= operations.length) {
      setIsTyping(false);
      return;
    }

    const currentOp = operations[currentOperation];
    const findIndex = codeContent.indexOf(currentOp.find);

    if (findIndex === -1) {
      setCurrentOperation((prev) => (prev !== null ? prev + 1 : null));
      return;
    }

    const newContent = codeContent.replace(currentOp.find, currentOp.replace);

    const timer = setTimeout(() => {
      setCodeContent(newContent);
      setTimeout(() => {
        setCurrentOperation((prev) => (prev !== null ? prev + 1 : null));
      }, 800);
    }, currentOp.delay * 20);

    return () => clearTimeout(timer);
  }, [isTyping, currentOperation, codeContent, editOperations]);

  const getHighlightLines = useCallback(() => {
    if (currentOperation === null || !isTyping) return [];
    const operations = editOperations();
    if (currentOperation >= operations.length) return [];
    return [operations[currentOperation].line];
  }, [currentOperation, isTyping, editOperations]);

  const lineHeight = isMobile ? 20 : 24;

  return (
    <div className="w-full" ref={codeRef}>
      <motion.div
        className="w-full overflow-hidden rounded-2xl shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        <div className="relative max-sm:h-[330px]">
          <div
            className="code-block-container transition-all duration-300"
            style={{
              fontSize: isMobile ? '12px' : '14px',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <CodeBlock
              language="jsx"
              filename="ApplicantTracker.jsx"
              highlightLines={getHighlightLines()}
              code={codeContent}
            />
          </div>

          <AnimatePresence>
            {isTyping && currentOperation !== null && (
              <motion.div
                className="pointer-events-none absolute right-0 left-0 bg-blue-500/5"
                style={{
                  top: `calc(${editOperations()[Math.min(currentOperation, editOperations().length - 1)].line * lineHeight}px + 8px)`,
                  height: `${lineHeight}px`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
