function cambiarEstado(estado,key)
{
  var donationChange="";
  if(estado=="Disponible")
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
  else
  {
    donationChange=
    {
        Estado:estado   
    }  
  }
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
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          //recordar que al traer la fechaReservacion esta en otra zona horaria, pero al parecer la tranforma internamente a la hora local
        	key=data.key
        	 //recordar que esta fecha tiene que ser tomada con minutos y milisegundos
        	if(donacion[key].reservacion.hasOwnProperty("FechaReservacion"))
            {
              var fechaReservacion= new  Date(donacion[key].reservacion.FechaReservacion);
              var algo=((fechaActual.getTime()-fechaReservacion.getTime()));
              console.log(donacion[key]);
              console.log("fecha resrvacion es: "+donacion[key].reservacion.FechaReservacion);
              console.log("fecha actual es: "+fechaActual);
              console.log("La resta es: "+algo/(1000*60*60));
              (((fechaActual-fechaReservacion)/(1000*60*60))<5)? "":cambiarEstado("Disponible",key); //*3600000 porque se da en limisegundos
           
            }
          
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
  estaReservada();
    var key="";
    var donacion="";
    var noEstaVencido="";
    refDonaciones.orderByChild('Correo').equalTo(LoginUSer.correo).on("value", function(snapshot) 
    {
           
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
            key=data.key
            if (donacion[key].Estado==="Disponible")
            {
              console.log(donacion[key]);
              noEstaVencido=validarFechaVencimiento(donacion[key].fechaCaducacion);
              (noEstaVencido)?visualizarDonacionxdonador(donacion[key],key):cambiarEstado("Vencido",key);
            }   
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
        				<div class='card card-expandable busquedaDonaciones'>\
        				<div id="+donacion.productos[0].producto+" class='card-content '>\
        				<div class='bg-color-yellow' style='height: 300px'>\
        				<div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small>  </div>\
        				<a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
        				</div>\
        				<div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.Correo+"<br> <strong>Empresa: </strong>"+donacion.Donador+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                       		</div>\
                       		</div>\
                       		<div class=' busquedaDonacionesBar card-footer botonesCards card'><a onclick='EliminarDonations("+key+")' > Eliminar </a> <a onclick='mostrarDonacionModificar("+key+")' class='link'>Modificar</a></div>");        
}


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
		Estado:"Disponible",
    num_estrellas:0,
    nocalificaciones:0

	}
	console.log(donacion);
	ingresarDonacion(donacion);	
    nuevaDonacion.className=" ocultar";
    donador.className=" page animated slideInUp ";
    recargarDonations();

}


function ingresarDonacion(donacion)
{
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
   		 	alert("información exitosamente guardada ");
   		 	interfazDonador();
  		}
	});  
}


function limpiarDonacionesDonador()
{
	$("#DonationsContainerDonor").empty();
}

function CapturarDonacionReservada()
{
  var donacion="";
  var key="";
  refDonaciones.orderByChild('Estado').equalTo("Reservado").on("value", function(snapshot) 
  {   
        limpiarPedidos();
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key
          
          if(donacion[key].Correo===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            console.log(donacion[key]);
            visualizarDonacionReservada(donacion[key],key);      
          } 
        }); 
  });
}

function visualizarDonacionReservada(donacion,key)
{ 
        console.log(donacion.productos[0].producto);
        var KEY=key;
        var key='"'+key+'"';

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
                    <div class=' busquedaDonacionesBar card-footer botonesCards card'><button id='Entregado"+key+"'  class='col button button-fill color-green'>ENTREGADO</button> </div>");      

          document.getElementById('Entregado'+key).addEventListener("click",
                    function()
                    {
                        console.log("entro a recibido");
                        cambiarEstado('Entregado',KEY);
                        limpiarPedidos();
                        CapturarDonacionReservada();
                    });
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
            console.log(donacion[key]);
            visualizarHistvencidos(donacion[key],key);      
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
            visualizarHistEntregadosDonador(donacion[key],key);      
            //visualizar Reservaciones
          }
          
        });
        
  });
}

function visualizarHistEntregadosDonador(donacion,key)
{
  console.log(donacion.productos[0].producto);
  key='"'+key+'"'; // toco fomatear la varaible con comillas
  $("#cardsHistorialEntregado").append("\
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

function historialRecibidos()
{
  refDonaciones.orderByChild('Estado').equalTo("Recibido").on("value", function(snapshot) 
  {
        var key="";  
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key          
          if(donacion[key].Correo===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            console.log(donacion[key]);
            visualizarHistRecibidosDonador(donacion[key],key);      
          }
        });        
  });
}

function visualizarHistRecibidosDonador(donacion,key)
{
  console.log(donacion.productos[0].producto);
  key='"'+key+'"'; // toco fomatear la varaible con comillas
  $("#cardsHistorialRecibido").append("\
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

function LimpiarHistorial()
{
  $("#cardsHistVenc").empty();
  $("#cardsHistorialEntregado").empty();
  $("#cardsHistorialRecibido").empty();

  
}

function LimpiarPerfilBeneficiario()
{
  $("#DonationsContainer").empty();
}


function pintarCalificacionDonador()
{
  document.getElementById("barCalificacion").innerText=LoginUSer.num_estrellas;
}

/*

*/