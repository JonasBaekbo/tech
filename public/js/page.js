
// I denne fil skal du benytte dig af de objekter, properties og funktioner, som du har defineret i "oop_gallery.js".
// Her er det tilladt at referere til specifikke gallerier, som f.eks. galleri01, galleri02, osv.
document.querySelector('#vaelg').value == 'galleri1';
galleri();
function galleri() {
    if (document.querySelector('#vaelg').value == 'galleri1') {
        document.querySelector("#gallery01").style.display = 'block';
        document.querySelector("#gallery02").style.display = 'none';
        new Gallery("gallery01");
    } else if (document.querySelector('#vaelg').value == 'galleri2') {
        document.querySelector("#gallery02").style.display = 'block';
        document.querySelector("#gallery01").style.display = 'none';
        new Gallery("gallery02");
    }
};
document.addEventListener("DOMContentLoaded", function (event) {

    // let resourceImages = [
    //     "images/image_01.jpg",
    //     "images/image_02.jpg",
    //     "images/image_03.jpg",
    //     "images/image_04.jpg",
    //     "images/image_05.jpg",
    //     "images/image_06.jpg",
    //     "images/image_07.jpg"
    // ];
    // let galleri_2 = new Gallery("gallery02", resourceImages);// Opretter gallery med navnet gallery02 og bruger billedearrayet

    // galleri_1.getData();


});