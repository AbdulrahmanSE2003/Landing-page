let page = document.querySelector(".landing-page");
let arrayOfImgs = ["1.jpg","2.jpg","3.jpg","26027.jpg"];
let preloadedImages = [];
let backgroundOption;
let backgroundInterval;
let controlBg = document.querySelectorAll(".random-background button");
let tabs = document.querySelectorAll(".links a");


/*Random Background........................................................ */
arrayOfImgs.forEach(img => {
    const image = new Image();
    image.src = `images/${img}`;
    preloadedImages.push(image);
});

/*Checking Background Option In Local Storage */
let backgroundLocal = localStorage.getItem("bgOption");
if (backgroundLocal !== null && backgroundLocal == "true"){
    backgroundOption =true;
        randomize();
} else {
    backgroundOption=false;
    let no = document.querySelector(".no");
    no.classList.add("active");
    let yes = document.querySelector(".yes");
    yes.classList.remove("active");
}

/*Randomize Function */
function randomize(){
    if (backgroundOption ==true){
        
        backgroundInterval = setInterval(() => {
            page.style.backgroundImage = `url(${preloadedImages[Math.floor(Math.random() * preloadedImages.length)].src})`;
        }, 7000);
    } 
}
/*switching Colors............................................................. */
const colorsList = document.querySelectorAll(".colors-list li");
colorsList.forEach(li=>{
    li.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        colorsList.forEach(selLi =>{
            selLi.classList.remove("active");
            li.classList.add("active");
        })
        localStorage.setItem("mainColor", e.target.dataset.color);
    })
})
/*Getting Color From Local Storage.............................................. */

if(localStorage.getItem("mainColor")!==null){
    let mainColor= localStorage.getItem("mainColor");
    document.documentElement.style.setProperty("--main-color",mainColor);
    colorsList.forEach(li => {
        if(li.dataset.color == mainColor){
            colorsList.forEach(remLi =>{
                remLi.classList.remove("active");
            })
            li.classList.add("active");
        }
    })
}

/*Gear Rotation............................................................... */
let gear = document.querySelector(".setting-icon");
let icon = document.querySelector(".setting-icon i");
let logo = document.querySelector(".logo");
gear.onclick= ()=>{
    gear.parentElement.classList.toggle("open");
    icon.classList.toggle("rotate-45");
    logo.classList.toggle("move-right");
    
}

/*Opening Tab Menu............................................................... */
const toggleBtn = document.querySelector('.toggle-btn');
const links = document.querySelector('.links');
let introText = document.querySelector(".intro-text");

toggleBtn.addEventListener('click', () => {
    // Toggle the 'active' class to show/hide the menu
    links.classList.toggle('active');
    introText.classList.toggle("transform");
});

/*Changing Active Tab*/
tabs.forEach(tab =>{
    tab.addEventListener("click",(el)=> {
        tabs.forEach(remAct => {
            remAct.classList.remove("active");
        })
        el.currentTarget.classList.add("active");
    })
})

/*Random Background Control......................................................*/
controlBg.forEach(btn => {
    btn.addEventListener("click", (e)=>{
        e.target.parentElement.querySelectorAll(".active").forEach(el=>{
            el.classList.remove("active");
        })

        e.target.classList.add("active");
        if(e.target.value ==="true"){
            backgroundOption= true;
            randomize();
            localStorage.setItem("bgOption", true);
        } else{
            backgroundOption= false;
            clearInterval(backgroundInterval);
            localStorage.setItem("bgOption", false);
        }
        
    })
})


