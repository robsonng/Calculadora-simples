let tela=document.getElementById("tela");
esp=tela.getContext("2d");

let arraydeparticulas=[];


class particulas
{
  constructor(x,y,direcaox,direcaoy,tamanho,cor)
  {
    this.y=y;
    this.x=x;
    this.direcaox=direcaox;
    this.direcaoy=direcaoy;
    this.tamanho=tamanho;
    this.cor=cor;
  }
  desenhar()
  {
    esp.beginPath();
    esp.arc(this.x,this.y,this.tamanho,0,2*Math.PI,false);
    esp.fillStyle=this.cor;
    esp.fill();
    esp.closePath();
  }
  atualizar()
  {
    if(this.x>tela.width||this.x<0)
    {
      this.direcaox=-this.direcaox;
    }
    if(this.y>tela.height||this.y<0)
    {
      this.direcaoy=-this.direcaoy;
    }
    
    this.x+=this.direcaox;
    this.y+=this.direcaoy;
    
    this.desenhar();
    
  }
}

function iniciar()
{
 for(let x=0;x<50;x++)
 {
  let tamanho=Math.floor(Math.random()*1)+1;
  let x=Math.floor(Math.random()*tela.width);
  let y=Math.floor(Math.random()*tela.height);
  let direcaox=Math.random()*5-2.5;
  let direcaoy=Math.random()*5-2.5;
  let cor="#FF8DE2";
   arraydeparticulas.push(new particulas(x,y,direcaox,direcaoy,tamanho,cor));
 }
}

function conectar()
{
  for(let a=0;a<arraydeparticulas.length;a++)
  {
    for(let b=a;b<arraydeparticulas.length;b++)
    {
      let distancia=(
        ((arraydeparticulas[a].x-arraydeparticulas[b].x)*
        (arraydeparticulas[a].x-arraydeparticulas[b].x))+
        
        ((arraydeparticulas[a].y-arraydeparticulas[b].y)*
        (arraydeparticulas[a].y-arraydeparticulas[b].y))
        );
           
        if(distancia<(tela.width/4)*(tela.height/7))
        {
          esp.beginPath();
          esp.strokeStyle="#FF8DE2"
          esp.linewidth=1;
          esp.moveTo(arraydeparticulas[a].x,arraydeparticulas[a].y);
          esp.lineTo(arraydeparticulas[b].x,arraydeparticulas[b].y);
          esp.stroke();
          
        }
    }
  }
}

function animation()
{
  requestAnimationFrame(animation)
  {
  esp.clearRect(0,0,innerWidth,innerHeight);
  for(let i=0;i<arraydeparticulas.length;i++)
   {
     arraydeparticulas[i].atualizar();
   }
   conectar();
  }
 
}

iniciar();
animation();
