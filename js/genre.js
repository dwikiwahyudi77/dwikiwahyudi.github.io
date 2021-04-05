const genreWrapper = document.querySelector(".genre-wrapper");
const genreList = document.querySelectorAll(".genre-list");
const genreBtn = document.querySelector(".genre-btn");
const iconGenreBtn = document.querySelector(".icon-genre-btn");
const cardHeading = document.querySelector(".card-heading");
const genreSelected = document.querySelector(".genre-selected");
const cardWrapper = document.querySelector(".card-wrapper");

// Ambil Genre List dari API -Awal-
fetch("https://mangamint.kaedenoki.net/api/genres")
    .then((response) => response.json())
    .then((data) => {
        const listGenre = data.list_genre;
        const genreEle = listGenre
            .map((data) => {
                return `<a href="#" class="genre-list" data-genreEndpoint="${data.endpoint}">${data.genre_name}</a>`;
            })
            .join("");
        genreWrapper.innerHTML = genreEle;
    });
// Ambil Genre List dari API -Akhir-

// Menampilkan Pilihan Genre Awal
genreWrapper.style.display = "none";
genreBtn.addEventListener("click", function (e) {
    if (genreBtn.dataset.dataid == "yes") {
        genreWrapper.style.display = "grid";
        genreBtn.dataset.dataid = "no";
        genreBtn.innerHTML = `Tutup Genre  <i class="flaticon-right icon-genre-btn"></i>`;
        iconGenreBtn.style.transform = "rotate(90deg)";
    } else {
        genreWrapper.style.display = "none";
        genreBtn.dataset.dataid = "yes";
        genreBtn.innerHTML =
            'Tampilkan Genre <i class="flaticon-right icon-genre-btn"></i>';
    }
});
// Menampilkan Pilihan Genre Akhir

// Menampilkan Pilihan Data dari Genre -Awal-
document.addEventListener("click", function (e) {
    if (e.target.className === "genre-list") {
        genreWrapper.style.display = "none";
        genreBtn.dataset.dataid = "yes";
        genreBtn.innerHTML =
            'Tampilkan Genre <i class="flaticon-right icon-genre-btn"></i>';

        cardWrapper.innerHTML = `<div class="load-bar"></div>`;
        localStorage.setItem("genreEndpoint", e.target.dataset.genreendpoint);
        const getGenreEndpoint = localStorage.getItem("genreEndpoint");
        fetch(
            `https://mangamint.kaedenoki.net/api/genres/${getGenreEndpoint}/1`
        )
            .then((response) => response.json())
            .then((data) => {
                const dataGenre = data.manga_list;
                const dataEle = dataGenre
                    .map((data) => {
                        return `
                            <a href="detail_page.html" class="card" data-endpoint="${data.endpoint}">
                            <div class="card-image">
                                <img
                                    src="${data.thumb}"
                                    alt="${data.title}"
                                />
                            </div>
                            <div class="card-content">
                                <p class="title">${data.title}</p>
                                <p class="type">${data.type}</p>
                            </div>
                        </a>`;
                    })
                    .join("");
                cardWrapper.innerHTML = dataEle;
                genreSelected.innerHTML = `Genre dipilih: ${getGenreEndpoint}`;
            });
    }
});
// Menampilkan Pilihan Data dari Genre -Akhir-

document.addEventListener("click", function (e) {
    if (e.target.parentElement.parentElement.className == "card") {
        localStorage.setItem(
            "endpoint",
            e.target.parentElement.parentElement.dataset.endpoint
        );
    }
});

// fetch(`https://mangamint.kaedenoki.net/api/recommended`)
//     .then(response =>  response.json())
//     .then(data => {
//         const recomData = data.manga_list;
//         console.log(recomData)
//     });
