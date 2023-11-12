let reservas = recuperarReservas()

if (!reservas){
    alert("No tenes reservas")
    reservas = []
}

const turno = document.querySelector("#turno")

reservas.forEach((reserva, id) => {
    const reservaDiv = document.createElement("div")

    reservaDiv.innerHTML = `<div>id ${id} ${reserva.nombre}</div>`

    turno.appendChild(reservaDiv)
});


