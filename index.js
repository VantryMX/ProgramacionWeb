document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginform'); // Asegúrate de que este ID coincide con el ID de tu formulario de inicio de sesión

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Obtiene los datos del formulario
        const email = document.querySelector('input[name="correo"]').value;
        const password = document.querySelector('input[name="contraseña"]').value;

        // Inicia sesión con Firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // El usuario inició sesión con éxito
                console.log('Inicio de sesión exitoso');
                window.location.href = '/index.html'; // Redirige al usuario a la página principal después del inicio de sesión exitoso
            })
            .catch((error) => {
                // Hubo un error al iniciar sesión
                console.error('Error:', error);
            });
    });
});