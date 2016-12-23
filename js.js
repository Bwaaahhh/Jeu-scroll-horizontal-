
	var idperso = document.getElementById("perso") ;
	var idmonde = document.getElementById("monde") ;
	var idzombie = document.getElementById("zombie") ;
	var iddivzombie = document.getElementById("divzombie") ;
	var possection2 = document.getElementById("section2") ;
	var possection4 = document.getElementById("section4") ;									//	Variable necessaire au js
	var possection6 = document.getElementById("section6") ;
	var posObj1 = document.getElementById("ob1") ;
	var posObj2 = document.getElementById("ob2") ;
	var posObj3 = document.getElementById("ob3") ;
	var posObj4 = document.getElementById("ob4") ;
	var posObj5 = document.getElementById("ob5") ;
	var posObj6 = document.getElementById("ob6") ;
	var posObj7 = document.getElementById("ob7") ;
	var posObj8 = document.getElementById("ob8") ;
	var posObj9 = document.getElementById("ob9") ;
	var idbusv = document.getElementById("busv") ;
	var possection5 = document.getElementById("section5") ;
	var idbus = document.getElementById("bus"); 


var score = 0 ;
var tomber = false;
var trou1 = false ;
var trou2 = false ;

document.getElementById("scorechiffre").innerHTML = score ;								// Permet de mettre la valeur 0 au lancement de la page

function getpos(monid) {
	return monid.getBoundingClientRect();												// Racourci pour ne pas avoir a écrire a chaque fois le getBounding
}

var posdepart = getpos(idmonde).left= 0 ;												// Position de départ pour le retour a la vie

//   ----------------------------- MOUVEMENT  ------------------------------------

document.addEventListener("keydown", checkKeyPressed, false);
document.addEventListener("keyup", keyUp, false);										//Fonction d'écoute du clavier quand appuyé ou relevé ! 
var moveLeft = false;
var moveRight = false;

setInterval(function(){
	var depart = getpos(idmonde).left;

    if(moveLeft === true && tomber === false && depart <= 0 ){											// Permet le mouvement en changeant la position de la div du sol. C'est le sol qui bouge 
        var posmonde = getpos(idmonde) ;												// et non le zombie
        var gauche = posmonde.left+20 ;
        idmonde.style.left = gauche+"px" ;
        changementImage() ;	
        calculColisionTop()															// Appel des differentes fonctions lors du mouvement
        calculColision() ;															// Changement de l'image, calcul de colision a chaque lancement de la fonction 
        finDuNiveau() ;			
        departBus() ;														// Calcul de colision pour la fin du niveau
    }
    else if(moveRight === true && tomber === false){
        var posmonde = getpos(idmonde) ;												// permet le mouvement dans l'autre sens 
        var posection2 = getpos(possection2) ;
        var posection4 = getpos(possection4) ;
        var droite = posmonde.left-20 ;
        idmonde.style.left = droite+"px" ;
        changementImage() ;
        calculColisionTop()
        calculColision() ;																// Appel de la fonction de calcul de points ( calculs des colisions )
        ajoutPoint() ;
        finDuNiveau() ;
        departBus();
    }
}, 50);


function checkKeyPressed(e) {															// Ecoute des touches 
    if (e.keyCode == "32" ) {
        jumpStarted = true;																// changement des variables pour que la fonction de mouvement sois activée
    }if (e.keyCode == "81") {
        moveLeft = true;
    }else if (e.keyCode == "68") {
        moveRight = true;
    }
}
function keyUp(e){
    if (e.keyCode == "81") {															// Changement des variables pour désactivé la fonction de mouvement
        moveLeft = false;
    }else if (e.keyCode == "68") {
        moveRight = false;
    }
}

//   --------------------------------------       SAUTER   -------------------------- 

document.addEventListener("keydown", bouge, false);

function bouge(e) {
	var poszombie = getpos(idzombie) ; 												// Pour sauter + calcul de la position du zombie pour désactivé le saut si il est plus haut
		if(e.code == "Space" && poszombie.top >=  545 ){
			var poszombie = getpos(idzombie);										// que sa position de départ
			var haut = poszombie.top-100 ; 			
			idzombie.style.top = haut+"px"; 
			changementImageSaut(); 
			calculColision(); 	
			setInterval(changerDeCouleur , 10) ; 													// Appel des fonctions nécessaire, colision etc etc
			setInterval(calculColisionTop, 10);
			setTimeout(calculColision, 800);										// Timeout pour calculer le bon moment de la colision du trou
			setTimeout(reviens, 500);												// Timeout pour activer la fonction pour le retour du zombie au sol
			setTimeout(changementImage, 600);										// Timeout pour le changement d'image de l'image du saut a limage de la marche
		}
	}




//       ---------------------------------              POINT !!     -------------------------------------

