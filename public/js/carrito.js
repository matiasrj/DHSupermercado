window.onload = function () {
  
  let total = document.querySelector('#total')

    if (typeof (localStorage.carrito) == "undefined" || localStorage.carrito == "[]"
  ) {
    let div = document.querySelector(".ProductosCarrito");
    div.innerHTML += "<h2> No hay productos agregados </h2>";

  } else {
    let carrito = JSON.parse(localStorage.carrito);
    for (let i = 0; i < carrito.length; i++) {
      let producto = carrito[i];
      let div = document.querySelector(".ProductosCarrito");
      let contenido = ` <article>
                         <img src="${producto.imgProd}" alt="imagen no disponible" class="ProductCart_images">
                        <div class="articulo_carrito">
                            <div class="detail">
                                <h4 class="Descripcion">${producto.nameProd}</h4>
                                <p class="Precio">${producto.precio} dlls</p>
                            </div>
                            <div class="qty-container">
                                <p class="qty"> ${producto.cantidad}</p>
                            </div>
                        
                            <div class="total-container">
                                <p class="Precio">$ ${producto.total} dlls</p>
                                <form action="#" method="GET">
                                    <button  type="button">
                                        <i onclick="borrarItem(${i})" class="fas fa-trash-alt"></i>
                                    </button>
                                </form>
                            </div>
                            
                        </div>
      </article>`;

      div.innerHTML += contenido;
    }


    
  }
  
  // Refresh totalizador
  let totalCarrito = 0
  
  let carrito = []
  if (localStorage.carrito)
  {
   carrito = JSON.parse(localStorage.carrito)
  }
  
  if (carrito.length>0){

    for (let i=0; i<carrito.length; i++) {
      let carro = carrito[i].precio * carrito[i].cantidad;
      totalCarrito += carro 
    }
    localStorage.setItem("totalCarrito", totalCarrito)
    
  }
// Actualizo carrito
  if (typeof(localStorage.totalCarrito) != 'undefined' && localStorage.carrito != "[]"){
  // console.log('totalcarrito ' + typeof(localStorage.totalCarrito))
   total.innerText = localStorage.totalCarrito  
  } 
  else {
    total.innerText = 0 
  }


let btnVaciar = document.querySelector("#ico-vaciar");
btnVaciar.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.clear();
      alert('Carrito Vacio');
      location.reload();
    })

}




