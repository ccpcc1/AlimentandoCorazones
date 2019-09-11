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
beneficiario.className=" page animated slideInLeft";
historiAl.className=" ocultar ";	
}

function interfazBeneficiarioInicio() {
beneficiario.className=" page animated slideInUp";
menuBajo.className=" toolbar toolbar-bottom animated slideInUp";
historiAl.className=" ocultar ";
login.className=" ocultar";	
}











function interfazDonador() {
donador.className=" page animated slideInLeft";
historiAlDonador.className=" ocultar ";	
pedidosActualesDonador.className=" ocultar";
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
}

function interfazDonadorInicio() {
donador.className=" page animated slideInUp";
menuBajoDonador.className=" toolbar toolbar-bottom animated slideInUp";
historiAl.className=" ocultar ";
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";

}


function interfazHistoriAlDonador() {
donador.className=" ocultar";
pedidosActualesDonador.className=" ocultar";
historiAlDonador.className=" page animated slideInRight ";	
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
}

function interfazPedidosActualesDonador() {
donador.className=" ocultar";
historiAlDonador.className=" ocultar ";	
pedidosActualesDonador.className=" page animated slideInRight ";	
login.className=" ocultar";	
nuevaDonacion.className=" ocultar ";
}





function interfaznuevaDonacionDonador() {
donador.className=" ocultar";
historiAlDonador.className=" ocultar ";	
nuevaDonacion.className=" page animated slideInRight ";	
login.className=" ocultar";	
pedidosActualesDonador.className=" ocultar";
}

function interfazModificarDonacionDonador() {
donador.className=" ocultar";
historiAlDonador.className=" ocultar ";	
nuevaDonacion.className=" ocultar ";	
modificarDonacion.className=" page animated slideInRight ";	
login.className=" ocultar";	
pedidosActualesDonador.className=" ocultar";
}