
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
        				<div class='card card-expandable'>\
        				<div class='card-content'>\
        				<div class='bg-color-yellow' style='height: 300px'>\
        				<div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small> </div>\
        				<a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
        				</div>\
        				<div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.email+"<br> <strong>Empresa: </strong>"+donacion.Empresa+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                       		</div>\
                     </div>");  


      
}

// a partir de aqui es la parte del crud del pefil Donador y demas que involucre dicho perfil

function CapturarDonacion()
{
	var donacion=
	{
		Donador:LoginUSer.val().Empresa,
		Correo:LoginUSer.val().correo,
		Dirección:document.getElementById("txtUbicacion").value,
		Horario: document.getElementById("txtHorarioAtencionInicio").value+" - "+ document.getElementById("txtHorarioAtencionFinal").value,
		fechaCaducacion:document.getElementById("txtFechaCaducacion").value,
		telefono:document.getElementById("txtContacto").value,
		productos:
		[
			{

				producto:document.getElementById("txtNomProducto").value,
				cantidad:document.getElementById("txtCantidadProducto").value,
				//unidad:document.getElementById(""),
			}
		],
		anotaciones:document.getElementById("txtNotas").value,	
		Estado:"Disponible"	
	}
	console.log(donacion);
	ingresarDonacion(donacion);	

}


function ingresarDonacion(donacion)
{
	//console.log(donacion);
	refDonaciones.push(donacion);
}

function ConsultarMisDonaciones()
{

}

function EliminarDonations(key)
{

	refDonaciones.child(key).remove();

}


function recargarDonations()
{
	LimpiarDonaciones();
	ConsultarMisDonaciones();

}

function LimpiarDonaciones()
{

}
