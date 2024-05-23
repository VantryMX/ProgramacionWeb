document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-btn');
    const inmueblesTableBody = document.querySelector('#inmuebles-table tbody');

    var firebaseConfig = {
        apiKey: "AIzaSyA9aZCUntJmqzRPuCPOjtFAWY5UBSn2B1Y",
        databaseURL: "https://app-itcv-87b8a-default-rtdb.firebaseio.com/"
    };

    firebase.initializeApp(firebaseConfig);

    var db = firebase.database();

    // Lógica para obtener y mostrar los registros de inmuebles
    function mostrarRegistrosInmuebles() {
        // Hacer una solicitud al servidor para obtener los registros de inmuebles
        var ref = db.ref("/inmuebles");
        ref.once("value")
            .then(function (snapshot) {
                // Limpiar la tabla antes de agregar nuevos registros
                inmueblesTableBody.innerHTML = '';

                // Iterar sobre los registros y agregarlos a la tabla
                snapshot.forEach(function (childSnapshot) {
                    var registro = childSnapshot.val();
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${registro.numero}</td>
                        <td>${registro.nombre}</td>
                        <td>${registro.caracteristicas}</td>
                        <td>${registro.numero_inventario}</td>
                        <td>${registro.marca}</td>
                        <td>${registro.modelo}</td>
                        <td>${registro.serie}</td>
                        <td>${registro.ubicacion}</td>
                        <td>${registro.observaciones}</td>
                        <td><button class="editar-btn" data-id="${registro.id}">Editar</button></td>
                    `;
                    inmueblesTableBody.appendChild(row);

                    // Agregar un manejador de eventos para el botón de editar
                    const editarBtn = row.querySelector('.editar-btn');
                    editarBtn.addEventListener('click', function (event) {
                        event.preventDefault();

                        // Obtener el ID del registro de Firebase
                        const registroId = childSnapshot.key;

                        // Redirigir a la página de edición con el ID del registro como un parámetro en la URL
                        window.location.href = '/editar.html?id=' + registroId;
                    });
                });
            })
            .catch(error => {
                console.error('Error al obtener los registros de inmuebles:', error);
            });
    }

    // Manejador de eventos para el botón de cerrar sesión
    logoutButton.addEventListener('click', function () {
        firebase.auth().signOut()
            .then(() => {
                console.log('Usuario cerró sesión');
                window.location.href = '/login.html'; // Redirige al usuario a la página de inicio de sesión después de cerrar la sesión
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    function mostrarInformacionUsuario() {
        const user = firebase.auth().currentUser;
        const bienvenidoContainer = document.getElementById('bienvenido-container');

        if (user) {
            // El usuario está iniciado sesión
            bienvenidoContainer.innerHTML = `
                <h1>Bienvenido</h1>
                <p>${user.email}</p>
            `;
        } else {
            // No hay usuario iniciado sesión
            bienvenidoContainer.innerHTML = `
                <h1>Bienvenido</h1>
                <p>No hay usuario iniciado sesión</p>
            `;
        }
    }

    // Manejar el estado de autenticación del usuario
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // El usuario ha iniciado sesión
            mostrarInformacionUsuario();
            mostrarRegistrosInmuebles();
        } else {
            // No hay usuario iniciado sesión
            console.log('No hay usuario iniciado sesión');
        }
    });
});