// Futuros js
import hamburguerMenu from "./hamburguer-menu.js";

hamburguerMenu

const d = document;

d.addEventListener('DOMContentLoaded', (e)=>{
  d.addEventListener('click', (e)=>{
      // console.log(e.target)
  })
   
    hamburguerMenu(".activar-menu", ".panel-categorias");

})



