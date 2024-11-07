let page = document.querySelector(".landing-page");
let arrayOfImgs = ["1.jpg","2.jpg","3.jpg","26027.jpg"];
let preloadedImages = [];
let backgroundOption;
let backgroundInterval;
let controlBg = document.querySelectorAll(".random-background button");
let controlBul = document.querySelectorAll(".bullet-control button")
let bullets = document.querySelector(".bullets");
let tabs = document.querySelectorAll(".links a");
let navBullet =  document.querySelectorAll(".bullets .bullet");
let Sections= document.querySelectorAll("section");


/* SECTION Random Background........................................................ */
arrayOfImgs.forEach(img => {
    const image = new Image();
    image.src = `images/${img}`;
    preloadedImages.push(image);
});

/* SECTION - Checking Background Option In Local Storage */
let backgroundLocal = localStorage.getItem("bgOption");
if (backgroundLocal == null || backgroundLocal == "true"){
    backgroundOption =true;
        randomize();
} else {
    backgroundOption=false;
    let no = document.querySelector(".no");
    no.classList.add("active");
    let yes = document.querySelector(".yes");
    yes.classList.remove("active");
}

// SECTION -  Checking Bullet in Local Storage 
let noBul = document.querySelector(".no-bul");
let yesBul = document.querySelector(".yes-bul");
// console.log(localStorage.getItem("BulletCtrl"));

if (localStorage.getItem("BulletCtrl")=="false"){
    // console.log("here im");
    bullets.style.display = "none";
    noBul.classList.add("active");
    yesBul.classList.remove("active");
} else {
    bullets.style.display = "block";
}

/*SECTION -  Randomize Function */
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

/* SECTION - Reset button */
let reset= document.querySelector("#reset");
reset.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.reload();
})

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
        // el.preventDefault();
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

// Manging Bullets
controlBul.forEach(btn =>{
    // console.log(btn);
    btn.addEventListener("click", (e) =>{
        // console.log(e.target);
        // console.log(e.target.parentElement.querySelectorAll(".activ"));
        e.target.parentElement.querySelectorAll(".active").forEach(actbtn =>{
            // console.log(actbtn);
            actbtn.classList.remove("active");
        })
        e.target.classList.add("active");
        if(e.target.value=== "false"){
            bullets.style.display = "none";
            localStorage.setItem("BulletCtrl", false);
        } else {
            bullets.style.display = " block"
            localStorage.setItem("BulletCtrl", true);
        }
    })
})

// SECTION - Bullet nav

// console.log(navBullet);
navBullet.forEach(bullet =>{
    bullet.addEventListener("click", (el) =>{
        navBullet.forEach(white=>{
            // console.log(white);
            white.style.backgroundColor= "transparent";
        })
        el.target.style.backgroundColor= "rgb(173 167 167)";
        // console.log(el.target);
        // console.log(el.target.dataset.section);
        document.querySelector(`#${el.target.dataset.section}`).scrollIntoView({
            behavior:"smooth"
        });
    })
})


// SECTION - Making Sections Dynamic
let currentSection= "";
window.addEventListener("scroll", ()=>{
    // console.log(window.scrollY);
    
    Sections.forEach(section=>{
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if(window.scrollY>= (sectionTop-sectionHeight /4)){
            currentSection= section.getAttribute("id");
            // console.log(currentSection);
            //TODO - Edit after timeline scroll
        }else if (window.scrollY <=240){
            currentSection="home";
        } else if(window.scrollY>=3425){
            
        }
    })

    if(window.scrollY>=3425){
        subTab = document.querySelector("#discover");
        tabs.forEach(tab =>{
            // console.log(tab.getAttribute("href").slice(1));
            tab.classList.remove("active");
            subTab.classList.add("active");
        })
    }else{
        tabs.forEach(tab =>{
            // console.log(tab.getAttribute("href").slice(1));
            tab.classList.remove("active");
            if((tab.getAttribute("href").slice(1)) == currentSection){
                tab.classList.add("active")
            }
        })
    }
    

    //NOTE - Bullet dynamic part
    navBullet.forEach(bullet=>{
        // console.log(bullet.dataset.section);
        // console.log(currentSection);
        
        if(currentSection == bullet.dataset.section){
            // console.log("match");
            
            navBullet.forEach(white=>{
                white.style.backgroundColor ="transparent";
            })
            bullet.style.backgroundColor= "rgb(173 167 167)";
        }
    })
})

//  Start Animating Skills
let skills = document.querySelector(".skills")
window.addEventListener('scroll', () => {
    let skillsOffset = skills.offsetTop;
    let windowHeight = window.innerHeight;
    let scrollTop = window.scrollY;
    if ((scrollTop + windowHeight) > skillsOffset + 100){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
});

// Start Gallery Section

let imageBox = document.querySelectorAll(".gallery img");
imageBox.forEach(img =>{
    img.addEventListener("click", e=> {
        //Creating PopUp Element
        let popupOverlay = document.createElement("div");
        
        //Adding Class To PopUb Element
        popupOverlay.className = "popub-overlay";
        
        //Adding PopUb Element To Body
        document.body.appendChild(popupOverlay);
        
        //Creating PopUb Box
        let popubBox = document.createElement("div");

        //Adding Class To Popub Box
        popubBox.className = "popubBox";

        //Appending popub Box
        popupOverlay.appendChild(popubBox);
        

        //Creating popub Image
        let popubImage = document.createElement("img");
        
        //Adding Src
        popubImage.src = img.src
        popubImage.className="popubImage";

        //Appending newImage To popub Box
        popubBox.appendChild(popubImage);

        //Adding closing button
        let closeBtn = document.createElement("button");
        closeBtn.className = "closeBtn";
        closeBtn.textContent = "X"
        popubBox.prepend(closeBtn);

        //Removing popub Box
        closeBtn.addEventListener("click", e =>{
            closeBtn.parentElement.remove();
            document.querySelector(".popub-overlay").remove();
        })
    })
})
// End Gallery Section

/*NOTE - Closing Menu With Any Click */
let burgerIcon = document.querySelector(".burger");
let lis = document.querySelectorAll(".links li");

burgerIcon.onclick = function (el){
    el.stopPropagation();
    links.classList.toggle("active");
}
links.onclick = function (el){
    el.stopPropagation();
}
window.addEventListener("click", (el)=>{
    // console.log(el.target);
    // console.log(burgerIcon);
    // console.log(lis);
    if(el.target !== burgerIcon && el.target!== links){
        if (links.classList.contains("active")){
            links.classList.remove("active");
        }
    }
})

/*SECTION - Up Button */

let upBtn = document.querySelector(".up");
window.addEventListener("scroll", ()=>{
    if (window.scrollY>=1000){
        upBtn.style.display = "block";
    } else{
        upBtn.style.display = "none";
    }
})

upBtn.onclick = function(){
    window.scrollTo(0, 0)
}