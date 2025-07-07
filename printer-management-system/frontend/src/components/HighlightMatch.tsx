'use client';

import React from 'react';

interface HighlightMatchProps {
  text: string;
  highlight: string;
}

export function HighlightMatch({ text, highlight }: HighlightMatchProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-300 text-black px-0.5 rounded-sm">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}