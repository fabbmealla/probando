let reservas = recuperarReservas()

const sinReservas = document.querySelector("#sinReservas")

if (!reservas){
    const sinReservaDiv = document.createElement("div")
    sinReservaDiv.innerHTML =`<div class="card cardEsp sinReserva">
        <p class="card-text">Aún no posee reservas</p>
    </div>`
    sinReservas.appendChild(sinReservaDiv)
    reservas = []
}

const turno = document.querySelector("#turno")

reservas.forEach((reserva) => {
    const reservaDiv = document.createElement("div")

    reservaDiv.innerHTML = `<div class="card cardEsp">
     <div class="card-body">
      <h4 class="card-title">${reserva.nombre}</h5>
        <div class="mostrarRes">
        <p>DNI: ${reserva.dni}</p>  
        <p>Teléfono: ${reserva.telefono}</p>  
        <p>E-mail: ${reserva.email}</p>
        <p class="card-text"> Turno para: ${reserva.especialidad}</p>
        <p class="card-text"> Día de atención: ${reserva.dia} a las ${reserva.horario} hs</p>
        </div>
        <a href="#" class="btn btn-primary cancelarTurno" id="${reserva.id}">Cancelar turno</a>
        </div>
     </div>
    </div>`

    turno.appendChild(reservaDiv)

    const botones = document.querySelectorAll(".cancelarTurno");
    botones.forEach((boton) => {
    boton.addEventListener("click", eliminarReserva);
    });
})






