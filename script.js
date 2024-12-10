// 当前展示的内容索引
let currentIndex = 0;
let data = [];

// 加载 JSON 文件并初始化页面内容
fetch('assets/data/content.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData; // 保存数据
        updateContent(); // 加载初始内容
    })
    .catch(error => {
        console.error('Error loading content:', error);
    });

// 更新页面内容
function updateContent() {
    if (data.length === 0) return;

    const currentItem = data[currentIndex];

    // 更新标题
    const titleElement = document.getElementById('title');
    titleElement.textContent = currentItem.title;

    // 更新描述
    const descriptionElement = document.getElementById('description');
    descriptionElement.innerHTML = `<p>Artist: ${currentItem.artist}</p><p>${currentItem.text}</p>`;

    // 更新音频
    const audioElement = document.getElementById('audio-player');
    audioElement.innerHTML = ''; // 清空之前的音频源
    const audioSource = document.createElement('source');
    audioSource.src = `assets/audio/${currentItem.audio}`;
    audioSource.type = 'audio/mp3';
    audioElement.appendChild(audioSource);

    // 重新加载音频
    audioElement.load();
}

// 监听键盘事件以切换内容
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
        // 切换到下一个
        currentIndex = (currentIndex + 1) % data.length;
        updateContent();
    } else if (event.key === 'ArrowLeft') {
        // 切换到上一个
        currentIndex = (currentIndex - 1 + data.length) % data.length;
        updateContent();
    }
});
