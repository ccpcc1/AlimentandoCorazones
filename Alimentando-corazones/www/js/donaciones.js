
function consultarDonaciones()
{

	var key="";
    var donacion="";
    var noEstaVencido="";
    refDonaciones.orderByChild('Estado').equalTo("Disponible").on("value", function(snapshot) 
    {
           
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
            key=data.key
            noEstaVencido=validarFechaVencimiento(donacion[key].fechaCaducacion);
            (noEstaVencido)?visualizarDonacion(donacion[key]):cambiarEstado("Vencido",key);
        });
        
    });
}


function cambiarEstado(estado,key)
{
  //utilizar update
  refDonaciones.child(key).update({Estado:estado},function(error)
 	{
  		if (error) 
  		{
    		console.log("no se cambiar el estado de la donacion " + error);
  		} 
  		else 
  		{
   		 	
   		 	console.log("estado actualizado exitosamente");
   		 	
  		}
	});
}

function estaReservada()
{
	var key="";
    var donacion="";
    var fechaActual= new Date();
    refDonaciones.orderByChild('Estado').equalTo("Reservado").on("value", function(snapshot) 
    {
        // mirar con una fecha individual que si ya pasaron 5 horas cambie el estado o acordar cuantas horas estaria reservado   
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
        	key=data.key
        	var fechaReservacion=donacion[key].FechaReservacion; //recordar que esta fecha tiene que ser tomada con minutos y milisegundos
        	((fechaActual-fechaReservacion*3600000)<=5)? "":cambiarEstado("Disponible",key); //*3600000 porque se da en limisegundos
           
            // 
            //noEstaVencido=validarFechaVencimiento(donacion[key].fechaCaducacion);
            //(noEstaVencido)?visualizarDonacion(donacion[key]):console.log("cambiar estado a vencido a algo asi");
        });
        
    });
}

function validarFechaVencimiento(fecha)
{
	var fechaDonacion= new Date(fecha);
	fechaDonacion.setDate(fechaDonacion.getDate()+1);// siempre resetea los dias con uno menos
	fechaDonacion.setHours(23);// para que las horas queden siempre a las 11 de la noche
	const CURRENT_FECHA=new Date();
	return (CURRENT_FECHA<=fechaDonacion);

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
        var donacionTemp= new Object();
        donacionTemp = donacion;
        console.log("donacion temporal");
        console.log(donacionTemp);
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
                       		<div class='card-footer botonesCards card'><a onclick='EliminarDonations("+key+")' class='link'> Eliminar </a> <a onclick='mostrarDonacionModificar("+key+")' class='link'>Modificar</a></div>");        
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
                     </div>\
                     <div class='card-footer botonesCards card'><a  class='link'> Agregar a canasta </a> <a class='link'><img class='whatsapp' src='img/whatsapp.png'>whatsapp</a></div>");  


      
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
    nuevaDonacion.className=" ocultar";
    donador.className=" page animated slideInUp ";
    recargarDonations();

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

function mostrarDonacionModificar(key)
{

    interfazModificarDonacionDonador();
    var currentDonation=consultaDonacionEspecifica(key);
	//var horario=currentDonation.Horario.split("-");
		document.getElementById("txtUbicacionm").value=currentDonation.Dirección
		document.getElementById("txtHorarioAtencionm").value=currentDonation.Horario;
		document.getElementById("txtFechaCaducacionm").value=currentDonation.fechaCaducacion;
		document.getElementById("txtContactom").value=currentDonation.telefono;
		document.getElementById("txtNomProductom").value=currentDonation.productos[0].producto;
		document.getElementById("txtCantidadProductom").value=currentDonation.productos[0].cantidad;
				//unidad:document.getElementById(""),
		document.getElementById("txtNotasm").value=	currentDonation.anotaciones;
		document.getElementById("modificarDonacionActual").value=key;

}

function consultaDonacionEspecifica(key)
{

    var donacionModificando="";
    refDonaciones.child(key).on("value", function(snapshot) 
    {
        console.log(snapshot.val());
        donacionModificando=snapshot.val();   
    });
    return donacionModificando;
}

function modificarDonacion()
{
	const KEY=document.getElementById("modificarDonacionActual").value;
	var currentDonationModif=
	{
		Donador:LoginUSer.Empresa,
		Correo:LoginUSer.correo,
		Dirección:document.getElementById("txtUbicacionm").value,
		Horario:document.getElementById("txtHorarioAtencionm").value,
		fechaCaducacion:document.getElementById("txtFechaCaducacionm").value,
		telefono:document.getElementById("txtContactom").value,
		productos:
		[
			{

				producto:document.getElementById("txtNomProductom").value,
				cantidad:document.getElementById("txtCantidadProductom").value,
				//unidad:document.getElementById(""),
			}
		],
		anotaciones:document.getElementById("txtNotasm").value,	
		Estado:"Disponible"	
	}
	console.log(KEY);
 	refDonaciones.child(KEY).update(currentDonationModif,function(error)
 	{
  		if (error) 
  		{
    		alert("no se pudo actualizar la información " + error);
  		} 
  		else 
  		{
   		 	//mensaje actualizacion exitosa-> redireccionar al home
   		 	alert("información exitosamente guardada ");
   		 	interfazDonador();
  		}
	});
  
}


function limpiarDonacionesDonador()
{
	$("#DonationsContainerDonor").empty();
}
