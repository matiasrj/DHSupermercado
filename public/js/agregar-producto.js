window.onload = function() {
    // alert('Agregaste'  + " al carrito")
    let botonAgregar = document.querySelector('#shop-ico');
    let botonSumar = document.querySelector('#plus-ico');
    let botonRestar = document.querySelector('#minus-ico');
    let inputAmount = document.querySelector('#amount')

    botonSumar.addEventListener('click', function(e){
        let amount =parseFloat(inputAmount.value)
        amount +=1
        inputAmount.value=amount
    })

    
    botonRestar.addEventListener('click', function(e){    
        let amount = parseFloat(inputAmount.value)
        amount -=1
        if (amount < 1){amount = 1}
        inputAmount.value=amount
    })

    botonAgregar.addEventListener('click', function(e){
        e.preventDefault();
        //capturo id del prod
        let url = window.location.href.split("/");
        let id = url [url.length -1]

        
        let imgProd = document.querySelector('.img-dc').getAttribute("src")
        let nameProd = document.querySelector('.title-dc').innerText
        let precio = document.querySelector('.price').innerText
        // let descuento = document.querySelector('.descuento').innerText
        let cantidad = document.querySelector('#amount').value

        let producto = {
            id: id, 
            imgProd,
            nameProd,
            precio:parseFloat(precio),
            cantidad: parseFloat(cantidad),
            total : parseFloat(precio) * parseFloat(cantidad)
        }
        
        console.log('agregando' + JSON.stringify(producto))

        if(localStorage.length == 0) {
            let carrito = []
            carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito))
        } else {
            let carrito = JSON.parse(localStorage.carrito)
            let productos = carrito.filter(function(producto){
                return producto.id == id
            })

            if(productos.length == 0){
                carrito.push(producto)
                localStorage.setItem("carrito", JSON.stringify(carrito))
            } else {
                productos[0].cantidad = parseFloat(productos[0].cantidad)+producto.cantidad;
                productos[0].total = parseFloat(productos[0].precio) * parseFloat(productos[0].cantidad);
                localStorage.setItem("carrito", JSON.stringify(carrito))
            }

            

            let totalCarrito = 0
            for (let i=0; i<carrito.length; i++) {
               let carro = carrito[i].precio * carrito[i].cantidad;
               totalCarrito += carro 
            }
            localStorage.setItem("totalCarrito", totalCarrito)
            // actualizarTotal(totalCarrito)
        }
        alert('Agregaste' + " " + nameProd + " al carrito")
    })
}


// function actualizarTotal(totalCarrito){
//     let total = document.querySelector('#total')
//     total.innerText = total

// }