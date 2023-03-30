// Al cargar la página envia una petición al servidor para borrar todos los elementos
window.onload = async function(){
    try{
        await fetch(`http://127.0.0.1:5000/eliminar`);
    }
    catch(error){
        console.error("Error de reload: ", error)
    }
}

async function Display(inputvalor){
    // Añade en el "Display" el valor del input que se ha presionado
    document.getElementById('Display').value = document.getElementById('Display').value + inputvalor;
    // Se realizan cambios para que no haya errores de envio con inputs problematicos
    if (inputvalor == "√("){
        inputvalor = "sqrt("
    }
    if (inputvalor == "π"){
        inputvalor = "pi"
    }
    if (inputvalor == "/"){
        inputvalor = "8/"
    }
    if (inputvalor == "."){
        inputvalor = "8."
    }
    if (inputvalor == "^("){
        inputvalor = "**("
    }
    try{
        // Envia una petición al servidor para añadir el input
        await fetch(`http://127.0.0.1:5000/display/${encodeURIComponent(inputvalor)}`);
    }
    catch(error){
        console.error("Error de input no contemplado: ", error)
    }
}

async function Eliminar(){
    // Elimina todo el "Display"
    document.getElementById('Display').value = null;
    try{
        // Envia una petición al servidor para eliminar todos los elementos
        await fetch(`http://127.0.0.1:5000/eliminar`);
    }
    catch(error){
        console.error("Error de eliminado: ", error)
    }
}

async function Borrar(){
    // Borra el último elemento en el "Display"
    document.getElementById('Display').value =  document.getElementById('Display').value.slice(0,-1);
    try{
        // Envia una petición al servidor para borrar el último elemento
        await fetch(`http://127.0.0.1:5000/borrar`);
    }
    catch(error){
        console.error("Error de borrado: ", error)
    }
}

async function Calcular(){
    try{
        // Envia una petición al servidor para realizar el cálculo
        const response = await fetch(`http://127.0.0.1:5000/calcular`);
        const data = await response.json();
        if (data.solucion == "infinito"){
            data.solucion = "∞"
        }
        // Cambia el "Display" por el valor recibido del servidor
        document.getElementById("Display").value = data.solucion;
    }
    catch(error){
        console.error("Error de calculo no contemplado: ", error)
    }
}

function Desplegar() {
    // Desplega/oculta el menú "Extra"
    var menu = document.getElementById("Extra");
    menu.style.display = menu.style.display === "none" ? "block" : "none";

    // Cambia la apariencia del botón "Desplegable"
    var desplegable = document.getElementById("Desplegable")
    desplegable.classList.toggle("disabled");
}

// async function ToggleAng(){
//     // Cambia entre radianes y grados
//     try{
//         await fetch(`http://127.0.0.1:5000/angulo`);
//     }
//     catch(error){
//         console.error("Error de toggle: ", error)
//     }
// }