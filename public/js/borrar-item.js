function borrarItem(id) {
    let carrito = JSON.parse(localStorage.carrito);
    carrito = carrito.filter((producto, i) => {
      return i !== id;
    });

    let totalCarrito = 0
            for (let i=0; i<carrito.length; i++) {
               let carro = carrito[i].precio * carrito[i].cantidad;
               totalCarrito += carro 
            }
            localStorage.setItem("totalCarrito", totalCarrito)
  
    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();
  }
  

  