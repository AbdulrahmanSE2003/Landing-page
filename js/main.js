let page = document.querySelector(".landing-page");
let arrayOfImgs = ["1.jpg","2.jpg","3.jpg","26024.jpg", "26027.jpg", "26042.jpg", "26103.jpg", "60677.jpg",];
let preloadedImages = [];

arrayOfImgs.forEach(img => {
    const image = new Image();
    image.src = `images/${img}`;
    preloadedImages.push(image);
});


setInterval(() => {
    page.style.backgroundImage = `url(${preloadedImages[Math.floor(Math.random() * preloadedImages.length)].src})`;
}, 7000);
// switching Colors
const colorsList = document.querySelectorAll(".colors-list li");

colorsList.forEach(li=>{
    li.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        colorsList.forEach(selLi =>{
            if(selLi.classList.contains("active")){
                selLi.classList.remove("active");
            }
            li.classList.add("active");
        })
    })
})

let gear = document.querySelector(".setting-icon");
let icon = document.querySelector(".setting-icon i");
let logo = document.querySelector(".logo");
gear.onclick= ()=>{
    gear.parentElement.classList.toggle("open");
    icon.classList.toggle("rotate-45");
    logo.classList.toggle("move-right");
    
}
