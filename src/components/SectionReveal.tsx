import React from 'react';
import { motion } from 'motion/react';
import { OrnamentalDivider } from './Decorations';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 28, className = '' }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: 'dark' | 'light';
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  tone = 'dark',
}: SectionHeadingProps) {
  const isLight = tone === 'light';
  return (
    <Reveal className="flex flex-col items-center text-center">
      {eyebrow && (
        <p
          className={`font-display text-[11px] tracking-[0.35em] uppercase ${
            isLight ? 'text-[#EFE1C6]' : 'text-[#6D588C]'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-2 px-3 font-script text-5xl leading-[1.32] sm:text-6xl ${
          isLight ? 'text-gold-gradient' : 'text-[#493B59]'
        }`}
      >
        {title}
      </h2>
      <OrnamentalDivider className="mt-3" />
      {subtitle && (
        <p
          className={`mt-4 max-w-xs font-serif text-lg leading-relaxed text-pretty italic ${
            isLight ? 'text-[#E6E0F2]' : 'text-[#493B59]/85'
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
