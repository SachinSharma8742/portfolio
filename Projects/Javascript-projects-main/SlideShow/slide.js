let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let images = document.getElementsByClassName("image");

let flag = 0;
slideShow(flag);

next.addEventListener("click", function () {
    flag = flag + 1;
    if (flag == images.length) {
        flag = 0;
    }

    slideShow(flag);
});

prev.addEventListener("click", function () {
    flag = flag - 1;
    if (flag == -1) {
        flag = images.length - 1;
    }
    slideShow(flag);
});

function slideShow(num) {
    for (let image of images) {
        image.style.display = "none";
    }

    images[num].style.display = "block";
}
