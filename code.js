var ballz= [];
var food= [];

function rand(a, b)
{ 
    return a + Math.random() * b; 
}

function makefood()
{
    let bb = {};
    bb.getfood=document.createElement("div");
    bb.getfood.style.left = (bb.pozx = Math.floor(Math.random() * (window.innerWidth-50))) + 'px';
    bb.getfood.style.top = (bb.pozy = Math.floor(Math.random() * (window.innerHeight-50))) + 'px';
    bb.getfood.style.width = 50 + 'px';
    bb.getfood.style.height = 50 + 'px';
    bb.getfood.style.position = 'absolute';
    bb.getfood.style.background = "red";

    document.body.appendChild(bb.getfood);
    return bb;
}

function makeball()
{
    let bb = {};

    bb.race=Math.floor(Math.random() * 3);

    bb.hunger = 0;
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = Math.floor(Math.random() * (window.innerWidth-100));
    bb.pozy = Math.floor(Math.random() * (window.innerHeight-100));

    bb.getball=document.createElement("div");
    bb.getball.style.width = 100 + 'px';
    bb.getball.style.height = 100 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';

    if(bb.race==0)
    {
        bb.getball.style.background ='#ffffff';  
    }
    if(bb.race==1)
    {
        bb.getball.style.background ='#000000';  
    }
    if(bb.race==2)
    {
        bb.getball.style.background ='#ffff00';  
    }
    document.body.appendChild(bb.getball);
    return bb;
}

function eat(ball,food)
{
    food.getfood.remove();
    ball.hunger++;
}

function goeatvelocity(ball,food)
{
    var distantax = ball.pozx-food.pozx;
    var distantay = ball.pozy-food.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    ball.velx=distantax/distanta;
    ball.vely=distantay/distanta;
}

function move(ball)
{
    ball.pozx += ball.velx;
    ball.pozy += ball.vely;
    ball.getball.style.left = ball.pozx+'px';
    ball.getball.style.top = ball.pozy+'px';
}

function create()
{
    for(let i=0;i<1;i++)
    {
        ballz.push(makeball());
    }
    for(let i=0;i<1;i++)
    {
        food.push(makefood());
    }
}

function spawnfood()
{
    for(let i=0;i<10;i++)
    {
        food.push(makefood());
    }
}

function update()
{
    ///Movement
    for(let i=0;i<ballz.length;i++)
    {
        move(ballz[i]);
    }
    ///Eating
    for(let i=0;i<ballz.length;i++)
    {
        for(let j=i+1;j<food.length;j++)
        {
            var distantax = ballz[i].pozx-food[j].pozx;
            var distantay = ballz[i].pozy-food[j].pozy;
            var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
            if(distanta>120 && distanta<10000)
            {
                goeatvelocity(ballz[i],food[j]);
            }
            else
            if(distanta<120)
            {
                ballz[i].velx=0;
                ballz[i].vely=0;
                eat(ballz[i],food[j]);
                food.splice(j, 1);
            }
        }
    }
}

create();
setInterval(update,1);
//setInterval(spawnfood,10000);
