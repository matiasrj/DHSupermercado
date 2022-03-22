

window.onload = function() {
    fetch('/api/category/')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let categoriasContainer = document.querySelector('#categorias')
        let categorias =  data.data.categories;
        for (let categoria of categorias) {
            
            categoriasContainer.innerHTML+=
            `<a href="/products?categoria=${categoria.id}" class='categoria'>${categoria.name}</a>`
        }
        //     '<div class="product-card">' +
        //    '<article>' +
        //         '<img src="/images/'+producto.avatar+'" alt="Iphone"/>' +
        //         '<div class="body-card">' +
        //             '<p class="title-card">'+ producto.name + '</p>'
        //             '<p class="price-card"> u$s ' + producto.price + '</p>'
        //         '</div>'
        //         '<p class="desc-card">' + producto.description + '</p>'
        //     '</article>'
        //     '<div class="add-card">'
        //     '<button class="add-card-btn">' 
        //         '<i class="fas fa-plus"></i>'
        //         '<p> Comprar</p>'
        //     '</button>'
        //     '</div>'
        // '</div>'

        // }
    })
    .catch (e => {console.log (e)});


}