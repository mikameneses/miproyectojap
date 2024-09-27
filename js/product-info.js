document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto guardado en localStorage
    const productId = localStorage.getItem('id');

    if (productId) {
        // Dirección de la API
        const apiUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
        const commentsApiUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

        // Realizar la solicitud a la API para obtener los datos del producto
        fetch(apiUrl)
            .then(response => response.json())
            .then(producto => {
                // Aquí accedemos al producto que está dentro de la propiedad "products" del JSON

                // Actualizar los detalles del producto en la página
                document.getElementById('product-name').textContent = producto.name;
                document.getElementById('category').textContent = `Categoría: ${producto.category}`;
                document.getElementById('description').textContent = `Descripción: ${producto.description}`;
                document.getElementById('sold').textContent = `Vendidos: ${producto.soldCount}`;

                // Actualizar la imagen principal
                const mainImage = document.querySelector('.main-image img');
                mainImage.src = producto.images[0]; // Primera imagen como imagen principal

                // Limpiar cualquier miniatura anterior
                const thumbnailsContainer = document.querySelector('.product-images');
                thumbnailsContainer.innerHTML = ''; // Limpiar las miniaturas previas

                // Generar dinámicamente las miniaturas
                producto.images.forEach((imagen, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagen;
                    imgElement.alt = `Imagen miniatura ${index + 1}`;
                    imgElement.addEventListener('click', () => {
                        // Cambiar la imagen principal al hacer clic en la miniatura
                        mainImage.src = imagen;
                    });
                    thumbnailsContainer.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos del producto:', error);
            });
          // *** Mostrar productos relacionados ***
                const relatedContainer = document.getElementById('related-products-container');
                relatedContainer.innerHTML = ''; // Limpiar productos relacionados previos

                producto.relatedProducts.forEach(relatedId => {
                    // Realizar una solicitud fetch para obtener el producto relacionado
                    fetch(`https://japceibal.github.io/emercado-api/products/${relatedId}.json`)
                        .then(response => response.json())
                        .then(relatedProduct => {
                            const relatedProductElement = document.createElement('div');
                            relatedProductElement.classList.add('col-md-4');
                            relatedProductElement.innerHTML = `
                                <div class="card">
                                    <img src="${relatedProduct.images[0]}" class="card-img-top" alt="${relatedProduct.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${relatedProduct.name}</h5>
                                        <button class="btn btn-primary" onclick="loadProduct(${relatedProduct.id})">Ver producto</button>
                                    </div>
                                </div>
                            `;
                            relatedContainer.appendChild(relatedProductElement);
                        })
                        .catch(error => {
                            console.error('Error al obtener el producto relacionado:', error);
                        });
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos del producto:', error);
            });

 // Solicitud para obtener los comentarios del producto
        fetch(commentsApiUrl)
            .then(response => response.json())
            .then(comentarios => {
                const commentsContainer = document.getElementById('comments-container');
                commentsContainer.innerHTML = ''; // Limpiar los comentarios previos

                comentarios.forEach(comentario => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');

                    commentElement.innerHTML = `
                        <p><strong>Usuario:</strong> ${comentario.user}</p>
                        <p><strong>Calificación:</strong> ${comentario.score} estrellas</p>
                        <p><strong>Comentario:</strong> ${comentario.description}</p>
                        <p><strong>Fecha:</strong> ${comentario.dateTime}</p>
                    `;

                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener los comentarios:', error);
            });
    } else {
        console.error('Producto no encontrado en localStorage');
    }
});
// Función para redirigir al producto seleccionado
function loadProduct(productId) {
    localStorage.setItem('id', productId);  // Guarda el nuevo ID en localStorage
    window.location.href = 'product-info.html';  // Recarga la página con el nuevo producto
}
