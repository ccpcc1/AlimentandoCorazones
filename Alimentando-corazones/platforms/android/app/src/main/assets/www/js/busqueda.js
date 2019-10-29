var search = document.getElementById("search"),
    search2 = document.getElementById("searchD"),
    food = document.getElementsByClassName("busquedaDisponibles"),
    foodDonador = document.getElementsByClassName("busquedaDonaciones"),
    foodBar = document.getElementsByClassName("busquedaDisponiblesBar"),
    foodBarDonador = document.getElementsByClassName("busquedaDonacionesBar");
    

search.addEventListener("keyup",Buscar);
searchD.addEventListener("keyup",Buscar2);

function Buscar() {
    var choice = this.value;
	for (var i = 0; i < food.length; i++) {
		if (food[i].innerHTML.toLowerCase().search(choice.toLowerCase()) == -1) {
			 food[i].style.display = "none";
			 foodBar[i].style.display = "none";
		}

		else{
			food[i].style.display = "block";		
            foodBar[i].style.display = "flex";
		}

	}
   	
}

function Buscar2() {
    var choice2 = this.value;
	for (var i = 0; i < foodDonador.length; i++) {
		if (foodDonador[i].innerHTML.toLowerCase().search(choice2.toLowerCase()) == -1) {
			 foodDonador[i].style.display = "none";
			 foodBarDonador[i].style.display = "none";
		}

		else{
			foodDonador[i].style.display = "block";		
            foodBarDonador[i].style.display = "flex";
		}

	}
   	
}


   //food[i].childNodes[1].id