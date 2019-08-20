(function() {


        const firebaseConfig = {
            apiKey: "AIzaSyCHYDqXyZHsMa8HBupwUiFEkDJBd0HzRts",
            authDomain: "alimentandocorazones-c4f2c.firebaseapp.com",
            databaseURL: "https://alimentandocorazones-c4f2c.firebaseio.com",
            projectId: "alimentandocorazones-c4f2c",
            storageBucket: "alimentandocorazones-c4f2c.appspot.com",
            messagingSenderId: "717936080130",
            appId: "1:717936080130:web:9c6bef3ca09ea718"
          };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
        const txtEmail=document.getElementById('txtEmail');
        const txtPass=document.getElementById('txtPass');        
        const btnLogin=document.getElementById('btnLogin');
        const btnOut=document.getElementById('btnSalir');      
        const btnRegistro=document.getElementById('btnRegistro');

        btnLogin.addEventListener("click", e => {
            const email= txtEmail.value;
            const password=txtPass.value;
            const auth=firebase.auth();

            //Logueo
            const promise=auth.signInWithEmailAndPassword(email,password);
            promise.catch( e => console.log(e.message));
        });

        btnRegistro.addEventListener("click", e => {
            const email= txtEmail.value;
            const password=txtPass.value;
            const auth=firebase.auth();

            //Registro
            const promise=auth.createUserWithEmailAndPassword(email,password);
            promise.catch( e => console.log(e.message));
        });

        btnOut.addEventListener("click", e => {
            firebase.auth().signOut();
        });

        firebase.auth().onAuthStateChanged(firebaseUser => 
        {
            if (firebaseUser)
            {
                console.log(firebaseUser);
                console.log("mostrar boton cerrar sesión");
            }
            else
            {
                console.log("el usuario no esta logueado");
            }
        })
}());