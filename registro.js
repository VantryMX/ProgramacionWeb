document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroform');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.querySelector('input[name="nombre_usuario"]').value;
        const password = document.querySelector('input[name="contraseña"]').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('Usuario registrado con éxito');
                window.location.href = '/registro_exitoso.html';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});