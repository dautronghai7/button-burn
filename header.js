const header = document.getElementById('header');
let active = 0;
header.addEventListener('mouseenter',function(){    
    active = 1;
});
header.addEventListener('mouseleave',function(){
    active = 0;
});
class Rectangcle{
    constructor(x, y, size){
        this.x = x; 
        this.y = y;
        this.size = size;
        this.weight = Math.random()*1.5 + 1.5;
        this.directionX = Math.random() * 5;
    }
    update(){
        this.y += this.weight;
        if(this.size >= 0.3) this.size -= 0.3;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
function handleRectanglces(){
    for(let i = 0; i < rectangclesArray.length; i++){
        for(let y = i; y < rectangclesArray.length; y++){
            let dx = rectangclesArray[i].x - rectangclesArray[y].x;
            let dy = rectangclesArray[i].y - rectangclesArray[y].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            ctx.strokeStyle ='white';
            if(distance < 80){
                ctx.beginPath();
                ctx.moveTo(rectangclesArray[i].x, rectangclesArray[i].y);
                ctx.lineTo(rectangclesArray[y].x, rectangclesArray[y].y);
                ctx.stroke();
            }
        }
        rectangclesArray[i].update();
        rectangclesArray[i].draw();
        if(rectangclesArray[i].size <=1){
            rectangclesArray.splice(i, 1);
            i--;
        }
    }
}
function createRectangclesArray(){
    if(active === 1){
        setTimeout(()=>{
            document.getElementById('canvas1').setAttribute('style', "filter: none");            
        },1000);        
        let size = Math.random()*50 + 20;
        let x = Math.random()*window.innerWidth;
        let y = 0;
        rectangclesArray.push(new Rectangcle(x, y, size));
    }
}
function animationHeaderFrame(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    createRectangclesArray();
    handleRectanglces();
    requestAnimationFrame(animationHeaderFrame);
}
animationHeaderFrame();

