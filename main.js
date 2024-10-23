"use strict";

{
  document.getElementById('reset').addEventListener('click', function() {
    const textAreas = document.querySelectorAll('.text-area');
    textAreas.forEach(textArea => textArea.value = ''); // すべてのテキストエリアを空にする
    localStorage.clear(); // localStorageをクリア

    // テキストエリアを1つだけに戻す
    const textareaContainer = document.getElementById('textarea-container');
    textareaContainer.innerHTML = ''; // コンテナをクリア
    const initialTextArea = document.createElement('textarea');
    initialTextArea.classList.add('text-area'); // クラスを追加
    textareaContainer.appendChild(initialTextArea); // 最初のテキストエリアを追加
});

document.getElementById('save').addEventListener('click', function() {
    const textAreas = document.querySelectorAll('.text-area');
    const texts = Array.from(textAreas).map(area => area.value).filter(text => text); // 入力されたテキストを取得し、空でないものだけを保存

    // localStorageに保存
    texts.forEach((text, index) => {
        localStorage.setItem(`text-${index}`, text);
    });

    // 初回のテキストをフルスクリーン表示
    currentIndex = 0; // インデックスをリセット
    showFullscreenText(currentIndex, texts);
});

// +マークのボタンの処理
document.getElementById('add').addEventListener('click', function() {
    const newTextArea = document.createElement('textarea');
    newTextArea.classList.add('text-area'); // 新しいテキストエリアにクラスを追加
    document.getElementById('textarea-container').appendChild(newTextArea); // テキストエリアを追加
});

// フルスクリーン表示するテキストを管理する変数
let currentIndex = 0;
let totalTexts = 0;

function showFullscreenText(index, texts) {
    totalTexts = texts.length;

    if (index < totalTexts) {
        const fullScreenDiv = document.createElement('div');
        fullScreenDiv.classList.add('fullscreen');

        const textSpan = document.createElement('span');
        textSpan.classList.add('fullscreen-text');
        textSpan.innerText = texts[index]; // 指定されたテキストを表示

        fullScreenDiv.appendChild(textSpan);
        document.body.appendChild(fullScreenDiv);

        // フルスクリーン表示をリクエスト
        if (fullScreenDiv.requestFullscreen) {
            fullScreenDiv.requestFullscreen();
        } else if (fullScreenDiv.mozRequestFullScreen) { // Firefox
            fullScreenDiv.mozRequestFullScreen();
        } else if (fullScreenDiv.webkitRequestFullscreen) { // Chrome, Safari and Opera
            fullScreenDiv.webkitRequestFullscreen();
        } else if (fullScreenDiv.msRequestFullscreen) { // IE/Edge
            fullScreenDiv.msRequestFullscreen();
        }

        // フルスクリーン表示の際に、次のテキストを表示するためのクリックイベントを追加
        fullScreenDiv.addEventListener('click', function() {
            currentIndex++;
            // 次のテキストを表示
            document.body.removeChild(fullScreenDiv); // 前のフルスクリーン要素を削除
            showFullscreenText(currentIndex, texts); // 次のテキストを表示
        });
    } else {
        // すべてのテキストを表示した後、元の画面に戻る
        currentIndex = 0; // インデックスをリセット
        if (document.fullscreenElement) {
            document.exitFullscreen(); // フルスクリーンを終了
        }
    }
};

// ページ読み込み時にlocalStorageをクリアし、テキストエリアを1つだけ表示
window.onload = function() {
    localStorage.clear(); // localStorageをクリア
    const textareaContainer = document.getElementById('textarea-container');
    textareaContainer.innerHTML = ''; // コンテナをクリア
    const initialTextArea = document.createElement('textarea');
    initialTextArea.classList.add('text-area'); // クラスを追加
    textareaContainer.appendChild(initialTextArea); // 最初のテキストエリアを追加
};


}
