let currentPage = 0;

// 从 JSON 文件加载页面数据
fetch('pages.json')
    .then(response => response.json())
    .then(data => {
        const pages = data.pages;
        const textElement = document.getElementById('text');
        const audioElement = document.getElementById('audio');

        function updatePage(index) {
            if (index >= 0 && index < pages.length) {
                currentPage = index;
                textElement.textContent = pages[index].text;
                audioElement.src = pages[index].audio;
            }
        }

        // 初始化页面
        updatePage(currentPage);

        // 添加键盘事件监听
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                updatePage(currentPage + 1);
            } else if (event.key === 'ArrowLeft') {
                updatePage(currentPage - 1);
            }
        });
    });
