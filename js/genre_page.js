const cardWrapper = document.querySelector(".card-wrapper");
const titleTop = document.querySelector(".title-top");
const genreType = localStorage.getItem("genreEndpoint");

let count = 1;
const nextBtn = document.querySelector(".next-btn");
getData(genreType, count);

// Genre List Selanjutnya
nextBtn.addEventListener("click", function () {
    cardWrapper.innerHTML = `<div class="load-bar"></div>`;
    count++;
    getData(genreType, count);
});

// Ambil Data Genre List
function getData(genreType, count) {
    fetch(`https://mangamint.kaedenoki.net/api/genres/${genreType}/${count}`)
        .then((response) => response.json())
        .then((data) => {
            const dataGenre = data.manga_list;
            const dataGenreEle = dataGenre
                .map((data) => {
                    return `<a href="detail_page.html" class="card" data-endpoint="${data.endpoint}">
                        <div class="card-image">
                            <img src="${data.thumb}" alt="">
                        </div>
                        <div class="card-content">
                            <p class="title">${data.title}</p>
                            <p class="type">${data.type}</p>
                        </div>
                    </a>`;
                })
                .join("");
            cardWrapper.innerHTML = `<div class="load-bar"></div>`;
            titleTop.innerHTML = `Genre ${genreType}`;
            cardWrapper.innerHTML = dataGenreEle;
        });
}

// Jika Data tidak lebih dari 20, sembunyikan tombol next
function cekMangaList(genreType, count) {
    fetch(
        `https://mangamint.kaedenoki.net/api/genres/${genreType}/${count + 1}`
    )
        .then((response) => response.json())
        .then((data) => {
            if (data.manga_list.length == 0) {
                nextBtn.style.display = "none";
            }
        });
}
cekMangaList(genreType, count);

document.addEventListener("click", function (e) {
    if (e.target.parentElement.parentElement.className == "card") {
        localStorage.setItem(
            "endpoint",
            e.target.parentElement.parentElement.dataset.endpoint
        );
    }
});