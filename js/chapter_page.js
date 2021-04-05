const chapterFrame = document.querySelector('.chapter-frame');
const getChapterEndpoint = localStorage.getItem('chapter');

chapterFrame.innerHTML = `<div class="load-bar"></div>`
fetch(`https://mangamint.kaedenoki.net/api/chapter/${getChapterEndpoint}`)
    .then(response => response.json())
    .then(data => {
        const chapterImage = data.chapter_image;
        const chapterImageLink = chapterImage.map(data => {
            return `<img src="${data.chapter_image_link}" >`;
        }).join('')
        chapterFrame.innerHTML = chapterImageLink;



        if(data.chapter_pages == 0){
            location.reload();
        }
    });