const keyword = document.querySelector(".search-keyword");
const searchBtn = document.querySelector(".search-btn");
const cardWrapper = document.querySelector(".card-wrapper");
const loadBar = document.querySelector(".loading-bar");
const findEle = document.querySelector(".find");

searchBtn.addEventListener("click", function (e) {
    if (keyword.value != "") {
        const keywordValue = keyword.value.toLowerCase();
        cardWrapper.innerHTML = `<div class="loading-bar"></div>`
        fetch("https://mangamint.kaedenoki.net/api/search/" + keywordValue)
            .then((response) => response.json())
            .then((response) => {
                const searchResult = response.manga_list;
                const result = searchResult
                    .map((m) => {
                        return `
                                <a href="detail_page.html" class="card" data-endpoint="${m.endpoint}">
                                    <div class="card-image">
                                        <img src="${m.thumb}">
                                    </div>
                                    <div class="card-content">
                                        <p class="title">${m.title}</p>
                                        <p class="gendre">${m.type}</p>
                                    </div>
                                </a>`;
                    })
                    .join("");
                if (result === "") {
                    findEle.innerHTML = ``;
                    cardWrapper.innerHTML = `<p class="no-result">'${keywordValue}' tidak tersedia</p>`;
                } else {
                    findEle.innerHTML = `Ditemukan: ${searchResult.length}`;
                    cardWrapper.innerHTML = result;
                }
            });
    } else {
        cardWrapper.innerHTML = `<p class="no-result">Judul Belum ditulis</p>`;
    }
});

document.addEventListener("click", function (e) {
    if (e.target.parentElement.parentElement.className == "card") {
        let getMangaID = e.target.parentElement.parentElement.dataset.endpoint;
        localStorage.setItem("endpoint", getMangaID);
        window.location.reload();
    } else {
        // console.log("Salah");
    }
});

// console.log(localStorage.getItem("endpoint"));

