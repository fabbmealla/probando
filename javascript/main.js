const reservarTurnosMedicos = document.querySelector("#reserva");

const Mostrarespecialidades = async () => { 
    const response = await fetch("./especialidades.json")
    const especialidades = await response.json()
    
    especialidades.forEach(especialidad => {
        let contenedorEspecialidad = document.createElement("div");
        contenedorEspecialidad.innerHTML = `<div class="card cardEsp">
        <img src="${especialidad.img}" class="card-img-top" alt="...">
         <div class="card-body">
          <h5 class="card-title">${especialidad.especialidad}</h5>
          <p class="card-text">${especialidad.profesional}</p>
          <p class="card-text"> Días: ${especialidad.atencion}</p>
          <a href="#nuevo-form" class="btn btn-primary" id="${especialidad.id}">Elegir turno disponible</a>
        </div>
      </div>`
        reservarTurnosMedicos.appendChild(contenedorEspecialidad)
    })
};

Mostrarespecialidades ()

//*Parte2*//

const llenarFormulario = document.querySelector("#formulario");
const botones = document.querySelectorAll(".btn");

botones.forEach((boton) => {
    boton.addEventListener("click", () => abrirReserva(boton.id));
});

let reservarTurno = document.createElement("div");

function abrirReserva(especialidadId) {

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

    reservarTurno.innerHTML = `<div class="card card2" id="nuevo-form">
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
            <input type="text" class="form-control" id="validationDefault01" placeholder="Escribir aquí" required>
          </div>
          <div class="mb-3">
            <label for="validationDefault02" class="form-label">DNI</label>
            <input type="number" class="form-control" id="validationDefault02" placeholder="Escribir aquí" required>
          </div>
          <div class="mb-3">
            <label for="validationDefault03" class="form-label">Teléfono</label>
            <input type="number" class="form-control" id="validationDefault03" placeholder="Escribir aquí" required>
          </div>
          <div class="mb-3">
            <label for="validationDefault04" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="validationDefault04" placeholder="Escribir aquí" required>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3 primaryBoton" id="submit">Reservar turno</button>
          </div>
    </div>

    </form> 
    </div>
    `;

    llenarFormulario.appendChild(reservarTurno);

    /**parte 3**/
    const confirmarTurno = document.querySelector("#formulario");
    let confirmarReserva = document.createElement("div");

    confirmarTurno.addEventListener("submit", (e) => {
        e.preventDefault();
        mostrarTurno(confirmarTurno, confirmarReserva, especialidadClick)
    });

}

function mostrarTurno(confirmarTurno, confirmarReserva, especialidadClick) {
    let diaSeleccionado = document.querySelector("#selectDia").value;
    let horarioSeleccionado = document.querySelector("input[name=inlineRadioOptions]:checked").value;

    confirmarReserva.innerHTML = `<div class="card card3">
    <h4>¡Turno reservado con éxito!</h4>
    <p> ${especialidadClick.especialidad}</p>
    <p>Día: ${diaSeleccionado}</p>
    <p>Horario: ${horarioSeleccionado} hs.</p>
    <a href="#finalizarRes" class="btn btn-primary" id="finalizar">Finalizar</a> 
    </div>`

    confirmarTurno.appendChild(confirmarReserva);
    
    const botonFinalizar = document.querySelector("#finalizar");
    botonFinalizar.addEventListener("click", () => finalizar(confirmarReserva));
    guardarJson (diaSeleccionado, horarioSeleccionado, especialidadClick)
}

function finalizar(confirmarReserva) {
    confirmarReserva.innerHTML = "<h2>Gracias por haber utilizado nuestro servicio. Recuerde concurrir a la cita con 15 minutos de anticipación.</h2>";
}

function guardarJson (diaSeleccionado, horarioSeleccionado, especialidadClick) {
    let nombreUsuario = document.querySelector("#validationDefault01").value;
    let dni = document.querySelector("#validationDefault02").value;
    let telefono = document.querySelector("#validationDefault03").value;
    let email = document.querySelector("#validationDefault04").value;

    const guardarDatos = {
        Nombre: nombreUsuario,
        DNI: dni,
        Teléfono: telefono,
        Email: email,
        Especialidad: especialidadClick.especialidad,
        Día: diaSeleccionado,
        Horario: horarioSeleccionado
    }

    const usuarioJson = JSON.stringify(guardarDatos)
    localStorage.setItem("Reserva", usuarioJson)
    }