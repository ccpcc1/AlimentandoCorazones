function interfazRegistro() {
login.className=" ocultar";
register.className=" list form-store-data  animated slideInUp ";	
}

function interfazLogin() {
register.className=" ocultar";
login.className=" animated slideInUp ";	
}


function interfazHistorial() {
beneficiario.className=" ocultar";
historiAl.className=" page animated slideInRight ";
miCanasta.className="ocultar";
nuevaSugerenciaBenef.className="ocultar";	
LimpiarHistorial();
CapturarHistBeneficiario();
}

function interfazBeneficiario() {
beneficiario.className=" page animated slideInUp";
historiAl.className=" ocultar ";
miCanasta.className="ocultar";
nuevaSugerenciaBenef.className="ocultar";
}

function interfazBuzonSugerenciasBenef() {
historiAl.className=" ocultar ";
beneficiario.className=" ocultar";
miCanasta.className="ocultar";
nuevaSugerenciaBenef.className=" page animated slideInUp";
}

function interfazMiCanasta() {
miCanasta.className=" page animated slideInLeft";
historiAl.className=" ocultar ";
beneficiario.className=" ocultar";
nuevaSugerenciaBenef.className="ocultar";
CapturarDonacionReservadaBenef();
CapturarDonacionEntregadoBenef();	
}

function interfazBeneficiarioInicio() {
beneficiario.className=" page animated slideInUp";
menuBajo.className=" toolbar toolbar-bottom animated slideInUp";
historiAl.className=" ocultar ";
miCanasta.className="ocultar";
login.className=" ocultar";	
 consultarDonaciones();
}










function interfazDonador() {
donador.className=" page animated slideInUp";
historiAlDonador.className=" ocultar ";	
pedidosActualesDonador.className=" ocultar";
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
menuBajoDonador.className=" toolbar toolbar-bottom animated slideInUp";
modificarDonacionActual.className=" ocultar";
nuevaSugerencia.className="ocultar";	
limpiarDonacionesDonador();
consultarDonacionesDonador();
}

function interfazBuzonSugerencias() {
donador.className="  ocultar";
historiAl.className=" ocultar ";
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
modificarDonacionActual.className=" ocultar";	
nuevaSugerencia.className=" page animated slideInUp";
}

function interfazDonadorInicio() {
donador.className=" page animated slideInUp";
historiAl.className=" ocultar ";
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
modificarDonacionActual.className=" ocultar";
nuevaSugerencia.className="ocultar";	


}


function interfazHistoriAlDonador() {
pintarCalificacionDonador();
donador.className=" ocultar";
pedidosActualesDonador.className=" ocultar";
historiAlDonador.className=" page animated slideInRight ";	
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
modificarDonacionActual.className=" ocultar";
nuevaSugerencia.className="ocultar";
LimpiarHistorial();
historialEntregados();
historialVencidos();
historialRecibidos();	
}

function interfazPedidosActualesDonador() {

nuevaSugerencia.className="ocultar";
donador.className=" ocultar";
historiAlDonador.className=" ocultar ";	
pedidosActualesDonador.className=" page animated slideInLeft ";	
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
modificarDonacionActual.className=" ocultar";
limpiarPedidos();
CapturarDonacionReservada();	
}





function interfaznuevaDonacionDonador() {

nuevaSugerencia.className="ocultar";
donador.className=" ocultar";
historiAlDonador.className=" ocultar ";	
nuevaDonacion.className=" page animated slideInRight ";	
login.className=" ocultar";	
pedidosActualesDonador.className=" ocultar";
modificarDonacionActual.className=" ocultar";	

}

function interfazModificarDonacionDonador() {

nuevaSugerencia.className="ocultar";
donador.className=" ocultar";	
modificarDonacionActual.className=" page animated slideInRight ";
historiAlDonador.className=" ocultar ";	
login.className=" ocultar";
pedidosActualesDonador.className=" ocultar";
nuevaDonacion.className=" ocultar";

}