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
}

function interfazBeneficiario() {
beneficiario.className=" page animated slideInUp";
historiAl.className=" ocultar ";
//LimpiarPerfilBeneficiario();
}

function interfazBeneficiarioInicio() {
beneficiario.className=" page animated slideInUp";
menuBajo.className=" toolbar toolbar-bottom animated slideInUp";
historiAl.className=" ocultar ";
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
limpiarDonacionesDonador();
consultarDonacionesDonador();
}

function interfazDonadorInicio() {
donador.className=" page animated slideInUp";
historiAl.className=" ocultar ";
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
modificarDonacionActual.className=" ocultar";	


}


function interfazHistoriAlDonador() {
donador.className=" ocultar";
pedidosActualesDonador.className=" ocultar";
historiAlDonador.className=" page animated slideInRight ";	
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
modificarDonacionActual.className=" ocultar";
LimpiarHistorial();
historialEntregados();
historialVencidos();	
}

function interfazPedidosActualesDonador() {
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
donador.className=" ocultar";
historiAlDonador.className=" ocultar ";	
nuevaDonacion.className=" page animated slideInRight ";	
login.className=" ocultar";	
pedidosActualesDonador.className=" ocultar";
modificarDonacionActual.className=" ocultar";	

}

function interfazModificarDonacionDonador() {
donador.className=" ocultar";	
modificarDonacionActual.className=" page animated slideInRight ";
historiAlDonador.className=" ocultar ";	
login.className=" ocultar";
pedidosActualesDonador.className=" ocultar";
nuevaDonacion.className=" ocultar";

}