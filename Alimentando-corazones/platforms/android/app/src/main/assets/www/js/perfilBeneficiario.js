function consultarDonaciones()
{
  estaReservada();
	var key="";
    var donacion="";
    var noEstaVencido="";
    refDonaciones.orderByChild('Estado').equalTo("Disponible").on("value", function(snapshot) 
    {
        limpiarDonacionesBeneficiario();  
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
            key=data.key
            noEstaVencido=validarFechaVencimiento(donacion[key].fechaCaducacion);
            (noEstaVencido)?visualizarDonacion(donacion[key],key):cambiarEstado("Vencido",key);
        });
        
    });
}


function visualizarDonacion(donacion,key)
{ 
        var calificacion=parseInt(donacion.num_estrellas);
        key='"'+key+'"'; // toco fomatear la varaible con comillas
        $("#DonationsContainer").append("\
                        <div  class='card card-expandable busquedaDisponibles'>\
                        <div id="+donacion.productos[0].producto+" class='card-content'>\
                        <div class='bg-color-yellow' style='height: 300px'>\
                        <div class='card-header text-color-black display-block'> PRODUCTO: <span>"+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+"</span> <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small> </div>\
                        <a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
                        </div>\
                        <div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.email+"<br> <strong>Empresa: </strong>"+donacion.Empresa+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                        </div>\
                     </div>\
                     <div class='busquedaDisponiblesBar card-footer botonesCards card'><a onclick='solicitarDonacion("+key+")' class='link'> Agregar a canasta </a> <a href='https://api.whatsapp.com/send?phone=57"+donacion.telefono+"' class='link external'><img class='whatsapp' src='img/whatsapp.png'>whatsapp</a>\
                      <form class='marGen'>\
                    <p class='clasificacion'>\
                        <input id='radio1' type='radio' class='radiO EstrellaVisulizar estrella5"+key+"' name='estrellas' value='5' >\
                        <label class='labEl' for='radio1'>★</label>\
                        <input id='radio2' type='radio' class='radiO EstrellaVisulizar estrella4"+key+"' name='estrellas' value='4' >\
                        <label class='labEl' for='radio2'>★</label>\
                        <input id='radio3' type='radio' class='radiO EstrellaVisulizar estrella3"+key+"' name='estrellas' value='3' >\
                        <label class='labEl' for='radio3'>★</label>\
                        <input id='radio4' type='radio' class='radiO EstrellaVisulizar estrella2"+key+"' name='estrellas' value='2' >\
                        <label class='labEl' for='radio4'>★</label>\
                        <input id='radio5' type='radio' class='radiO EstrellaVisulizar estrella1"+key+"' name='estrellas' value='1' >\
                        <label class='labEl' for='radio5'>★</label>\
                    </p>\
                  </form>\</div>");
        console.log('estrella'+calificacion+key)
                  if(calificacion>0)
                  {
                      for (var i =0;i<document.getElementsByClassName('estrella'+calificacion+key).length;i++)
                      {
                        document.getElementsByClassName('estrella'+calificacion+key)[i].checked=true;   
                      }      
                  }              
  }


function solicitarDonacion(key)
{
  var numeroDonaciones=numeroReservas();
  console.log(numeroDonaciones);
  if (numeroDonaciones<3)
  {
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
              limpiarDonacionesBeneficiario();
              consultarDonaciones();
            }
        });
  }
  else
  {
    alert("Ya posees 3 donaciones en reserva");
  }      
}


function CapturarDonacionReservadaBenef()
{
  var donacion="";
  var key="";
  refDonaciones.orderByChild('Estado').equalTo("Reservado").on("value", function(snapshot) 
  {
        $("#cardsdonacionesReservadas").empty();
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key

          if(donacion[key].reservacion.CorreoReservacion===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            
            //donacion.push(snapshot.val());
            console.log(donacion[key]);
            visualizarDonacionReservadaBenef(donacion[key],key); 
      
            
          }
          
        });
        
  });
}


