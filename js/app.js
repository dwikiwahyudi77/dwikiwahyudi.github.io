/* Akhir percobaan API Pertama */
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');
console.log(menu)
menuBtn.addEventListener('click', function(e){
    if(menuBtn.dataset.geser == 'yes'){
        menu.style.left = '0'
        menuBtn.dataset.geser = 'no'
    }
    else if(menuBtn.dataset.geser == 'no') {
        menu.style.left = ''
        menuBtn.dataset.geser = 'yes';
    }
    console.log(menuBtn.dataset.geser)
})

// Jumbotron Content
const jumbotron = document.querySelector(".jumbotron");

fetch("https://mangamint.kaedenoki.net/api/recommended")
    .then((response) => response.json())
    .then((response) => {
        const recom = response.manga_list;
        const jumboContent = [];
        for (let i = 0; i < 5; i++) {
            jumboContent.push(`<div class="jumbo-content">
                                    <p class="title">${recom[i].title}</p>
                                    <img class="slider-image" src="${recom[i].thumb}">
                                </div>`);
        }

        jumbotron.innerHTML = jumboContent;
    })
    .catch(
        (jumbotron.innerHTML = `  <div class="jumbo-content">
                                        <p class="title skeleton-title"></p>
                                        <img class="skeleton-bg">
                                    </div>`)
    );

// Jumbotron Content End

// Latest Upadate Content
const latestUpdate = document.querySelector(".latest-update");

fetch("https://mangamint.kaedenoki.net/api/manga/page/1")
    .then((response) => response.json())
    .then((response) => {
        const mangaList = response.manga_list;
        const card = mangaList
            .map((m) => {
                return `<a href="detail_page.html" class="card" data-mangaid="${m.endpoint}">
                            <div class="card-image">
                                <p class="chapter">${m.chapter}</p>
                                <img src="${m.thumb}" alt="Something Wrong :(">
                            </div>
                            <div class="card-content">
                                <p class="title">${m.title}</p>
                                <div class="inner-content">
                                    <p class="gendre">${m.type}</p>
                                    <p class="update">${m.updated_on} lalu</p>
                                </div>
                            </div>
                        <a/>`;
            })
            .join("");
        latestUpdate.innerHTML = card;
    })
    .catch(
        (latestUpdate.innerHTML = `<div class="card">
            <div class="card-image skeleton-bg">
                <p class="chapter skeleton-title-2"></p>
            </div>
            <div class="card-content">
                <p class="title skeleton-title"></p>
                <div class="inner-content">
                    <p class="gendre skeleton-title-2"></p>
                    <p class="update skeleton-title-3"></p>
                </div>
            </div>
        </div>`)
    );

// Latest Upadate Content End

// Top Anime Content Start
const topAnime = document.querySelector(".top-anime");

fetch("https://mangamint.kaedenoki.net/api/manga/popular/1")
    .then((response) => response.json())
    .then((response) => {
        const topAnimeList = response.manga_list;
        const topAnimes = topAnimeList
            .map((m) => {
                return `<a href="detail_page.html" class="card" data-mangaid="${m.endpoint}">
                            <div class="card-image">
                                <img src="${m.thumb}" alt="Something Wrong :(">
                            </div>
                            <div class="card-content">
                                <p class="title">${m.title}</p>
                                <div class="inner-content">
                                    <p class="gendre">${m.type}</p>
                                    <p class="update">${m.upload_on}</p>
                                </div>
                            </div>
                        </a>`;
            })
            .join("");
        topAnime.innerHTML = topAnimes;
    })
    .catch(
        (topAnime.innerHTML = `<div class="card">
                <div class="card-image skeleton-bg">
                </div>
                <div class="card-content">
                    <p class="title skeleton-title"></p>
                    <div class="inner-content">
                        <p class="gendre skeleton-title-2"></p>
                        <p class="update skeleton-title-3"></p>
                    </div>
                </div>
            </div>`)
    );

// Top Anime Content End

// Akhir dari HomePage

document.addEventListener("click", function (e) {
    if (e.target.parentElement.parentElement.className == "card") {
        let dataMangaID = e.target.parentElement.parentElement.dataset.mangaid;
        localStorage.setItem("endpoint", dataMangaID);
        window.location.reload();
    } else if (e.target.parentElement.className == "card") {
        let dataMangaID = e.target.parentElement.dataset.mangaid;
        localStorage.setItem("endpoint", dataMangaID);
        window.location.reload();
    }
});

console.log(localStorage.getItem("endpoint"));



document.addEventListener('click', function(e) {
    if(e.target.className == 'menu-link'){
        localStorage.setItem('mangaType', e.target.dataset.mangatype)
    } else {
        console.log('Bukan')
    }
})