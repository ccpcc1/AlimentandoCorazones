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
            let email= txtEmail.value;
            let password=txtPass.value;
            const auth=firebase.auth();

            //Logueo
            const promise=auth.signInWithEmailAndPassword(email,password).then(function(result)
            {
                console.log(result);
                consultarUser(email);
                limpiarCamposLogin()
               
            }).catch(function(error) 
            {
              alert("a ocurrido un error: "+error);
            });
        });

        btnRegistro.addEventListener("click", e => {

            let email= txtEmailRegister.value;
            let password=txtPassRegister.value;
            let txtTipousuario=document.getElementById("txtTipousuario").value;
            let txtNomEmpresa=document.getElementById("txtNomEmpresa").value;
            const auth=firebase.auth();
            if(email!=="" && password>=6 && txtTipousuario>0 && txtNomEmpresa!=="")
            {


            //Registro
            //Nota: Si se creó la cuenta nueva, el usuario accede automáticamente
            const promise=auth.createUserWithEmailAndPassword(email,password).then(function(result) 
            {
                console.log(result);
                referencia.push({
                    correo: email,
                    Empresa: txtNomEmpresa,
                    tipoUsuario:txtTipousuario
                });
                alert("Registro exitoso");
                limpiarCamposRegistro();
                consultarUser(email);

               
            }).catch(function(error) {
              alert("a ocurrido un error: "+error);
            });
            //promise.catch( e => console.log(e.message));
            }
            else
            {
                alert("por favor rellenar la totalidad de los campos para registrarse");
            }
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
    console.log("entro a la funcion");
    
    var tipoUsu=Number(num)
    switch(tipoUsu)
    {
        case 1://Empresa donadora
            alert("Empresa donadora");
            console.log("Empresa donadora");    
            break;

        case 2://Comedores comunitarios
            alert("Comedores comunitarios");
            console.log("Comedores comunitarios");       
            break;

        case 3://Admin ->por silas moscas
            alert("admin");
            console.log("admin");
            break;

        default:
            alert("nos hackearon, activar contramedidas");
            console.log("nos hackearon, activar contramedidas");
            break
    }
}



function consultarUser(correo)
{
    console.log("entro a la funcion 1");
    var databaseService = firebase.database();
    var referencia = databaseService.ref('Users');
    console.log("antes de la consulta");
    referencia.on("child_added", function(snapshot, prevChildKey) {   
    var Users = snapshot.val();
    var user="";
    if(Users.correo===correo)
        {
            user=snapshot.val();
            console.log(user);
            console.log("el tipo de usu es: "+user.tipoUsuario);
            ValidarTipoUsuario(user.tipoUsuario);
            return "";
        }  
  
    });
}

function limpiarCamposRegistro()
{
    document.getElementById('txtEmailRegister').value="";
    document.getElementById("txtPassRegister").value=""; 
    document.getElementById("txtNomEmpresa").value="";

}

function limpiarCamposLogin()
{
    txtEmail=document.getElementById('txtEmail').value="";
    txtPass=document.getElementById('txtPass').value="";
}


