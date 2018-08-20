// Gallery er en class med en constructor med 2 parametre: name og images



class Gallery {

	constructor(name, images) {
		this.name = name;
		this.images = [];
		this.pos = 0;
		this.getData();
	}
	setEventHandlers() { // Sætter eventhandlers til hver knap, og laver tal under
		let that = this;
		document.querySelector(`#${this.name} .oopgallery-control-first`).addEventListener("click", function () {
			document.querySelector(`#${that.name} .oopgallery-image`).src = 'images/' + that.firstImage().filnavn + '.jpg'; // Hvis knappen som skal vise første billede er trykket på, sæt dens src til firstImage()
			document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = "1 / 7"; // Sætter tallet til 1 / 7
			document.querySelector(`#${that.name} .Tekst`).innerHTML = that.writeText();
		})

		document.querySelector(`#${this.name} .oopgallery-control-last`).addEventListener("click", function () {
			document.querySelector(`#${that.name} .oopgallery-image`).src = 'images/' + that.lastImage() + '.jpg'; // Hvis knappen som skal vise sidste billede er trykket på, sæt dens src til lastImage()
			document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = "7 / 7"; // Sætter tallet til 7 / 7
			document.querySelector(`#${that.name} .Tekst`).innerHTML = that.writeText();
		})

		document.querySelector(`#${this.name} .oopgallery-control-next`).addEventListener("click", function () {
			document.querySelector(`#${that.name} .oopgallery-image`).src = 'images/' + that.nextImage() + '.jpg'; // Hvis knappen som skal vise næste billede er trykket på, sæt dens src til nextImage()
			document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = that.position + 1 + " / 7"; // Sætter tallet til positionen + 1 / 7
			document.querySelector(`#${that.name} .Tekst`).innerHTML = that.writeText();
		})

		document.querySelector(`#${this.name} .oopgallery-control-previous`).addEventListener("click", function () {
			document.querySelector(`#${that.name} .oopgallery-image`).src = 'images/' + that.previousImage() + '.jpg'; // Hvis knappen som skal vise forrige billede er trykket på, sæt dens src til previousImage()
			document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = that.position + 1 + " / 7"; // Sætter tallet til positionen + 1 / 7
			document.querySelector(`#${that.name} .Tekst`).innerHTML = that.writeText();
		})

		document.querySelector(`#${that.name} .oopgallery-image`).src = 'images/' + this.firstImage().filnavn + '.jpg'; // Viser billedet fra start af via this.firstImage, når elementet laves
		document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = "1 / 7"; // Sætter tallet til 1 / 7
		document.querySelector(`#${that.name} .Tekst`).innerHTML = that.writeText();
	}

	firstImage() {
		this.position = 0;
		return this.images[0];
	}
	lastImage() {
		this.position = this.images.length - 1;
		return this.images[this.images.length - 1].filnavn;
	}
	nextImage(image) {
		if (this.position < this.images.length - 1) {
			this.position++;

		} else {
			this.position = 0;
		}
		return this.images[this.position].filnavn;

	}
	previousImage(image) {
		if (this.position > 0) {
			this.position--;

		} else {
			this.position = this.images.length - 1;
		}
		return this.images[this.position].filnavn;
	}
	getData() {
		let that = this;
		that.images = [];
		fetch('http://localhost:3000/billeder').then(function (res) {
			return res.json()
		}).then(function (json) {
			json.forEach(element => {
				that.images.push(new Image(element.id, element.titel, element.kategori_id, element.filnavn, element.dato, element.fotograf_id, element.kategori, element.fotograf));

			});
			that.setEventHandlers();

		});
	}
	writeText() {
		return `<p>Kategori: ${this.images[this.position].kategori}</p><p>Titel: ${this.images[this.position].titel}</p><p>Fotograf: ${this.images[this.position].fotograf}</p><p>dato: ${this.images[this.position].dato}</p>`
	}
}

class Image {
	constructor(id, titel, kategori_id, filnavn, dato, fotograf_id, kategori, fotograf) {
		this.id = id
		this.titel = titel
		this.kategori_id = kategori_id
		this.filnavn = filnavn
		this.dato = dato
		this.fotograf_id = fotograf_id
		this.kategori = kategori
		this.fotograf = fotograf
	}
}