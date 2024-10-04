// evil-extension/page.js

// Function to replace the correct instances with incorrect ones
function replaceWords(node) {
  if (node.nodeType === Node.TEXT_NODE) {
      const originalText = node.textContent;
      const modifiedText = originalText
          .replace(/\bthere\b/gi, 'their')  // Replace "there" with "their"
          .replace(/\btheir\b/gi, 'they\'re')  // Replace "their" with "they're"
          .replace(/\bthey\'re\b/gi, 'there');  // Replace "they're" with "there"

      if (originalText !== modifiedText) {
          node.textContent = modifiedText;
      }
  } else {
      // Recursively handle child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
          replaceWords(node.childNodes[i]);
      }
  }
}

// Apply the replacement after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  replaceWords(document.body);
});