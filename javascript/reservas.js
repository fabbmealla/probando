function guardarListaReservas(reservas) {
    return localStorage.setItem("listaReservas", JSON.stringify(reservas))
  }
  
  function recuperarReservas() {
    return JSON.parse(localStorage.getItem("listaReservas"))
  }

  function recuperarUltimaReserva() {
    const reservas = recuperarReservas()
    const ultimaReserva = reservas[reservas.length - 1]
    return ultimaReserva
  }

  /*function eliminarReserva (position) {
    const reservas = recuperarReservas()
    reservas borrar elemento
    guardarListaReservas(reservas)

  }*/