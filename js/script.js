let inputdir={x:0,y:0}
const foodmusic= new Audio('food.mp3');
const gameovermusic =new Audio("gameover.mp3");
const movemusic=new Audio("move.mp3");
const gamemusic=new Audio("music.mp3");
let lastpainttime=0;
let speed=5;
let score=0;
let snakearr=[
    {x:11,y:7}
]
let food={x:9,y:6}


function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
}
function isCollide(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
        
        
    }
    if( snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    
}

function gameEngine(){
    //update sanke and food
    if(isCollide(snakearr)){
        gameovermusic.play();
        gamemusic.pause();
        inputdir={x:0,y:0};
        alert('GAME IS OVER!!!');
        snakearr=[{x:11,y:7}]  
        gamemusic.play();
        score=0;
        

    }
    // if sanke eaten the food increment to the body
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});
        foodmusic.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML=("HiScore :" +hiscoreval)

        }
        scorebox.innerHTML="Score:" + score;
        a=2;
        b=12;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //moving the sanke
    for (let i = snakearr.length-2; i >=0; i--) {
        snakearr[i+1]={...snakearr[i]};
        
    }

    snakearr[0].x+=inputdir.x;
    snakearr[0].y+=inputdir.y;
    
    
  //display snake and food  
    board.innerHTML="" ;
    snakearr.forEach((e, index)=>{
//Display snake       
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index===0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        
        board.appendChild(snakeElement);
    })

// display food
    foodElement=document.createElement('div');
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}

//logic starts here
let hiscore=localStorage.getItem('hiscore');
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML=("HiScore:"+hiscore);
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputdir={x:0,y:1}
    movemusic.play()
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputdir.x=0;
            inputdir.y=-1;
            
            break;
        case 'ArrowDown':
            console.log('ArrowDown');
            inputdir.x=0;
            inputdir.y=1;

                
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputdir.x=-1;
            inputdir.y=0;
            
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            inputdir.x=1;
            inputdir.y=0 ;               
            break;
        default:
            break;
    }
}
    
)