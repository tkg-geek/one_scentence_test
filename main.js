document.addEventListener("DOMContentLoaded", function () {
  const inputContainer = document.getElementById("input-container");
  const addButton = document.getElementById("add");
  const resetButton = document.getElementById("reset");
  const saveButton = document.getElementById("save");

  // 初期状態のテキストエリアを追加
  function createTextArea() {
      const textAreaWrapper = document.createElement("div");
      textAreaWrapper.classList.add("cp_iptxt");

      const input = document.createElement("input");
      input.type = "text";
      input.classList.add("ef");
      input.placeholder = ""; // プレースホルダーを空に

      const focusLine = document.createElement("span");
      focusLine.classList.add("focus_line");

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-btn");
      removeButton.setAttribute("aria-label", "Remove");
      removeButton.innerHTML = '<i class="fas fa-times"></i>';

      removeButton.onclick = function () {
          if (inputContainer.children.length > 1) {
              inputContainer.removeChild(textAreaWrapper);
          }
      };

      textAreaWrapper.appendChild(input);
      textAreaWrapper.appendChild(focusLine);
      textAreaWrapper.appendChild(removeButton);
      inputContainer.appendChild(textAreaWrapper);
  }

  createTextArea(); // 初期テキストエリアの作成

  // +ボタンでテキストエリアを追加
  addButton.onclick = createTextArea;

  // リセットボタン
  resetButton.onclick = function () {
      while (inputContainer.firstChild) {
          inputContainer.removeChild(inputContainer.firstChild);
      }
      createTextArea(); // 最初のテキストエリアを再作成
  };

  // フルスクリーン表示ボタン
  saveButton.onclick = function () {
      const textAreas = Array.from(inputContainer.querySelectorAll("input[type='text']"));
      let currentTextIndex = 0;

      const showFullScreenText = () => {
          const fullScreenText = textAreas[currentTextIndex]?.value;
          if (fullScreenText) {
              const fullScreenDiv = document.createElement("div");
              fullScreenDiv.classList.add("fullscreen");
              fullScreenDiv.innerHTML = `<div class="fullscreen-text">${fullScreenText}</div>`;
              
              // フルスクリーン表示をリクエスト
              document.body.appendChild(fullScreenDiv);
              fullScreenDiv.requestFullscreen();

              fullScreenDiv.onclick = function () {
                  // 次のテキストがある場合、インデックスを進めて次のテキストを表示
                  currentTextIndex++;
                  if (currentTextIndex < textAreas.length) {
                      const nextText = textAreas[currentTextIndex]?.value;
                      if (nextText) {
                          fullScreenDiv.innerHTML = `<div class="fullscreen-text">${nextText}</div>`;
                      } else {
                          // 次のテキストが空の場合、フルスクリーンを閉じる
                          document.exitFullscreen();
                          document.body.removeChild(fullScreenDiv);
                      }
                  } else {
                      // 全てのテキストを表示した場合、フルスクリーンを閉じる
                      document.exitFullscreen();
                      document.body.removeChild(fullScreenDiv);
                  }
              };
          }
      };

      // 初回のテキストを表示
      showFullScreenText();
  };
});
