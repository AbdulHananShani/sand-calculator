// ============================================================
// FILE: src/components/FaqSection.js
// PURPOSE: Interactive FAQ accordion section shown below
//          blog posts. Each FAQ item opens/closes on click.
//          Includes FAQ JSON-LD schema for Google rich results.
// PLACEMENT: src/components/FaqSection.js (New File)
// ============================================================

'use client';

import { useState } from 'react';

// ── Single FAQ Item with accordion ───────────────────────────
function FaqItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-glass overflow-hidden">

      {/* Question button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-all duration-200 group"
        aria-expanded={isOpen}
      >
        {/* Question number + text */}
        <div className="flex items-start gap-3 pr-4">
          <span className="w-6 h-6 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {index + 1}
          </span>
          <span className="text-white font-semibold text-sm leading-relaxed group-hover:text-primary-300 transition-colors">
            {faq.question}
          </span>
        </div>

        {/* Toggle icon */}
        <span
          className={`text-primary-400 text-2xl font-light flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
        >
          +
        </span>
      </button>

      {/* Answer — shown when open */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 border-t border-gray-700/50 pt-4 pl-14">
          <p className="text-gray-400 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>

    </div>
  );
}

// ── FaqSection Component ──────────────────────────────────────
// Props:
//   faqs — array of {question, answer} objects
//   postTitle — used in schema markup
export default function FaqSection({ faqs, postTitle }) {

  if (!faqs || faqs.length === 0) return null;

  // ── FAQ JSON-LD Schema for Google rich results ────────────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mt-8">

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent-500/20 border border-accent-500/30 flex items-center justify-center flex-shrink-0">
          <span className="text-accent-400 text-lg font-black">?</span>
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            {faqs.length} question{faqs.length !== 1 ? 's' : ''} answered
          </p>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            faq={faq}
            index={index}
          />
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-gray-700 text-xs text-center mt-6">
        Have more questions? Use our free sand calculators for instant answers.
      </p>

    </div>
  );
}