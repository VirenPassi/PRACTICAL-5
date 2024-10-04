const wordMap = {
    "good": "decent",
    "bad": "unfavorable",
    "hello": "greetings",
    "important": "crucial",
    "yes": "indeed",
    "no": "certainly not",
    // Add more words as desired
  };
  
  // Function to replace words in the text nodes of the document
  function replaceWords(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
  
    let textNode;
    while (textNode = walker.nextNode()) {
      let content = textNode.nodeValue;
  
      // Replace words based on the wordMap
      Object.keys(wordMap).forEach(originalWord => {
        const regex = new RegExp(`\\b${originalWord}\\b`, 'gi');
        content = content.replace(regex, wordMap[originalWord]);
      });
  
      textNode.nodeValue = content;
    }
  }
  
  // Apply word replacements on page load
  replaceWords(document.body);
  