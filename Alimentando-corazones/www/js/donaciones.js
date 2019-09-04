var databaseService = firebase.database();
var refDonaciones = databaseService.ref('Donaciones');


function consultarDonaciones()
{
    refDonaciones.on("child_added", function(snapshot, prevChildKey) 
    {   
    //var donacion = snapshot.val();
        console.log(snapshot.val());
        console.log(snapshot.key());
        //VisualizarDonacion(donacion);
    });
}

function VisualizarDonacion(donacion)
{
        // funcion que mostrara los primeros detalles de la donador, direccion
}
