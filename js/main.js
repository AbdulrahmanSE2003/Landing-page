let page = document.querySelector(".landing-page");
let arrayOfImgs = ["1.jpg","2.jpg","3.jpg","26024.jpg", "26027.jpg", "26042.jpg", "26103.jpg", "60677.jpg",];
let preloadedImages = [];

arrayOfImgs.forEach(img => {
    const image = new Image();
    image.src = `images/${img}`;
    preloadedImages.push(image);
});

let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % preloadedImages.length; // Cycle through the images
    page.style.backgroundImage = `url(${preloadedImages[currentIndex].src})`;
}, 7000);

let gear = document.querySelector(".setting-icon");
let icon = document.querySelector(".setting-icon i");
gear.onclick= ()=>{
    gear.parentElement.classList.toggle("open");
    icon.classList.toggle("rotate-45");
}
