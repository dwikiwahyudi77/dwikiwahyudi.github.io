const cardWrapper = document.querySelector(".card-wrapper");
const genreWrapper = document.querySelector(".gendre-list");
const sinopsisEle = document.querySelector(".sinopsis");
const chapterWrapper = document.querySelector(".chapter-box");

const getEndpoint = localStorage.getItem("endpoint");
console.log(getEndpoint);

fetch("https://mangamint.kaedenoki.net/api/manga/detail/" + getEndpoint)
    .then((response) => response.json())
    .then((response) => {
        if (response.title == "") {
            window.location.reload();
        }
        // Get Genre List
        const genreData = response.genre_list;
        const genreList = genreData.map((data) => {
            return data;
        });
        const genreEle = genreList
            .map((m) => {
                return `<a class="gendre">${m.genre_name}</a>`;
            })
            .join("");
        genreWrapper.innerHTML = genreEle;

        // Get Synopsis
        const titleSinopsis = document.querySelector(".title-sinopsis");
        titleSinopsis.innerHTML = `Sinopsis ${response.type} ${response.title}`;
        const sinopsis = response.synopsis;
        sinopsisEle.innerHTML = sinopsis;

        // Get Chapter List
        const chapterData = response.chapter;
        const chapterList = chapterData.map((data) => {
            return data;
        });

        let chapterListRever = chapterList.reverse();
        const chapterEle = chapterListRever
            .map((data, i) => {
                // 
                const chapterName = data.chapter_endpoint;
                const chapterAngka = [];
                for(let i = 0; i < chapterName.length; i++){
                        if (
                    chapterName[i] == 0 ||
                    chapterName[i] == 1 ||
                    chapterName[i] == 2 ||
                    chapterName[i] == 3 ||
                    chapterName[i] == 4 ||
                    chapterName[i] == 5 ||
                    chapterName[i] == 6 ||
                    chapterName[i] == 7 ||
                    chapterName[i] == 8 ||
                    chapterName[i] == 9 ||
                    chapterName[i] == '.'
                ) {
                    chapterAngka.push(chapterName[i]);
                }
                }
                // 
                return `<a class="chapter-data" href="chapter_page.html"
                            data-endpoint="${data.chapter_endpoint}">Chapter ${chapterAngka.join('')}
                        </a>`;
            })
            // .join("");
            chapterWrapper.innerHTML = chapterEle.join('');
        
        const detail = response;
        const detailData = `<div class="card">
                                <div class="card-image">
                                    <p class="chapter">${detail.chapter.length} Chapter</p>
                                    <img src="${detail.thumb}" alt="">
                                </div>
                                <div class="card-content">
                                    <p class="title">${detail.title}</p>
                                    <p class="type">Type: ${detail.type}</p>
                                    <p class="author">Status: ${detail.status}</p>
                                    <p class="author">Author: ${detail.author}</p>
                                </div>
                            </div>`;
        cardWrapper.innerHTML = detailData;
    });

document.addEventListener("click", function (e) {
    if (e.target.parentElement.className == "chapter-box") {
        localStorage.setItem("chapter", e.target.dataset.endpoint);
        window.location.reload();
    } else {
        // console.log("salah");
    }
});

const backBtn = document.querySelector('.back-btn');

backBtn.addEventListener('click', function(){
    history.back();
})


const link = document.getElementsByClassName('chapter-data');

setTimeout(() => {
    for(let i = 0; i < link.length; i++){
        if(link[i].dataset.endpoint == localStorage.getItem('chapter')){
            link[i].innerHTML = 'Terakhir dibaca';
            link[i].style.backgroundColor = '#3498db50';
            link[i].style.color = '#fff';

        }
    }
}, 2000)