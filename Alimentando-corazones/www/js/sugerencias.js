function GuardarSugerencia(sugerencia)
{
	refSugerencias.push(sugerencia);
	alert("Gracias por tu suregencia");
}

function capturarSugerencia()
{
	var suregencia=""
	sugerencia=document.getElementById("txtSugerencia").value;
	(sugerencia.length==0)?alert("por favor rellenar el campo"):GuardarSugerencia(sugerencia);
	sugerencia=document.getElementById("txtSugerencia").value="";
}