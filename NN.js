temp=document.getElementById("doing");
x=temp.getContext("2d");
temp.style.backgroundColor="gray";
next=0;
setInterval(_goahead,0)
shots=[];
DNA=[];
target=class{
    constructor(x,y,size){
        this.x=x;
        this.y=y;
        this.size=size;
    }
    show(){
        x.beginPath();
        x.arc(this.x,this.y,this.size,0,2*Math.PI);
        x.strokeStyle="red";
        x.stroke();
        x.closePath();
    }
}
block=class{
    constructor(x,y,w,h)
    {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    show(){
        x.rect(this.x,this.y,this.w,this.h);
        x.stroke();
    }
}
blck= new block(150,temp.height/2,300,5);
hit=new target(temp.width/2,40,10);
shot=class{
    constructor(speed,angle,path)
    {
        this.x=temp.width/2;
        this.y=temp.height-20;
        this.speed=speed;
        this.angle=angle;
        this.path=path;
        this.touched=false;
    }
    show()
    {
        x.beginPath();
        x.save()
        x.rect(this.x,this.y,5,20);
        x.restore();
        x.strokeStyle="white";
        x.stroke();
        x.closePath();
        if(!this.touched)
        {
            this.y-=this.speed*Math.sin(this.angle);
            this.x-=this.speed*Math.cos(this.angle);
            if(this.y<=0||this.y>=temp.height)
            {
                this.y=temp.height-20;
                this.x=temp.width/2;
                if(DNA.length!=0)
                {
                    this.angle=DNA[0].angle;
                }
                else
                {
                    this.angle=Math.random()*(180-5)+5;
                }
            }
            else if(this.x<=0||this.x>=temp.width||this.x>=blck.x&&this.x<=blck.x+blck.w&&this.y<=blck.y&&this.y>=blck.y-blck.h)
            {
                this.angle=Math.random()*(180-5)+5;
            }
            else if(this.y<=hit.y+10&&this.y>=hit.y-10 && this.x>=hit.x-11 &&this.x<=hit.x+11)
            {
                console.log("hit");
                this.touched=true;
                DNA.push(this);
                console.log(DNA);
            }
        }
    }
}
function _goahead()
{
    x.clearRect(0,0,temp.width,temp.height);
    if(shots.length==0)
    {   
        for(i=1;i<=50;i++)
        {
            shots.push(new shot(1, Math.random()*(180-5)+5));
        }
    }
    hit.show();
    blck.show();
    shots.forEach(function(next) {
        next.show();
    });
}
