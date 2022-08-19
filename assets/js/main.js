/* Arreglo de Productos */

const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    }
  ]

/* Contador para las cantidades */
  items.map ( x => x.cantidad = 1)
  items.map ( x => x.stockDisponible = x.quantity)

  //localStorage
document.addEventListener( "DOMContentLoaded", () =>{
    load()
    //Si existe 
    if (localStorage.getItem("shoppingCart")) {
        shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
        actualizarshoppingCart()
    }
})

/* =========== LOADER ========== */
const loader = document.getElementById( "loader" )
function load () {
    setTimeout(() => {
        loader.classList.add( "hide" )
    }, 3000);
}

/* =========DARK MODE======== */
const themeButton = document.getElementById( "theme-button" )

themeButton.addEventListener( "click", () =>{
    document.body.classList.toggle( "dark-theme" )

    if( themeButton.classList.contains( "bx-moon" ) ){
        themeButton.classList.replace( "bx-moon", "bx-sun" )
    }else{
        themeButton.classList.replace( "bx-sun", "bx-moon" )
    }
})


/*=======  shoppingCart =========== */
const cartOpen = document.getElementById( "cart-shop" )
const cartClose = document.getElementById( "close-cart" )
const cartContainer = document.getElementById( "cart-container" )
const contenedorCar =document.getElementById("")

cartOpen.addEventListener( "click", () => {
    cartContainer.classList.remove( "hide" )
})

cartClose.addEventListener( "click", () => {
    cartContainer.classList.add( "hide" )
})



/* ========SCROLL========= */
const header = document.getElementById("header")

window.addEventListener( "scroll", () =>{
    if( window.scrollY >= 50 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})


//Selecciono donde voy a colocar los item del array
const contenedorArticulos = document.getElementById("products-list")

//para el carrito de comprar creo un array vacio
let shoppingCart = []

//contenedero del carrito de compras
const contenedorshoppingCart = document.getElementById("contenedor-productos")

//para vaciar el carrito de compras
const botonEliminar = document.getElementById("eliminar-todos")

//selecciono el contador
const contador = document.getElementById("cart-counter")

//para el precio total
const preciototal = document.getElementById("preciototal")


//Elimino del storage y del DOM
botonEliminar.addEventListener('click', () => {
    localStorage.removeItem('shoppingCart');
    items.map ( x => x.cantidad = 1) /* Debo olocarlo en una funcion */
    items[prodId-1].quantity = items[prodId-1].stockDisponible /* Debo olocarlo en una funcion */
    shoppingCart.length = 0;
    actualizarshoppingCart()
    
})

/* AÑADIR PRODUCTO al body  */
//recorer el array usando forech para agregar los productos

items.forEach((articulos) => {
    const div = document.createElement("div")
    div.classList.add("productos")
    div.innerHTML = `
    <h2>${articulos.name}</h2>
    <img class="img-product"src=${articulos.image} alt="">
    <p class="categoria"> Categoria: ${articulos.category}</p>
    <p class="price">Precio $${articulos.price}</p>
    <p>Cantidad: 1 </p>
    <button id="button${articulos.id}" class="btn-add">Agregar al shoppingCart</button>
    
    `
    contenedorArticulos.appendChild(div) //añado el div (Nodo)
    //selecciono el boton
    const boton = document.getElementById(`button${articulos.id}`)
    boton.addEventListener('click', () => {
        agregarAlshoppingCart(articulos.id)
    } )

    

});

const disminuirStock = (prodId) => items[prodId-1].quantity -= 1




//Agregor articulos.id
const agregarAlshoppingCart = (prodId) => {
    const existe = shoppingCart.some ( prod => prod.id === prodId)
        if (existe) {
          const prod = shoppingCart.map(prod => {
                if ( items[prodId-1].quantity > 0) {
                    if (prod.id === prodId ) {
                        items[prodId-1].quantity -= 1
                        prod.cantidad++
                           
                    } else {
                        return console.log("stock llego al maximo")
                    }
                }
            })  
        } else {
            /* con el contador del principio comienzo desde 1*/
            const item = items.find( (propiedad) => propiedad.id === prodId)
            items[prodId-1].quantity -= 1
            shoppingCart.push(item)
        }
        actualizarshoppingCart()
}

//Eliminar
const eliminarDelshoppingCart = (prodId) => {
    const item = shoppingCart.find((producto) => producto.id === prodId ) 
    const indice = shoppingCart.indexOf(item)
    items[prodId-1].cantidad = 1
    items[prodId-1].quantity = items[prodId-1].stockDisponible
    shoppingCart.splice(indice, 1)
    if (shoppingCart.length === 0) {
        localStorage.removeItem('shoppingCart');
    }
    actualizarshoppingCart()
    
}

//Actualizar
const actualizarshoppingCart = () => {

    contenedorshoppingCart.innerHTML = ""
        shoppingCart.forEach((producto) => {
            const div = document.createElement("div")
            div.classList.add("cart-items")
            div.innerHTML =`
            <p> Nombre: ${producto.name}</p>
            <p> Precio Unitario: ${producto.price}</p>
            <p>Cantidad: ${producto.cantidad} </p>
            <p>Stock Disponible: ${producto.quantity} </p>
            <button onclick="eliminarDelshoppingCart(${producto.id})" class="boton-eliminar">Eliminar</button>
            `

            contenedorshoppingCart.appendChild(div)

            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        })
        //Agrego el valor del contador
        contador.innerText = shoppingCart.reduce( (acumulador, producto) => 
                                                acumulador + producto.cantidad, 0) 
        preciototal.innerText = shoppingCart.reduce( (acumulador, producto) => 
                                                acumulador + producto.price * producto.cantidad, 0) 
}