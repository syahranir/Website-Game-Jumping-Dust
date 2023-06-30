/*mendeskripsikan*/
let character = document.getElementById('character');
let characterBottom = parseInt (window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt (window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt (window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
let isJumping = false;
let upTime;
let downTime;
let displayscore = document.getElementById('score');
let score = 0;

/*lompat*/
function jump(){
    if(isJumping) return;
    upTime = setInterval(() =>{
        if(characterBottom >= groundHeight + 250){
            clearInterval(upTime);
            downTime = setInterval(() => {
                if(characterBottom <= groundHeight + 10){
                    clearInterval(downTime);
                    isJumping = false;
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px';
            }, 20)
        }
        characterBottom += 10;
        character.style.bottom = characterBottom + 'px';
        isJumping = true;
    }, 20);
}

/*menampilkan skor*/
function showScore(){
    score++;
    displayscore.innerText = score;  
}
setInterval(showScore, 1000);

function generateObstacle(){
    let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    obstacles.appendChild(obstacle);

    let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
    let obstacleRight = -150; 
    let obstacleBottom = 100; 
    let obstacleWidth = 60; 
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;

    function moveObstacle(){
        obstacleRight += 10; 
        obstacle.style.right = obstacleRight + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        obstacle.style.height = obstacleHeight + 'px';

        if(characterRight <= obstacleRight + obstacleWidth 
            && characterRight >= obstacleRight - characterWidth
            && characterBottom <= obstacleBottom + obstacleHeight){
            alert('Game Over!💔 Your final score is: '+score);
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeout); 
            location.reload();
        }
    }
    let obstacleInterval = setInterval(moveObstacle, 20); 
    let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);
}
generateObstacle();

function control(e) {
    if (e.key == 'ArrowUp' || e.key == ' '){
        jump();   
    }
}
document.addEventListener('keydown', control);

