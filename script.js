const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var buttonElements = document.querySelectorAll('.button');// lay tat ca cac button co class la button
let buttonMeasurements = [];
measureButtons();
window.addEventListener('resize',(e)=>{            
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    measureButtons();
})


function measureButtons(){
    buttonMeasurements = [];
    buttonElements.forEach(e => {
        buttonMeasurements.push(e.getBoundingClientRect());// lay vi tri toa do cua button tan tuong ung
    });
}

// create particle
let rectangclesArray = [];
let particlesArray = [];
class Particle {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = Math.random() * 1.5 + 1.5;// lay tu khoang 1.5 -> 3; 
        this.directionX = Math.random() * 2; // mac dinh gia tri tu 0 -> 2;
    }
    update(){
        this.y -= this.weight;
        this.x += this.directionX;
        if(this.size >= 0.3) this.size -= 0.5;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
    }
}
let activeButton = -1;
buttonElements.forEach(button=> button.addEventListener('mouseenter', function(){
    document.getElementById('canvas1').setAttribute('style', "filter: blur(10px) contrast(1.2); ");
    activeButton = button.dataset.number;    
}));
buttonElements.forEach(button=>button.addEventListener('mouseleave', function(){    
    activeButton = -1;    
}));

function handleParticles(){
    for(let i = 0; i< particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size <= 1){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function createParticle(){
    if(activeButton > -1){
        document.getElementById('canvas1').setAttribute('style', "filter: blur(10px) contrast(1.2); ");
        let size = Math.random() * 40 + 30;
        let x = Math.random()*(buttonMeasurements[activeButton].width - size * 2) + buttonMeasurements[activeButton].x + size;
        let y = buttonMeasurements[activeButton].y + 10;
        particlesArray.push(new Particle(x, y, size));
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createParticle();
    handleParticles();
    requestAnimationFrame(animate);
}
animate();