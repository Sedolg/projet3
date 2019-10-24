var Station = {

	initStation: function(nom, adresse, etat, capacite, dispo) {
		this.nom = nom;
		this.adresse = adresse;
		this.etat = etat;
		this.capacite = capacite;
		this.dispo = dispo;
	},

	decrire: function() {
		document.getElementById('nom').innerHTML = this.nom;
		document.getElementById('adresse').innerHTML = this.adresse;
		document.getElementById('etat').innerHTML = this.etat;
		document.getElementById('capacite').innerHTML = this.capacite;
		document.getElementById('place').innerHTML = this.dispo;
		if ((this.etat === "CLOSED") || (this.dispo === 0)) {
            document.getElementById('send').style.visibility='hidden';
            document.getElementById('valid').style.visibility='hidden';
        } else {
            document.getElementById('send').style.visibility='visible';
            document.getElementById('valid').style.visibility='visible';
		};

	}
};