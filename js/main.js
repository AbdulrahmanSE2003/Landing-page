let page = document.querySelector(".landing-page");
let arrayOfImgs = ["1.jpg","2.jpg","3.jpg","26024.jpg", "26027.jpg", "26042.jpg", "26103.jpg", "60677.jpg",];
setInterval(() => {
    let random = Math.floor(Math.random() * arrayOfImgs.length);
    page.style.backgroundImage = `url(images/${arrayOfImgs[random]})`;
}, 7000);

let gear = document.querySelector(".setting-icon");
let icon = document.querySelector(".setting-icon i");
gear.onclick= ()=>{
    gear.parentElement.classList.toggle("open");
    icon.classList.toggle("rotate-45");
}