function ajoutPoint(){																		// Fonction ajout des points 

	var poszombie = getpos(idzombie) ; 														// Calcul des position necessaire au calcul de point
	var posection2 = getpos(possection2) ;													// Position du zombie et des différents trous 
	var posection4 = getpos(possection4) ;

	if(poszombie.left >= posection2.left + posection2.width && trou1 == false) {			// Calcul position trou 1 si le zombie le dépasse , la fonction marche
		pointPlus() ; 																		// Lancement Fonction pour ajout 10 pts
		trou1 = true ; 																		// Changement valeur d'une variable de condition pour que la fonction ne se fasse qu'une fois
	}
	if(poszombie.left >= posection4.left + posection4.width && trou2 == false){				// Meme fonctionnement que le trou 1 
		pointPlus() ; 
		trou2 = true ; 																		// avec une variable nommée differement 
	}
}
function pointPlus(){																		// Fonction pour ajout des points
	score += 10 ; 																			// Modification de la variable a chaque fois que la fonction est appelée
	 document.getElementById("scorechiffre").innerHTML = score ;							// Apparation de la valeur de la variable dans le HTML
}


//        ---------------------------           FONCTION DIVERSE     --------------------------------------


function reviens(){																			// Fonction poour faire revenir le zombie au sol pendant le saut

	document.getElementById("zombie").style.top="545px" ;									// Basé sur le calcul de sa position normale Top
}
function changementImage(){																	// Fonction changement d'image
	var my_array = idzombie.src.split("/");													// Split pour recuperer les elements du nom de l'image
	var last_element = my_array[my_array.length - 1];										// recuperation dernier element du nom soit le nom de l'image comme dans le dossier
		setTimeout(function() {
			if(last_element == "zombie-walk1.png"  ){										// Modification de l'image avec un timeout pour ne pas que l'image change trop souvent
			last_element = "images/zombie-walk2.png" ;
			}																				// Si c'est image 1 l'image passe a 2 et inversement
			else {
				last_element = "images/zombie-walk1.png" ;
			}
		idzombie.src = last_element ; 								
		}, 150)
}
function changementImageSaut(){																// Fonction pour changement image pendant le saut
	var my_array = idzombie.src.split("/");
	var last_element = my_array[my_array.length - 1];

	last_element = "images/zombie-jump.png" ;
	idzombie.src = last_element ; 
}
function chute(){																			// Fonction pour que le zombie tombe dans le trou
	var poszombie = getpos(idzombie) ;
	var haut = poszombie.top+500 ; 															// Modification de la position top du zombie + transition via CSS
	idzombie.style.top = haut+"px" ; 
}
function enleverVie (){																		// Fonction pour modification des vies 
	if(document.getElementById("vie3").style.visibility == "") {							// Si a lappel des fonction vie3 est visible elle passe hidden
		document.getElementById("vie3").style.visibility = "hidden" ; 
	}
	else if(document.getElementById("vie2").style.visibility == ""){						// Si vie 3 est hidden et que 2 est visible vie 2 passe hidden
		document.getElementById("vie2").style.visibility = "hidden" ;
	}
	else {																					// Si vie 2 n'est pas visible il ne restait qu'une vie donc 
		window.location.replace("pagefin.html") ; 											// renvois sur une autre page
	}	
}																								     	
function retourPositionDepart (){															// fonction pour retour zombie a sa position de départ
	idmonde.style.left = posdepart+"px" ; 													// Modification des coordonées
	idzombie.style.top = "545px" ;
	tomber = false;																			// Changement valeur variable fixe pour réactiver le mouvement
}
function calculColision(){																	 // Fonction pour calcul des colisions avec les trous              	
	var posection2 = getpos(possection2) ;													
	var posection4 = getpos(possection4) ;
	var poszombie = getpos(idzombie) ; 														// recuperation des coordonées  trou 1 
	if((posection2.left <= poszombie.left + poszombie.width - 40) && (poszombie.bottom >= posection2.top - 10 ) && (poszombie.left <= posection2.left + posection2.width - 40)){
		tomber = true;																		// Comparaison des coordonées droite top gauche
		chute() ; 																			// Si activée appel des fonctions 
		enleverVie() ;  
		setTimeout(retourPositionDepart , 1000 ) ; 											// Timeout fonction retour position pour quon le vois tomber
	}
	else if((posection4.left <= poszombie.left + poszombie.width - 40) && (poszombie.bottom >= 630) && (poszombie.left <= posection4.left + posection4.width - 40) ){
		tomber = true;																		// recuperation des coordonées  trou 2 
		chute() ; 																			// meme systeme que pour le trou 1 
		enleverVie() ;
		setTimeout(retourPositionDepart , 1000 ) ;
	}
}
function calculColisionTop(){																 // Fonction calculs des colisions pour les objets en hauteur
	var posob1 = getpos(posObj1) ;
	var posob2 = getpos(posObj2) ; 
	var posob3 = getpos(posObj3) ;
	var posob4 = getpos(posObj4) ; 															
	var posob5 = getpos(posObj5) ;
	var posob6 = getpos(posObj6) ;
	var posob7 = getpos(posObj7) ; 
	var posob8 = getpos(posObj8) ;
	var posob9 = getpos(posObj9) ;
	var poszombie = getpos(idzombie) ; 
	
	if ((posob1.left <= poszombie.left + poszombie.width ) && (posob1.bottom > poszombie.top) && (poszombie.left <= posob1.left + posob1.width -10 )){
			reviens() ; 
		}
	if ((posob2.left <= poszombie.left + poszombie.width ) && (posob2.bottom > poszombie.top) && (poszombie.left <= posob2.left + posob2.width -10 )){
			reviens() ; 
		}
	if ((posob3.left <= poszombie.left + poszombie.width ) && (posob3.bottom > poszombie.top) && (poszombie.left <= posob3.left + posob3.width -10 )){
		reviens() ; 
	}
	if ((posob4.left <= poszombie.left + poszombie.width ) && (posob4.bottom > poszombie.top) && (poszombie.left <= posob4.left + posob4.width -10 )){
			reviens() ; 
		}
	if ((posob5.left <= poszombie.left + poszombie.width ) && (posob5.bottom > poszombie.top) && (poszombie.left <= posob5.left + posob3.width -10 )){
		reviens() ; 
	}
	if ((posob6.left <= poszombie.left + poszombie.width ) && (posob6.bottom > poszombie.top) && (poszombie.left <= posob6.left + posob4.width -10 )){
			reviens() ; 
		}
	if ((posob7.left <= poszombie.left + poszombie.width ) && (posob7.bottom > poszombie.top) && (poszombie.left <= posob7.left + posob4.width -10 )){
		reviens() ; 
	}
	if ((posob8.left <= poszombie.left + poszombie.width ) && (posob8.bottom > poszombie.top) && (poszombie.left <= posob8.left + posob3.width -10 )){
		reviens() ; 
	}
	if ((posob9.left <= poszombie.left + poszombie.width ) && (posob9.bottom > poszombie.top) && (poszombie.left <= posob9.left + posob4.width -10 )){
		reviens() ; 
	}
}
function finDuNiveau() {																	 // Fonction quand on arrive a la fin du niveau
 var posection6 = getpos(possection6);
 var poszombie = getpos(idzombie);																// Recuperation position zombie et section de fin 
 if ((posection6.left <= poszombie.left + poszombie.width) ) {										// calcul de position 
   window.location.replace("pagefin2.html") ; 													// Lancement sur la page de fin 
 }
}

