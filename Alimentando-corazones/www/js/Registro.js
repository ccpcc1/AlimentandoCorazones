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
        var databaseService = firebase.database();
        var referencia = databaseService.ref('Users');
        const txtEmail=document.getElementById('txtEmail');
        const txtEmailRegister=document.getElementById('txtEmailRegister');
        const txtPass=document.getElementById('txtPass');
        const txtPassRegister=document.getElementById('txtPassRegister');                
        const btnLogin=document.getElementById('btnLogin');
        const btnOut=document.getElementById('btnSalir');      
        const btnRegistro=document.getElementById('btnRegistro');

        btnLogin.addEventListener("click", e => {
            const email= txtEmail.value;
            const password=txtPass.value;
            const auth=firebase.auth();

            //Logueo
            const promise=auth.signInWithEmailAndPassword(email,password).then(function(result) {
              console.log(result);
               console.log("hasta aqui dio");
               consultarUser(email);
               console.log("paso");
            }).catch(function(error) {
              // An error happened.
            });
        });

        btnRegistro.addEventListener("click", e => {
            const email= txtEmailRegister.value;
            const password=txtPassRegister.value;
            const auth=firebase.auth();

            //Registro
            //Nota: Si se creó la cuenta nueva, el usuario accede automáticamente
            const promise=auth.createUserWithEmailAndPassword(email,password).then(function(result) {
              console.log(result);
               referencia.push({
                    correo: email,
                    Empresa: "",
                    Nit:"",
                    tipoUsuario:1
                });
               console.log("hasta aqui dio");
               consultarUser(email);
               console.log("paso");
            }).catch(function(error) {
              // An error happened.
            });
            //promise.catch( e => console.log(e.message));
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



function ValidarTipoUsuario(num)
{
    var tipoUsu=Number(num)
    switch(tipoUsu)
    {
        case 1://Empresa donadora
            console.log("Empresa donadora");    
            break;

        case 2://Comedores comunitarios
            console.log("Comedores comunitarios");       
            break;

        case 3://Admin ->por silas moscas
            console.log("admin");
            break;

        default:
            console.log("nos hackearon, activar contramedidas");
            break
    }
}



function consultarUser(correo)
{
    referencia.on("child_added", function(snapshot, prevChildKey) {   
  var Users = snapshot.val();
  var user="";
    if(Users.correo===correo)
    {
        user=snapshot.val();
        console.log(user);
    }

    ValidarTipoUsuario(user.tipoUsuario);
  
});
}

