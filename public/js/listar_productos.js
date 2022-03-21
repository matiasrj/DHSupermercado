

window.onload = function() {
    fetch('http://localhost:3001/api/products/')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let seccion_discount = document.querySelector('.discount')
        let productos =  data.data.productos;
        for (let producto of productos) {
            
            seccion_discount.innerHTML+=
            '<div class="product-card">' +
           '<article>' +
                '<img src="/images/'+producto.avatar+'" alt="Iphone"/>' +
                '<div class="body-card">' +
                    '<p class="title-card">'+ producto.name + '</p>'
                    '<p class="price-card"> u$s ' + producto.price + '</p>'
                '</div>'
                '<p class="desc-card">' + producto.description + '</p>'
            '</article>'
            '<div class="add-card">'
            '<button class="add-card-btn">' 
                '<i class="fas fa-plus"></i>'
                '<p> Comprar</p>'
            '</button>'
            '</div>'
        '</div>'

        }
    })
    .catch (e => {console.log (e)});


}