function changerDeCouleur(){																// Fonction pour que les div en hauteurs changent de couleur 
	var posob1 = getpos(posObj1) ;
	var posob4 = getpos(posObj4) ; 															// Calcul de position + verification de la couleur de base 
	var posob6 = getpos(posObj6) ;
	var posob9 = getpos(posObj9) ;
	var poszombie = getpos(idzombie) ; 
	if ((posob1.left < poszombie.left + poszombie.width - 20 ) && (posob1.bottom >= poszombie.top) && (poszombie.left <= posob1.left + posob1.width -10 ) && posObj1.style.backgroundColor == "" ){
		posObj1.style.backgroundColor = "red" ; 
		pointPlus() ; 
	}
	if ((posob4.left < poszombie.left + poszombie.width - 20 ) && (posob4.bottom >= poszombie.top) && (poszombie.left <= posob4.left + posob4.width -10 ) && posObj4.style.backgroundColor == ""){
			posObj4.style.backgroundColor = "red" ; 
			pointPlus() ;
		}
	if ((posob6.left < poszombie.left + poszombie.width - 20 ) && (posob6.bottom >= poszombie.top) && (poszombie.left <= posob6.left + posob4.width -10 ) && posObj6.style.backgroundColor == ""){
			posObj6.style.backgroundColor = "red" ; 
			pointPlus() ; 
			}
	if ((posob9.left < poszombie.left + poszombie.width - 20 ) && (posob9.bottom >= poszombie.top) && (poszombie.left <= posob9.left + posob4.width -10 ) && posObj9.style.backgroundColor == ""){
		posObj9.style.backgroundColor = "red" ; 
		pointPlus() ; 
	}
}

function departBus() {																		// Fonction detection de position pour changement image bus 
	var posection5 = getpos(possection5) ;
	var poszombie = getpos(idzombie) ;
    if (posection5.left <= poszombie.left + poszombie.width - 450 ) {
        if (idbusv.style.visibility == "") {
        idbusv.style.visibility = "visible";
        idbus.style.visibility = "hidden" ;
        idbusv.className +="yep" ; 
    	}
    }
}