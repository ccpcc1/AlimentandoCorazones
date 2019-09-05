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


