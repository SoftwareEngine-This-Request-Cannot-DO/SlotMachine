function showText() {
    // 取得輸入框中的文字
    var input = document.getElementById('inputText').value;
  
    // 取得要顯示文字的元素
    var outputElement = document.getElementById('outputText');
  
    // 將輸入的文字顯示在指定的 HTML 元素上
    outputElement.innerText = outputElement.innerText + input;
  }
  