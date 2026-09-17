/**
 * Ultra-fast Zero-Dependency Syntax Highlighting Tokenizer
 * Formats JS, TS, JSX, HTML, and PHP/Blade into colored HTML spans.
 */
(function(global) {
  'use strict';

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function highlight(code) {
    if (!code) return '';

    const escaped = escapeHtml(code);

    // Single-pass token regex to avoid corrupting generated span markup
    const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|&lt;!--[\s\S]*?--&gt;)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(&lt;\/?[a-zA-Z0-9_-]+)|(\b(?:import|export|from|default|const|let|var|function|return|class|extends|new|if|else|for|while|switch|case|async|await|try|catch|throw|typeof|instanceof|interface|type|public|private|static|readonly)\b)|(\b(?:true|false|null|undefined|NaN)\b)|(\b[a-zA-Z0-9_$]+(?=\())|(\b\d+\b)/g;

    return escaped.replace(tokenRegex, (match, comment, string, tag, keyword, bool, fn, num) => {
      if (comment) return `<span class="token-comment">${comment}</span>`;
      if (string) return `<span class="token-string">${string}</span>`;
      if (tag) return `<span class="token-tag">${tag}</span>`;
      if (keyword) return `<span class="token-keyword">${keyword}</span>`;
      if (bool) return `<span class="token-boolean">${bool}</span>`;
      if (fn) return `<span class="token-function">${fn}</span>`;
      if (num) return `<span class="token-number">${num}</span>`;
      return match;
    });
  }

  global.SyntaxHighlighter = { highlight };
})(typeof window !== 'undefined' ? window : globalThis);
