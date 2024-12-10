document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.getElementById("title");
    const artistElement = document.getElementById("artist");
    const textElement = document.getElementById("text");
    const audioElement = document.getElementById("audio");

    fetch("pages.json")
        .then(response => response.json())
        .then(data => {
            let currentIndex = 0;

            function updateContent() {
                const page = data[currentIndex];
                titleElement.textContent = page.title;
                artistElement.textContent = `Artist: ${page.artist}`;
                textElement.textContent = page.text;
                audioElement.src = page.audio;
                audioElement.play();
            }

            // 显示初始内容
            updateContent();

            // 添加键盘导航功能
            document.addEventListener("keydown", (event) => {
                if (event.key === "ArrowRight") {
                    currentIndex = (currentIndex + 1) % data.length;
                    updateContent();
                } else if (event.key === "ArrowLeft") {
                    currentIndex = (currentIndex - 1 + data.length) % data.length;
                    updateContent();
                }
            });
        })
        .catch(error => console.error("Error loading pages.json:", error));
});
