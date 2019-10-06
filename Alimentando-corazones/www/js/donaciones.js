
function consultarDonaciones()
{
  estaReservada();
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
            (noEstaVencido)?visualizarDonacion(donacion[key],key):cambiarEstado("Vencido",key);
        });
        
    });
}


function cambiarEstado(estado,key)
{
  //utilizar update
  var donationChange="";
  if(estado=="Disponible")
  {
    donationChange=
    {
      Estado:estado
    }
  }
  else
  {
    donationChange=
    {
        Estado:estado, 
        reservacion:
        {
          CorreoReservacion:"",
          FechaReservacion: ""
        }
    }
    
  }
  //
  refDonaciones.child(key).update(donationChange,function(error)
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
        	var fechaReservacion=donacion[key].reservacion.FechaReservacion; //recordar que esta fecha tiene que ser tomada con minutos y milisegundos
        	(((fechaActual-fechaReservacion)/3600000)<=5)? "":cambiarEstado("Disponible",key); //*3600000 porque se da en limisegundos
           
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


function visualizarDonacion(donacion,key)
{ 
        key='"'+key+'"'; // toco fomatear la varaible con comillas
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
                     <div class='card-footer botonesCards card'><a onclick='solicitarDonacion("+key+")' class='link'> Agregar a canasta </a> <a href='https://api.whatsapp.com/send?phone=57"+donacion.telefono+"' class='link external'><img class='whatsapp' src='img/whatsapp.png'>whatsapp</a></div>");  


      
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
				unidad:document.getElementById("txtUnidadesProducto").value,
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
		document.getElementById("txtUnidadesProductoM").value=currentDonation.productos[0].unidad,
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
				unidad:document.getElementById("txtUnidadesProductoM").value
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



function solicitarDonacion(key)
{
  //realizar un metodo para limitar la reserva de donación.
    refDonaciones.child(key).update(
    {
    
        Estado:"Reservado", 
        reservacion:
          {
              CorreoReservacion:LoginUSer.correo,
              FechaReservacion: new Date()
          } 
    },
    function(error)
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

//no esta dando la funcion
function CapturarDonacionReservada()
{
  var donacion="";
  var key="";
  refDonaciones.orderByChild('Estado').equalTo("Reservado").on("value", function(snapshot) 
  {
          
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key
          
          if(donacion[key].Correo===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            
            //donacion.push(snapshot.val());
            console.log(donacion[key]);
            visualizarDonacionReservada(donacion[key],key);      
            //visualizar Reservaciones
          }
          
        });
        
  });
}

function visualizarDonacionReservada(donacion,key)
{ 
        console.log(donacion.productos[0].producto);
        key='"'+key+'"'; // toco fomatear la varaible con comillas
        $("#cardsPedidosActuales").append("\
                <div class='card card-expandable'>\
                <div class='card-content'>\
                <div class='bg-color-yellow' style='height: 300px'>\
                <div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small> </div>\
                <a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
                </div>\
                <div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.Correo+"<br> <strong>Empresa: </strong>"+donacion.Donador+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                        </div>\
                     </div>\
                    ");      
}


function limpiarPedidos()
{
  $("#cardsPedidosActuales").empty();
}


function historialVencidos()
{
  refDonaciones.orderByChild('Estado').equalTo("Vencido").on("value", function(snapshot) 
  {
        var key=""; 
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key
          
          if(donacion[key].Correo===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            
            //donacion.push(snapshot.val());
            console.log(donacion[key]);
            visualizarHistvencidos(donacion[key],key);      
            //visualizar Reservaciones
          }
          
        });
        
  });
}

function visualizarHistvencidos(donacion,key)
{
  console.log(donacion.productos[0].producto);
  key='"'+key+'"'; // toco fomatear la varaible con comillas
  $("#cardsHistVenc").append("\
      <div class='card card-expandable'>\
          <div class='card-content'>\
          <div class='bg-color-yellow' style='height: 300px'>\
          <div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small> </div>\
          <a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
          </div>\
          <div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.Correo+"<br> <strong>Empresa: </strong>"+donacion.Donador+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                  </div>\
               </div>\
              "); 
}

function historialEntregados()
{
  refDonaciones.orderByChild('Estado').equalTo("Entregado").on("value", function(snapshot) 
  {
        var key="";  
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key
          
          if(donacion[key].Correo===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            
            //donacion.push(snapshot.val());
            console.log(donacion[key]);
            visualizarHistEntregados(donacion[key],key);      
            //visualizar Reservaciones
          }
          
        });
        
  });
}

function visualizarHistEntregados(donacion,key)
{
  console.log(donacion.productos[0].producto);
  key='"'+key+'"'; // toco fomatear la varaible con comillas
  $("#cardsHistVenc").append("\
      <div class='card card-expandable'>\
          <div class='card-content'>\
          <div class='bg-color-yellow' style='height: 300px'>\
          <div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small> </div>\
          <a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
          </div>\
          <div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.Correo+"<br> <strong>Empresa: </strong>"+donacion.Donador+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                  </div>\
               </div>\
              "); 
}

/*
cardsPedidosActuales
*/