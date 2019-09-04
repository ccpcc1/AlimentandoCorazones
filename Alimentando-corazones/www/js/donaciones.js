var databaseService = firebase.database();
var refDonaciones = databaseService.ref('Donaciones');


function consultarDonaciones()
{
    refDonaciones.on("child_added", function(snapshot, prevChildKey) 
    {   
    	var donacion = snapshot.val();
        console.log(snapshot.val());
        console.log(snapshot);
        visualizarDonacion(donacion);
    });
}

function visualizarDonacion(donacion)
{ 
        // funcion que mostrara los primeros detalles de la donador, direccion
        console.log(donacion);
        $("#DonationsContainer").append("\
        				<div clas='card'>\
        					<div class='card-header'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+"</div>\
                       		<div class='card-content card-content-padding'><h5>CorreoDonador:"+donacion.email+"</h5><h5>Empresa:"+donacion.Empresa+"</h5><h5>Horario de atencion:"+donacion.Horario+"</h5><h5>fechaCaducacion:"+donacion.fechaCaducacion+"</h5>         <h5>Contacto:"+donacion.telefono+"</h5><h5>anotaciones:"+donacion.anotaciones+"</h5></div>\
                       		<div class='card-footer'>UBICACIÓN: "+donacion.Dirección+"</div>\
                     </div>");  
      
}
