
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

function consultarDonacionesDonador()
{
	var key="";
    var donacion="";
    refDonaciones.orderByChild('Correo').equalTo(LoginUSer.correo).on("value", function(snapshot) 
    {
           
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
            key=data.key
            console.log(donacion[key]);
            visualizarDonacionxdonador(donacion[key],key);
        });
        
    });

}

function visualizarDonacionxdonador(donacion,key)
{ 
        key='"'+key+'"'; // toco fomatear la varaible con comillas
        $("#DonationsContainerDonor").append("\
        				<div class='card card-expandable'>\
        				<div class='card-content'>\
        				<div class='bg-color-yellow' style='height: 300px'>\
        				<div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small>  </div>\
        				<a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
        				</div>\
        				<div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.Correo+"<br> <strong>Empresa: </strong>"+donacion.Donador+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                       		</div>\
                       		</div>\
                       		<button onclick='EliminarDonations("+key+")'> Eliminar </button onclick='mostrarDonacionModificar("+donacion+","+key+")''> <button>Modificar</button>");        
}

function visualizarDonacion(donacion)
{ 
        // funcion que mostrara los primeros detalles de la donador, direccion
        //console.log(donacion);
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
		Donador:LoginUSer.Empresa,
		Correo:LoginUSer.correo,
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



function EliminarDonations(key)
{
	console.log(key)
	refDonaciones.child(key).remove();
	recargarDonations();

}


function recargarDonations()
{
	limpiarDonacionesDonador();
	consultarDonacionesDonador();

}

function mostrarDonacionModificar(donacion,key)
{
	var horario=donacion.Horario.split("-");
		document.getElementById("txtUbicacionm").value=donacion.Dirección
		document.getElementById("txtHorarioAtencionIniciom").value=horario[0];
		document.getElementById("txtHorarioAtencionFinalm").value=horario[1];
		document.getElementById("txtFechaCaducacionm").value=donacion.fechaCaducacion;
		document.getElementById("txtContactom").value=donacion.telefono;
		document.getElementById("txtNomProductom").value=donacion.productos[0].producto;
		document.getElementById("txtCantidadProductom").value=donacion.productos[0].cantidad;
				//unidad:document.getElementById(""),
		document.getElementById("txtNotasm").value=	donacion.anotaciones;

}

function modificarDonacion(donacion,key)
{
 /*
 refDonaciones.child(key).remove();-> eliminar

firebase.database().refDonaciones.child(key).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });

 firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
 */
}

function limpiarDonacionesDonador()
{
	$("#DonationsContainerDonor").empty();
}