function visualizarDonacionReservadaBenef(donacion,key)
{ 
        var correo="'"+donacion.Correo+"'";
        var KEY=key;
        var key='"'+key+'"';
        $("#cardsdonacionesReservadas").append("\
                <div class='card card-expandable'>\
                <div class='card-content'>\
                <div class='bg-color-yellow' style='height: 300px'>\
                <div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small> </div>\
                <a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
                </div>\
                <div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.Correo+"<br> <strong>Empresa: </strong>"+donacion.Donador+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                        </div>\
                     </div>\
                <div class='card-footer botonesCards card '>\
                  <a href='#'' id='cancelarReserva"+key+"' class='link'>Cancelar</a>\
          </div>");

          document.getElementById('cancelarReserva'+key).addEventListener("click",
                    function()
                    {
                        cambiarEstado('Disponible',KEY);
                        $("#cardsdonacionesReservadas").empty();
                        CapturarDonacionReservadaBenef();
                    });       
}


function CapturarDonacionEntregadoBenef()
{
  var donacion="";
  var key="";
  refDonaciones.orderByChild('Estado').equalTo("Entregado").on("value", function(snapshot) 
  {
        limpiarDonacionesEntregadas()
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key
          if(donacion[key].reservacion.CorreoReservacion===LoginUSer.correo)
          {
            visualizarDonacionEntregadoBenef(donacion[key],key);            
          }
        });     
  });
}

function visualizarDonacionEntregadoBenef(donacion,key)
{ 
        var KEY=key;
        key='"'+key+'"'; // toco fomatear la varaible con comillas
        $("#cardsdonacionesEntregadasBenef").append("\
                <div class='card card-expandable'>\
                <div class='card-content'>\
                <div class='bg-color-yellow' style='height: 300px'>\
                <div class='card-header text-color-black display-block'> PRODUCTO: "+donacion.productos[0].cantidad+" "+donacion.productos[0].unidad+" de "+donacion.productos[0].producto+" <br> <small style='opacity: 0.7'>UBICACIÓN: "+donacion.Dirección+"</small> </div>\
                <a href='#' class='link card-close card-opened-fade-in color-black' style='position: absolute; right: 15px; top: 15px'> </a>\
                </div>\
                <div class='card-content-padding'> <strong>Correo donador: </strong>"+donacion.Correo+"<br> <strong>Empresa: </strong>"+donacion.Donador+" <br> <strong>Horario de atencion: </strong>"+donacion.Horario+" <br> <strong>fechaCaducacion: </strong>"+donacion.fechaCaducacion+" <br> <strong> Contacto: </strong>"+donacion.telefono+" <br> <strong>anotaciones: </strong>"+donacion.anotaciones+" </div>\
                        </div>\
                     </div>\
                <div class='card-footer botonesCards card '>\
                  <form class='marGen'>\
                    <p id='estrellasBenef"+key+"' class='clasificacion '>\
                        <input id='radio1' type='radio' class='radiO' name='estrellas' value='5'  '>\
                        <label class='labEl' for='radio1'>★</label>\
                        <input id='radio2' type='radio' class='radiO' name='estrellas' value='4' '>\
                        <label class='labEl' for='radio2'>★</label>\
                        <input id='radio3' type='radio' class='radiO' name='estrellas' value='3' '>\
                        <label class='labEl' for='radio3'>★</label>\
                        <input id='radio4' type='radio' class='radiO' name='estrellas' value='2' '>\
                        <label class='labEl' for='radio4'>★</label>\
                        <input id='radio5' type='radio' class='radiO' name='estrellas' value='1' >\
                        <label class='labEl' for='radio5'>★</label>\
                    </p>\
                  </form>\
                  <div><h1>Marcar como:</h1><a id='entregados"+key+"' class='link'>Recibido</a> <a id='calificar"+key+"' class='link'>calificar y marcar</a></div>");
                  document.getElementById('calificar'+key).addEventListener("click",function()
                  {
                    calificarDonador(donacion.Correo, obtenerCalificacion('estrellasBenef'+key));
                    cambiarEstado('Recibido',KEY);
                    CapturarDonacionEntregadoBenef();
                      
                  });      
                  document.getElementById('entregados'+key).addEventListener("click",
                    function()
                    {
                        cambiarEstado('Recibido',KEY);
                        CapturarDonacionEntregadoBenef();
                    });
}

