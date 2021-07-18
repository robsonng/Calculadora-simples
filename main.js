/*Calculadora simples
Criador: RW Software
Criado em :09 de julho de 2021
*/

document.addEventListener('contextmenu', event => event.preventDefault());


let i=0;
let escolha="";
let memoria="";
let igual,decimal,numero,operador=true;
let botoes=document.getElementsByClassName("item");
let caixacampo=document.getElementById("campo");
let caixacamposec=document.getElementById("camposec");
let controlecaixacamposec=false;
const lista=["+","-","*","/"];
let teste=true;


document.getElementById("menu").onclick=animar;

function animar(){

  if(i===0){
    document.getElementById("submenu").style.left="0";
    i=1;
  }
  else{
    document.getElementById("submenu").style.left="-110vh";
  i=0;
  }
}


for(x=0;x<botoes.length;x++)
{
  botoes[x].onclick=function(ev)
  {
  escolha=ev.target;
  
  if(escolha.classList.contains("numero"))
    {
    document.getElementById("apagar").style.display="block";
    document.getElementById("AC").style.display="none";
    caixacampo.scrollLeft+=30;
    insnumero(escolha.id);
        if(controlecaixacamposec)
        {
        camposecundario();
        }
    }
    else
    {
    caixacampo.scrollLeft+=30;
    controlecaixacamposec=true;
    inscomando(escolha.id);
    }
  }
}


function insnumero(num)
{
  if(igual)
    {
    memoria=num;
    caixacampo.value=memoria;
    igual=false;
    numero=true;
    }
  else
    {
    memoria=caixacampo.value+num;
    caixacampo.value=memoria;
    numero=true;
    }
  if(operador)
    {
    decimal=false;
    }
}



function inscomando(num)
{
   switch(num)
   {
   case "AC":
     memoria="";
     document.getElementById("apagar").style.display="none";
     document.getElementById("AC").style.display="block";
     caixacampo.value=memoria;
     caixacamposec.value=memoria;
     decimal=false;
     if(caixacampo.value==="")
     {
       controlecaixacamposec=false;
     }
   break;
   
   case "=":
    if(memoria)
    {
       try
       {
       memoria=eval(memoria);
       
    
       if(caixacamposec.value!="")
       {
         caixacampo.value=caixacamposec.value;
         caixacamposec.value="";
         igual=true;
         decimal=false;
         numero=false;
       }
       else
       {
         caixacampo.value=memoria;
         caixacamposec.value="";
          
       }
       }
    
       catch (e)
       {
         if (e instanceof SyntaxError)
         {
           caixacampo.value="ERRO";
           caixacamposec.value="";
         }
       }
    }
 
   controlecaixacamposec=false;
   
        if (caixacampo.value != "") {
          document.getElementById("apagar").style.display = "none";
          document.getElementById("AC").style.display = "block";
        }
   caixacampo.scrollLeft=0;
   break;
   
   case "-":
      caixacampo.value = memoria + num;
      igual = false
      operador=true;
      if (memoria=== "")
       {
         controlecaixacamposec = false;
       }
   break;
   
   case ".":
     if(numero&&!decimal&&memoria!="")
     {
       memoria=caixacampo.value;
       caixacampo.value=memoria+".";
       decimal=true;
       operador=false;
     }
     if(lista.some(r=>caixacampo.value.includes(r)))
     {
       controlecaixacamposec=true;
       camposecundario();
     }
     if(caixacamposec.value==="")
     {
       controlecaixacamposec=false;
     }
   break;
   
   case "apagar":
     del();
     camposecundario();
     teste=true;
   break;
   
   default:
     if(memoria!="")
     {
      caixacampo.value = memoria + num;
      igual = false
      operador=true;
     }
     else
     {
      controlecaixacamposec=false;
     }
    break;
   }
}
  

function camposecundario()
{
   if(teste===false)
   {
     controlecaixacamposec=false;
     caixacamposec.value="";
   }
   else
   {
     caixacamposec.value=eval(memoria);
     if(caixacamposec.value.length>14)
     {
       caixacamposec.value=caixacamposec.value.substring(0,14);
     }
   }
}
  
  
function del()
{
  if(caixacampo.value!="")
  {
    if(caixacampo.value.length!=1)
    {
      memoria=caixacampo.value;
      let x=caixacampo.value.length;
      let y=caixacampo.value[x-1];
      memoria=memoria.substring(0,memoria.length-1);
      caixacampo.value=memoria;
      
      
      if(lista.some(r=>y.includes(r)))
      {
        memoria=caixacampo.value.substring(0,x-1);
        operador=false;
        igual=false;
      }
   
      teste=lista.some(r=>caixacampo.value.includes(r));
    }
    else
    {
        memoria=caixacampo.value;
        memoria=memoria.substring(0,memoria.length-1);
        caixacampo.value=memoria;
        caixacamposec.value=memoria;
        document.getElementById("apagar").style.display="none";
        document.getElementById("AC").style.display="block";
        controlecaixacamposec=false;
    }
  }
  else
  {
    controlecaixacamposec=false;
  }
}