import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function FormattedMarkdown({ content, className = '' }) {
  if (!content) return null;

  return (
    <div className={`formatted-markdown text-left ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-3.5 mb-2 font-heading pb-1 border-b border-slate-100" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-3 mb-1.5 font-heading" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 mt-2.5 mb-1 font-heading" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xs font-bold text-slate-800 mt-2 mb-1 font-heading" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2.5 last:mb-0" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-outside space-y-1.5 my-2.5 pl-4 text-xs sm:text-sm text-slate-700 marker:text-blue-600" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-outside space-y-1.5 my-2.5 pl-4 text-xs sm:text-sm text-slate-700 marker:text-blue-600 font-medium" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed pl-0.5 text-slate-700 font-normal" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-slate-900" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-slate-800" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-3 border-blue-500 bg-blue-50/70 px-3.5 py-2 rounded-r-xl my-2.5 text-xs text-blue-950 italic" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors break-words"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs text-left border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-slate-100 text-slate-800 font-semibold" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="p-2 border-b border-slate-200 font-bold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="p-2 border-b border-slate-100 text-slate-600" {...props} />
          ),
          pre: ({ node, ...props }) => (
            <pre className="bg-slate-950 text-slate-100 p-3 rounded-xl overflow-x-auto text-xs my-2.5 font-mono border border-slate-800" {...props} />
          ),
          code: ({ node, className, children, ...props }) => {
            const isMultiline = String(children).includes('\n');
            if (isMultiline) {
              return (
                <code className={`block font-mono text-xs text-sky-300 ${className || ''}`} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded font-mono text-[11px] font-semibold" {...props}>
                {children}
              </code>
            );
          },
          hr: () => <hr className="my-3 border-slate-200" />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
