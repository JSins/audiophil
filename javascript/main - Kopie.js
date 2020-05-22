// Arrays -------------------------
let steine = [
    ["Heilstein (Rot)"],
    ["Heilstein (Blau)"],
    ["Heilstein (Grün)"],
    ["Heilstein (Violett)"],
    ["Heilstein (Schwarz)"],
    ["Heilstein (Magenta)"],
    ["Heilstein (Gelb)"],
    ["Heilstein (Orange)"],
    ["Heilstein (Rosa)"],
    ["Heilstein (Braun)"]
];

let steininfo = [
    ["Stein des Feuers"],
    ["Heilstein (Blau)"],
    ["Heilstein (Grün)"],
    ["Heilstein (Violett)"],
    ["Heilstein (Schwarz)"],
    ["Heilstein (Magenta)"],
    ["Heilstein (Gelb)"],
    ["Heilstein (Orange)"],
    ["Heilstein (Rosa)"],
    ["Heilstein (Braun)"]
];
// ---------------------------------








// Produkte aus Array aussgeben -------------------------------------------------------------------------------------------------

let i;
var counter = 0;

for(i = 0; i <= steine.length-1; i++)
{  
        $('#produkte').append("<div class='produkt' id='" + i + "'><div class='produktbild'></div><h3>" + steine[i] + "</h3></div>");
        $('#' + i).hide();
        counter++;
        console.log(counter);


}

// ------------------------------------------------------------------------------------------------------------------------------








//  Wenn Array durchlesen fertig ist, dann fade die nach und nach ein -------------------------------------------------------------

if(counter == steine.length);
{
    counter = 0;
    console.log("done");
    setInterval(function(){
       $('#' + counter).fadeTo(1000, 0.6);
        counter++;
        }, 200); 
}

// ---------------------------------------------------------------------------------------------------------------------------------







// Rechnungserstellung je nach mouseenter oder leave ------------------------------------------------------------------------------

var rechnung;



$(".produkt").mouseenter(function() {
    // console.log('rein');
    rechnung = 0.01;
    console.log(this.id);

    $('#' + this.id).fadeTo(300, 1);

});

$(".produkt").mouseleave(function() {
    // console.log('raus');
    rechnung = -0.01;

    
    $('#' + this.id).fadeTo(300, 0.6);
});

// ---------------------------------------------------------------------------------------------------------------------------------


// Produkt aufrufen -------------------------------------------------------------------------------------------------------

$(".produkt").click(function()
{
    $('#produkte').fadeTo(1000, 0).hide(1);
    $('#einzelprodukt').show(1000).fadeTo(1000, 1);


})

// ------------------------------------------------------------------------------------------------------------------------






// Starte Musikfunktion und Rechnung der Lautstärke -----------------------------------------------------------

var backgroundmusic = new Audio('audio/lake.mp3');

$('#start').click(function(){
    backgroundmusic.play();
    backgroundmusic.volume = 0;
    setInterval(function(){
        backgroundmusic.volume = backgroundmusic.volume + rechnung;
        }, 10);
});

// -------------------------------------------------------------------------------------------------------------

