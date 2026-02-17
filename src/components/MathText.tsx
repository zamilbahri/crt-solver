/**
 * Math Component
 *
 * Provides a KaTeX-powered component for rendering mathematical expressions.
 * Supports both inline and display (block) mode rendering with optional custom styling.
 */

import React from 'react';
import katex from 'katex';

/**
 * Props for the MathText component
 *
 * @interface MathProps
 * @property {string} children - LaTeX math expression to render using KaTeX
 * @property {boolean} [block=false] - Whether to render in display mode (block/centered) or inline mode. Default is false
 * @property {string} [className=''] - Optional Tailwind CSS class names for styling the rendered math output
 */
export interface MathProps {
  children: string;
  block?: boolean;
  className?: string;
}

/**
 * Renders a LaTeX math expression using KaTeX.
 *
 * Converts LaTeX math strings to rendered HTML using the KaTeX library,
 * with support for both inline and display (block) rendering modes.
 * Errors in LaTeX expressions are gracefully handled.
 *
 * @param {MathProps} props - The component props
 *
 * @example
 * // Inline math expression
 * <MathText>a^n \\bmod m</MathText>
 *
 * @example
 * // Display mode (centered block)
 * <MathText block>a^n \\equiv {result} \\pmod{m}</MathText>
 *
 * @example
 * // With custom styling
 * <MathText className="text-lg text-purple-400">2^{23}</MathText>
 */
const MathText: React.FC<MathProps> = ({
  children,
  block = false,
  className = '',
}: MathProps) => {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: block,
  });

  return (
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default MathText;
