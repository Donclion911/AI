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
        x.strokeStyle="white";
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
        x.beginPath();
        x.strokeStyle="red";
        x.rect(this.x,this.y,this.w,this.h);
        x.stroke();
        x.closePath();
    }
}
blck= new block(20,temp.height/2,1080,5);
hit=new target(temp.width/2,40,30);
shot=class{
    constructor(speed,angle,path)
    {
        this.x=temp.width/2;
        this.y=temp.height-20;
        this.speed=speed;
        this.angle=angle;
        this.path=path;
        this.touched=false;
        this.map=[];
        this.step=0;
        this.force=null;
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
                if(this.step>0)
                {
                    this.y=temp.height-20;
                    this.x=temp.width/2;
                }
                if(DNA.length!=0)
                {
                    if(this.force!=null)
                    {
                        this.angle=this.force[this.step];
                        if(this.step<this.force.length-1)
                        {
                            this.step++;
                        }
                        else
                        {
                            this.step=0;
                            this.force=DNA[DNA.length-1];
                        }
                    }
                    else
                    {
                        this.force=DNA[DNA.length-1];
                    }
                }
                else
                {
                    this.angle=Math.random()*(180-5)+5;
                }
            }
            if(this.x<=0||this.x>=temp.width)
            {
                this.angle=Math.random()*(180-5)+5;
            }
            if(this.x>=blck.x+2&&this.x<=blck.x+blck.w&&this.y<=blck.y&&this.y>=blck.y-blck.h-25)
            {
                this.y=temp.height;
            }
            if(this.y<=hit.y+hit.size&&this.y>=hit.y-hit.size && this.x>=hit.x-hit.size &&this.x<=hit.x+hit.size)
            {
                console.log("hit");
                this.touched=true;
                DNA.push(this.map);
                console.log(DNA);
            }
        }
        this.map.push(JSON.parse(JSON.stringify(this.angle)));
    }
}
function _goahead()
{
    x.clearRect(0,0,temp.width,temp.height);
    if(shots.length==0)
    {   
        for(i=1;i<=5000;i++)
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