function limpiarDonacionesEntregadas()
{
    $("#cardsdonacionesEntregadasBenef").empty();  
}

function CapturarHistBeneficiario()
{
  var donacion="";
  var key="";
  refDonaciones.orderByChild('Estado').equalTo("Recibido").on("value", function(snapshot) 
  {
        limpiarHistorialBenef();
        donacion=snapshot.val(); 
        snapshot.forEach(function(data) 
        {
          key=data.key  
          if(donacion[key].reservacion.CorreoReservacion===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            visualizarHistBeneficiario(donacion[key],key);            
          }
          
        });     
  });
}

function visualizarHistBeneficiario(donacion,key)
{
  console.log(donacion.productos[0].producto);
  key='"'+key+'"'; // toco fomatear la varaible con comillas
  $("#cardsHistorialBeneficiario").append("\
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

function limpiarHistorialBenef()
{
    $("#cardsHistorialBeneficiario").empty();
}

function limpiarDonacionesBeneficiario()
{
    $("#DonationsContainer").empty();
    $("#cardsdonacionesReservadas").empty();   
}

function capturarDonador(correoDonador)
{
  var key="";
  var user="";
  referencia.orderByChild('Correo').equalTo(correoDonador).on("value", function(snapshot) //recordar poner el limit (1)
  {
        snapshot.forEach(function(data) 
        {
            key=data.key
            user=snapshot.val()[key]     
        });
        
  });
  return user;
}

function obtenerCalificacion(formulario)
{
  var i=0;
  var calificacion="";
  var containerFormulario=document.getElementById(formulario);
  for (i=0;i<containerFormulario.children.length;i+=2)
  {
      if(containerFormulario.children[i].checked)
      {
          calificacion=containerFormulario.children[i].value;
          break;
      }
  } 
   return calificacion;
}


function calificarDonador(correoDonador,num_estrellas)
{
  console.log(correoDonador);
  console.log("calif: "+num_estrellas);
  var key="";
  var user="";
  var calif="";
  var noCalif=""
  var calificar=true;
      referencia.orderByChild('correo').equalTo(correoDonador).limitToLast(1).on("value", function(snapshot) 
    {
           
        user=snapshot.val();
        snapshot.forEach(function(data) 
        {
            key=data.key;
            user=user[key];
            calif=parseFloat(user.num_estrellas)
            calif+=parseFloat(num_estrellas);
            noCalif=user.nocalificaciones+1;
            (noCalif==1)?(calif=calif/1):(calif=calif/2);
        });
         if(key!=="" && calificar)
             {
                  calificar=false;
                  referencia.child(key).update(
                  {
                    num_estrellas:calif,
                    nocalificaciones:noCalif
                  }
                    ,function(error)
                  {
                  if (error) 
                      {
                        alert("no se pudo actualizar la información " + error);
                      } 
                  else 
                      {
                        alert("información exitosamente guardada ");
                     }
                  });
            }
            else
            {
            console.log("no se pudo calificar");
            }
    });

            

 
}

function ActilizarcalificacionesDonaciones(correoDonador,num_estrellas)
{
    refDonaciones.orderByChild('Correo').equalTo(correoDonador).on("value", function(snapshot) 
  {
        donacion=snapshot.val(); 
        snapshot.forEach(function(data) 
        {
          key=data.key 
          refDonaciones.child(key).update(
          {
              num_estrellas:num_estrellas 
          });   
        });     
  });
}


function numeroReservas()
{
  var donacion="";
  var key="";
  var numDonaciones=0
  refDonaciones.orderByChild('Estado').equalTo("Reservado").on("value", function(snapshot) 
  {
        console.log("paso por reservadas"); 
        donacion=snapshot.val();
        snapshot.forEach(function(data) 
        {
          key=data.key

          if(donacion[key].reservacion.CorreoReservacion===LoginUSer.correo)//cambiar por donacion[key].reservacion.CorreoReservacion
          {
            numDonaciones+=1;
            //donacion.push(snapshot.val());
            console.log(donacion[key]);
            visualizarDonacionReservadaBenef(donacion[key],key);   
          }
          
        });     
  });
  return numDonaciones;
}