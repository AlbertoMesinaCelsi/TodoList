

const listaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const cuentaTareas = document.querySelector("#cuenta-tareas");

let tareaId = 0; // Contador para generar IDs únicos
const tareas = [];

// Función para actualizar la lista
function actualizarLista() {
    let html = "";
    let tareasCompletadas = 0;

    // Recorrer todas las tareas
    for (let tarea of tareas) {
        // Si la tarea está completada, contarlas
        if (tarea.completada) {
            tareasCompletadas++;
        }

        // Generar el HTML de cada tarea
        html += `
            <li id="tarea-  ${tarea.id}">
                <span class="${tarea.completada ? 'tachado' : ''}  class="bajar"">ID: ${tarea.id} - ${tarea.nombre}</span>
                <input type="checkbox" id="checkbox-tarea-  ${tarea.id}" ${tarea.completada ? 'checked' : ''} onclick="toggleCompletada(${tarea.id})">
                <button class="eliminar" onclick="borrar(${tarea.id})">Eliminar</button>
            </li>
        `;
    }

    // Insertar el HTML generado en el contenedor de tareas
    listaDeTareas.innerHTML = html;

    // Mostrar el conteo de tareas
    cuentaTareas.textContent = `Total de tareas: ${tareas.length} | Tareas completadas: ${tareasCompletadas}`;
}

// Función para agregar una nueva tarea
btnAgregar.addEventListener("click", () => {
    const tarea = tareaInput.value.trim();
    if (tarea === "") return; // No agregar tareas vacías

    tareaId++; // Incrementar el ID
    tareas.push({ id: tareaId, nombre: tarea, completada: false });
    tareaInput.value = ""; // Limpiar el input
    actualizarLista(); // Actualizar la lista de tareas
});

// Función para borrar una tarea
function borrar(id) {
    const index = tareas.findIndex((tarea) => tarea.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        actualizarLista(); // Actualizar la lista después de borrar
    }
}

// Función para marcar/desmarcar una tarea como completada
function toggleCompletada(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada; // Cambiar el estado de la tarea
        actualizarLista(); // Volver a actualizar la lista
    }
}