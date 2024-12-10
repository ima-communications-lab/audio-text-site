// 当前索引
let currentIndex = 0;
// 数据存储
let contentData = [];

// 加载 JSON 数据
fetch('./assets/data/content.json')
    .then(response => response.json())
    .then(data => {
        contentData = data;
        loadContent(); // 加载初始内容
    })
    .catch(err => console.error('Error loading JSON:', err));

// 加载内容到页面
function loadContent() {
    if (contentData.length === 0) return;

    const currentItem = contentData[currentIndex];

    // 更新标题
    const titleElement = document.getElementById('title');
    titleElement.textContent = currentItem.title;

    // 更新描述
    const descriptionElement = document.getElementById('description');
    descriptionElement.innerHTML = `
    <p><strong>Artist:</strong> ${currentItem.artist}</p>
    <p>${currentItem.text}</p>
  `;

    // 更新音频
    const audioElement = document.getElementById('audio-player');
    audioElement.src = `./assets/audio/${currentItem.audio}`;
    audioElement.load();
}

// 切换内容
function switchContent(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = contentData.length - 1;
    if (currentIndex >= contentData.length) currentIndex = 0;
    loadContent();
}

// 键盘事件监听
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
        switchContent(1); // 下一个
    } else if (event.key === 'ArrowLeft') {
        switchContent(-1); // 上一个
    }
});
