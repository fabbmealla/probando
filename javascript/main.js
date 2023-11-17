let especialidades = []

fetch("./javascript/especialidades.json")
  .then(response => response.json())
  .then(data => {
    especialidades = data;
    mostrarEspecialidades(especialidades);
    const botones = document.querySelectorAll(".btn");
    botones.forEach((boton) => {
    boton.addEventListener("click", () => abrirReserva(boton.id));
    })
  })

const reservarTurnosMedicos = document.querySelector("#reserva");
const llenarFormulario = document.querySelector("#formulario");
const divAceptar = document.querySelector("#aceptar")

function mostrarEspecialidades(tarjetitasEspecialidades) {
    tarjetitasEspecialidades.forEach(especialidad => {
        let contenedorEspecialidad = document.createElement("div");
        contenedorEspecialidad.innerHTML = `<div class="card cardEsp">
        <img src="${especialidad.img}" class="card-img-top" alt="...">
         <div class="card-body">
          <h5 class="card-title">${especialidad.especialidad}</h5>
          <p class="card-text">${especialidad.profesional}</p>
          <p class="card-text"> Días: ${especialidad.atencion}</p>
          <a href="#nuevo-form" class="btn btn-primary" id="${especialidad.id}">Elegir turnos disponibles</a>
        </div>
      </div>`
        reservarTurnosMedicos.appendChild(contenedorEspecialidad)
    });
} 

function abrirReserva(especialidadId) {
  llenarFormulario.innerHTML =""
  
    const especialidadClick = especialidades.find(especialidad => especialidad.id == especialidadId)

    let opciones = ""
    especialidadClick.atencionDias.forEach((dia) => {
        opciones = opciones + `<option value="${dia}">${dia}</option>`
    })

    let horarios = ""

    especialidadClick.horarios.forEach((horario) => {
        horarios = horarios + `<div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="${horario}">
        <label class="form-check-label" for="inlineRadio1">${horario}hs</label>
        </div>`
    })

    llenarFormulario.innerHTML = `<div class="card card2" id="nuevo-form">
    <form class="formulario container margin-top" id="formulario">
    <h2>Usted ha elegido la especialidad ${especialidadClick.especialidad}</h2>

    <div class="margin-top">
        <label for="validationDefault04" class="form-label">Días de atención</label>
        <select class="form-select" id="selectDia" required>
        <option selected disabled value="">Por favor escoja el día</option>
        ${opciones}
        </select>
    </div>

    <div class="margin-top"> 
        <p>Escoja el horario</p>
        ${horarios}
    </div>

    <div class="margin-top"> 
          <div class="mb-3">
            <label for="validationDefault01" class="form-label">Nombre y Apellido</label>
            <input type="text" class="form-control" id="validationDefault01" value="hola" placeholder="Escribir aquí" required>
          </div>
          <div class="mb-3">
            <label for="validationDefault02" class="form-label">DNI</label>
            <input type="number" class="form-control" id="validationDefault02" value="123" placeholder="Escribir aquí" required>
          </div>
          <div class="mb-3">
            <label for="validationDefault03" class="form-label">Teléfono</label>
            <input type="number" class="form-control" id="validationDefault03" value="123" placeholder="Escribir aquí" required>
          </div>
          <div class="mb-3">
            <label for="validationDefault04" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="validationDefault04" value="hola@tuprima.chet" placeholder="Escribir aquí" required>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3 primaryBoton" id="submit">Reservar turno</button>
          </div>
    </div>

    </form> 
    </div>
    `;

    llenarFormulario.addEventListener("submit", (e) => {
        e.preventDefault();
        Swal.fire({
          title: "Confirmar Reserva",
          icon: "question",
          html: "¿Estás seguro que deseas tomar el turno?",
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            guardarJson(especialidadClick)
            mostrarTurno();
          } else if (result.isDenied) {
            /*tiene que volver*/;
          }
        }); 
    });
}

function mostrarTurno() {
    const ultimaReserva = recuperarUltimaReserva()
    Swal.fire({
      title: "¡Turno reservado con éxito!",
      text: `${ultimaReserva.especialidad} el día: ${ultimaReserva.dia}.
      Horario: ${ultimaReserva.horario} hs.`,
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Finalizar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Gracias por haber utilizado nuestro servicio. <br>Recuerde concurrir a la cita con 15 minutos de anticipación.",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        llenarFormulario.innerHTML = ""
        divAceptar.innerHTML = ""
        window.scrollTo(0,0);
      }
    });
}

function guardarJson (especialidadClick) {
    let diaSeleccionado = document.querySelector("#selectDia").value;
    let horarioSeleccionado = document.querySelector("input[name=inlineRadioOptions]:checked").value;
    let nombreUsuario = document.querySelector("#validationDefault01").value;
    let dni = document.querySelector("#validationDefault02").value;
    let telefono = document.querySelector("#validationDefault03").value;
    let email = document.querySelector("#validationDefault04").value;

    const guardarDatos = {
        nombre: nombreUsuario,
        dni: dni,
        telefono: telefono,
        email: email,
        especialidad: especialidadClick.especialidad,
        dia: diaSeleccionado,
        horario: horarioSeleccionado
    }
    let listaReservas = recuperarReservas()
    if (!listaReservas) {
      listaReservas = []
    }
    listaReservas.push(guardarDatos)
    guardarListaReservas(listaReservas)
}