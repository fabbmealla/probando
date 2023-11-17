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

function eliminarReserva (e) {
    const reservas = recuperarReservas()
    const idReserva= e.currentTarget.id;
    const indiceReserva = reservas.findIndex(reserva => reserva.id === idReserva);

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Al hacer click en 'continuar' La reserva será eliminada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then((result) => {
      if (result.isConfirmed) {
        reservas.splice(indiceReserva, 1);
          guardarListaReservas(reservas);
        Swal.fire({
          text: "El turno ha sido eliminado con éxito",
          icon: "success",
        }).then(() => {
          location.reload();
      });
      }
    })
}