var ballz= [];
var food= [];

function makefood()
{
    let bb = {};
    bb.getfood=document.createElement("div");
    bb.getfood.style.left = (bb.pozx = Math.floor(Math.random() * (window.innerWidth-50))) + 'px';
    bb.getfood.style.top = (bb.pozy = Math.floor(Math.random() * (window.innerHeight-50))) + 'px';
    bb.getfood.style.width = 40 + 'px';
    bb.getfood.style.height = 40 + 'px';
    bb.getfood.style.borderRadius = '50%';
    bb.getfood.style.position = 'absolute';
    bb.getfood.style.background = "red";

    document.body.appendChild(bb.getfood);
    return bb;
}

function makeball()
{
    let bb = {};

    bb.race=Math.floor(Math.random() * 3);

    bb.hunger = 25;
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = Math.floor(Math.random() * (window.innerWidth-100));
    bb.pozy = Math.floor(Math.random() * (window.innerHeight-100));

    if(bb.race==0)bb.bonusv=0.1;  
    if(bb.race==1)bb.bonusv=0.25;
    if(bb.race==2)bb.bonusv=0;

    if(bb.race==0)bb.vision=500;  
    if(bb.race==1)bb.vision=250;
    if(bb.race==2)bb.vision=1000;

    bb.getball=document.createElement("div");
    bb.getball.style.width = 100 + 'px';
    bb.getball.style.height = 100 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';

    if(bb.race==0)bb.getball.style.background ='#ffffff';  
    if(bb.race==1)bb.getball.style.background ='#000000';  
    if(bb.race==2)bb.getball.style.background ='#ffff00';  
    document.body.appendChild(bb.getball);
    return bb;
}

function makechildball(ball)
{
    let bb = {};

    bb.race=ball.race;

    bb.hunger = ball.hunger/4;
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = ball.pozx+50;
    bb.pozy = ball.pozy;
    bb.vision = ball.vision;
    bb.bonusv = ball.bonusv;

    bb.getball=document.createElement("div");
    bb.getball.style.width = 100 + 'px';
    bb.getball.style.height = 100 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';
    bb.getball.style.background ='#ffff00';
    if(bb.race==0)bb.getball.style.background ='#ffffff';  
    if(bb.race==1)bb.getball.style.background ='#000000';  
    if(bb.race==2)bb.getball.style.background ='#ffff00'; 

    document.body.appendChild(bb.getball);
    return bb;
}

function eat(ball,food)
{
    food.getfood.remove();
    ball.hunger+=5;
}

function goeatvelocity(ball,food)
{
    var distantax = ball.pozx-food.pozx;
    var distantay = ball.pozy-food.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    ball.velx=-distantax/distanta;
    ball.vely=-distantay/distanta;
}

function losehunger(ball)
{
    ball.hunger-=0.01;
}

function idle(ball)
{
        negx=Math.floor(Math.random() * 2);
        negy=Math.floor(Math.random() * 2);
        ball.velx=Math.random();
        ball.vely=Math.random();
        if(negx==1)ball.velx*=-1;
        if(negy==1)ball.vely*=-1;
}

function outofbounds(ball)
{
    if(ball.pozx>(window.innerWidth-100) || ball.pozx<0)
        return true;
    if(ball.pozy>(window.innerHeight-100) || ball.pozy<0)
        return true;
     return false;
}

function move(ball)
{
    if(ball.velx<0)ball.pozx += ball.velx-ball.bonusv;
    else ball.pozx += ball.velx+ball.bonusv;
    if(ball.vely<0)ball.pozy += ball.vely-ball.bonusv;
    else ball.pozy += ball.vely+ball.bonusv;
    ball.getball.style.left = ball.pozx+'px';
    ball.getball.style.top = ball.pozy+'px';
}

function create()
{
    for(let i=0;i<10;i++)
    {
        ballz.push(makeball());
    }
    for(let i=0;i<100;i++)
    {
        food.push(makefood());
    }
}

function spawnfood()
{
    for(let i=0;i<100;i++)
    {
        food.push(makefood());
    }
}

function update()
{
    ///delete out of bounds
    for(let i=0;i<ballz.length;i++)
    {
        if(outofbounds(ballz[i])==true)
        {
            ballz[i].getball.remove();
            ballz.splice(i,1);
        }
    }
    ///devide and spawn
    for(let i=0;i<ballz.length;i++)
    {
        if(ballz[i].hunger>50)
        {
            ballz.push(makechildball(ballz[i]));
            ballz[i].hunger/=4;
            ballz[i].pozx-=50;
        }
    }
    ///hunger and die
    for(let i=0;i<ballz.length;i++)
    {
        losehunger(ballz[i]);
        if(ballz[i].hunger<=0)
        {
            ballz[i].getball.remove();
            ballz.splice(i,1);
        }
    }
    /// Rendering Movement
    for(let i=0;i<ballz.length;i++)
    {
        move(ballz[i]);
    }
    ///Changing velocity for eating and idle and eating
    for(let i=0;i<ballz.length;i++)
    {
        for(let j=0;j<food.length;j++)
        {
            var distantax = ballz[i].pozx-food[j].pozx;
            var distantay = ballz[i].pozy-food[j].pozy;
            var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
            if(distanta>ballz[i].vision && ballz[i].velx==0 && ballz[i].vely==0)
            {
                idle(ballz[i]);
            }
            else
            if(distanta>100 && distanta<ballz[i].vision)
            {
                goeatvelocity(ballz[i],food[j]);
            }
            if(distanta<100)
            {
                ballz[i].velx=0;
                ballz[i].vely=0;
                eat(ballz[i],food[j]);
                food.splice(j, 1);
            }
        }
    }
}

setInterval(spawnfood,10000);
create();
setInterval(update,1);