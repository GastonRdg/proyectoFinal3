const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito")

let = carrito =  JSON.parse(localStorage.getItem("carrito")) || []; // lo que sea que este guardado en el loca y agregando "||" por si esta vacio se hace el array vacio

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    
    <img src ="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price"> $ ${product.precio}  </p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar"

    content.append(comprar);

    comprar.addEventListener("click", () =>{

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id); // al carito con some buscamos un producto repetido repeatproducto que sea igual al producrt.id
    

    if (repeat){          //repeat === true 
        carrito.map((prod) => {
            if(prod.id === product.id){
                prod.cantidad++;
            }
        })
    } else{
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
        console.log(carrito);
        //carritoCounter();
        saveLocal();
        }
        

        
    });
});
//el local me va a ayudar a si refreco la pagina no se me borren los productos que agregue al carrito 
//set item
const saveLocal = () => {

 localStorage.setItem("carrito",JSON.stringify(carrito));

}




//verCarrito.addEventListener("click",() =>{
    const pintarCarrito = () => {

    
    modalContainer.innerHTML = "" // limpia el carrito y hace que no se repita 
    modalContainer.style.display= "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className =  "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () =>{

        modalContainer.style.display = "none"; // tocando la "x" desaparece
    })

    modalHeader.append(modalbutton);
    

    carrito.forEach((product) => {

    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `

    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p> $ ${product.precio}</p>   
    <p> cantidad: ${product.cantidad}
    <p> Total: ${product.cantidad * product.precio}</p>
    `;
    modalContainer.append(carritoContent);
    

    let eliminar = document.createElement("span");
    eliminar.innerText = "❌";
    eliminar.className = "delete-product"
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);

    })


   const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0); // "acc"= acumulador y "el" representa cada uno de los productos  

   const totalBuying = document.createElement("div");
   totalBuying.className = "total-content";
   totalBuying.innerHTML = `totala pagar: ${total} $`;
   modalContainer.append(totalBuying);
//});
}
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {

    const foundId = carrito.find ((element) => element.id);

    carrito = carrito.filter((carritoId) => {

        return carritoId !== foundId;
    })
    pintarCarrito();
}


// buscar error 

//const carritoCounter = () =>{
  //  cantidadCarrito.style.display = "block"; // pasar cantidad carrito que esta en display none a block para que se vea la cantidad al lado del carrito
    //cantidadCarrito.innerText = carrito.length;  
//};
