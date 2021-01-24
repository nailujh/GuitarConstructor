
// ajax que accede a los datos del dom
 $.ajax({
    method: 'GET',
    url: "data/guitarras.json",
    dataType: 'json',
}).done(function (d) {
    constructor = d;
})


// constantes en el domm
const $selectTapa = $("#Tapa");
const $selectArosYFondo= $("#ArosYFondo");
const $selectTastiera = $("#Tastiera");
const $selectMango = $("#Mango");
const $modal = $("#modal")
const $precioTotal = $("#precioTotal")
const $reservar = $("#btnReservar");
const $spinner = $("#spinner");
// select hecho en base al los datos del array 
function loadSelect(selectInput, dataArray) {
    for (index in dataArray) {
        selectInput.append(new Option(dataArray[index][0], dataArray[index][0]));
    }
}

// Función que se ejecuta al cargarse el DOM y permite seleccionar opciones
$(document).ready(() => {
    $("#Tapa").val('Seleccione su tapa');
    $("#ArosYFondo").val('Seleccione aros y fondo');
    $("#Tastiera").val('Seleccione tastiera');
    $("#Mango").val('Seleccione mango');
 loadSelect($selectTapa, Tapas);
    loadSelect($selectArosYFondo, ArosYFondos);
    loadSelect($selectTastiera , Tastieras );
    loadSelect($selectMango,  Mangos);
});
  
let precioTapa = 0;
let precioArosyfondo= 0;
let precioTastiera = 0;
let precioMango = 0;
let precioTotal= 0;

 // Función que suma el precio total

function sumTotal() {
    precioTotal = precioTapa + precioArosyfondo + precioTastiera + precioMango ;
    $precioTotal.text(precioTotal);
}

function elejirTapa() {
    Tapas.forEach((value) => {
        if (value[0] === $selectTapa .val()) {
            precioTapa = value[1];
            sumTotal();
        }
    });
    return $selectTapa.val();
}
function elejirArosyFondo() {
    ArosYFondos.forEach((value) => {
        if (value[0] === $selectArosYFondo .val()) {
            precioArosyfondo = value[1];
            sumTotal();
        }
    });
    return $selectArosYFondo.val();
}

function elejirTastiera() {
    Tastieras.forEach((value) => {
        if (value[0] === $selectTastiera .val()) {
           precioTastiera = value[1];
            sumTotal();
        }
    });
    return $selectTastiera.val();
}



function elejirMango() {
    Mangos.forEach((value) => {
        if (value[0] === $selectMango.val()) {
           precioMango = value[1];
            sumTotal();
        }
    });
    return $selectMango.val();
}
// Eventos que funcionan con el cambio del usario
 $selectTapa.on('change', guitarrCompleta);
 $selectArosYFondo.on('change', guitarrCompleta);
$selectTastiera.on('change', guitarrCompleta);
$selectMango.on('change', guitarrCompleta);


let selectguitarra = {};

function guitarrCompleta() {
    guitarraElejida()
     imgGuitarra()
}

function  guitarraElejida() {
    selectguitarra  = {
        
        "Tapa": elejirTapa().toLowerCase(),
        "Tastiera": elejirTastiera().toLowerCase() ,
        "ArosYFondo": elejirArosyFondo().toLowerCase() , 
        "Mango":elejirMango().toLowerCase() 
    }
}

imgGuitarra = function () {
    constructor.forEach(constructor => {
        if (JSON.stringify(constructor) === JSON.stringify(selectguitarra)){
            
            const guitarraElejidaImg = (`img/Maderas/${selectguitarra.Tapa}-${selectguitarra.Tastiera}-${selectguitarra.ArosYFondo}-${selectguitarra.Mango}.jpg`);
            $("#imgSrc").attr('src', guitarraElejidaImg);
            console.log(selectguitarra);
            console.log($("#modalReservar"));
             $("#modalReservar").html(`
                <ul class="p-0">
                    <li><i class="fas fa-bolt"></i> Tapa: ${selectguitarra.Tapa}.</li>
                    <li><i class="fas fa-bolt"></i> Aros y Fondo: ${selectguitarra.ArosYFondo}.</li>
                    <li><i class="fas fa-bolt"></i> Tastiera: ${selectguitarra.Tastiera}.</li>
                    <li><i class="fas fa-bolt"></i> Mango: ${selectguitarra.Mango}.</li>
                    <li class="font-weight-bold"><i class="fas fa-star"></i> Total: USD ${precioTotal}</li>
                    <img src=${guitarraElejidaImg} class="w-100">
                </ul>
            `)
        }
    });
}

$reservar.on('click', pedirReserva);
function pedirReserva(e) {
    e.preventDefault();
    $modal.empty();
    $spinner.show();
      setTimeout(() => {
          $spinner.hide();
           $reservaCreada = $('<p></p>');
        $reservaCreada.html("La reserva se realizó correctamente <i class='far fa-check-circle'></i>");
          $reservaCreada.css({ 'color': 'black', 'text-align': 'center', 'font-weight': 700, 'margin-top': '16px' });
          $(".modal-body").append($reservaCreada);

    }, 500);

}

