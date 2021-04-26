

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
    /*
    1 =  Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35
     */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            this.marca = "Americano";            
            cantidad = base * 1.15;


            break;
        case '2':
            this.marca = "Asiatico";
            cantidad = base * 1.05;
            break;
        case '3':
            this.marca = "Europeo";
            cantidad = base * 1.35;
            break;

        default:
            break;
    }

    const diferencia = new Date().getFullYear() - this.year;

    cantidad -=((diferencia * 3) * cantidad) / 100;

    /*
    Si el seguro es basico se multiplica por 30% mas
     Si el seguro es completo se multiplica por 50% mas
    */

     if(this.tipo === 'basico'){
         cantidad *= 1.30;
     }else{
         cantidad *= 1.50;
     }

     
     return cantidad;
}



function UI() { }

UI.prototype.llenarOpciones = () => {
    const year = document.querySelector('#year');

    const max = new Date().getFullYear();
    const min = max - 20;

    for (let i = max; i > min; i--) {

        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

UI.prototype.mostrarResultado = (total,seguro) =>{
    const {marca,year,tipo} = seguro;

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class="header">Tu resumen</p>
    
    <p class="font-bold">Marca: <span class="font-normal"> ${marca}</span> </p>
    <p class="font-bold">Año: <span class="font-normal"> ${year}</span> </p>
    <p class="font-bold">Tipo: <span class="font-normal"> ${tipo}</span> </p>
    <p class="font-bold">Total: <span class="font-normal">$ ${total}</span> </p>
    
    `;

    const resultadoDiv = document.querySelector('#resultado');
   

    //MOSTRAR SPINNER

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';


    setTimeout(() => {
        spinner.style.display = "none";//SE BORRA EL ESPINAR
        resultadoDiv.appendChild(div);//MUESTRA EL RESULTADO
    }, 3000);

}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');
    div.textContent = mensaje;

    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    const formulario = document.querySelector('#cotizar-seguro');

    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);



}


const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones();

})


addEventListeners();
function addEventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}



function cotizarSeguro(e) {
    e.preventDefault();

    //READING DATES

    //READING MARC

    const marca = document.querySelector('#marca').value;


    //READING YEAR


    const year = document.querySelector('#year').value;


    //READING TYPE


    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'correcto');

    const resultados = document.querySelector('#resultado div');
    if(resultados !== null){
        resultados.remove();
    }

    //INSERT SEGURO
    const seguro = new Seguro(marca, year, tipo);
    const total =  seguro.cotizarSeguro();
    ui.mostrarResultado(total,seguro);




}