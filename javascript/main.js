// Startbildschirm ausblenden -------------------------------------------------
let hintergrund = new Audio('audio/breathee.mp3');

$('#startbutton').click(()=>{
    $('#full').fadeOut(1000).hide(1000);
    hintergrund.play();
    
})
// ----------------------------------------------------------------------------






// Arrays -------------------------
let steine = [
    ["Heilstein (Rot)"],
    ["Heilstein (Blau)"],
    ["Heilstein (Grün)"],
    ["Heilstein (Violett)"],
    ["Heilstein (Schwarz)"],
    ["Heilstein (Magenta)"],
    ["Heilstein (Gelb)"],
    ["Heilstein (Eisblau)"],
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
var sounds = [];
var zaehlers = [];
var lauts = [];
var statuse =[];
var neu;

for(i = 0; i <= steine.length-1; i++)
{  
        $('#produkte').append("<div class='produkt' id='" + i + "'><div class='produktbild'></div><h3>" + steine[i] + "</h3></div>");
        $('#' + i).hide();
        counter++;
        console.log(counter);

        // Sounds in Array schreiben ---------------------
        sounds[i] = new Audio('audio/' + i + '.mp3');
        zaehlers[i] = 0;
        lauts[i] = 0;
        statuse[i] = 0;

        // -----------------------------------------------
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

$(".produkt").mouseenter(function() {

    $('#' + this.id).fadeTo(300, 1);



    statuse[this.id] = 1;
    zaehlers[this.id] = 0.01;
    
    

    sounds[this.id].play();
    sounds[this.id].volume = 0;
    var iddesobjects = this.id;

    var int = setInterval( function() 
    {
        // Die Rechnung -----------------------------------------------------------
        lauts[iddesobjects] = lauts[iddesobjects] + zaehlers[iddesobjects];
        // ------------------------------------------------------------------------
        
        // Wert Runden und Lautstärke setzen --------------------------------------
        console.log(Math.round(lauts[iddesobjects]*100)/100);
        sounds[iddesobjects].volume = Math.round(lauts[iddesobjects]*100)/100;
        // ------------------------------------------------------------------------

      if (lauts[iddesobjects] >= 0.999 || statuse[iddesobjects] == 0)
      {
        clearInterval(int);
        return;
      }
    }, 10);
    

});

$(".produkt").mouseleave(function() {

    $('#' + this.id).fadeTo(300, 0.6);


    statuse[this.id] = 0;
    zaehlers[this.id] = -0.01;

    sounds[this.id].volume = 0;
    var iddesobjects = this.id;

    var int = setInterval( function() 
    {
        // Die Rechnung -----------------------------------------------------------
        lauts[iddesobjects] = lauts[iddesobjects] + zaehlers[iddesobjects];
        // ------------------------------------------------------------------------
        
        // Wert Runden und Lautstärke setzen --------------------------------------
        console.log(Math.round(lauts[iddesobjects]*100)/100);
        sounds[iddesobjects].volume = Math.round(lauts[iddesobjects]*100)/100;
        // ------------------------------------------------------------------------

      if (statuse[iddesobjects] == 1)
      {
        clearInterval(int);
        return;
      }
      else if(lauts[iddesobjects] <= 0.001)
      {
        sounds[iddesobjects].pause();
        clearInterval(int);
        return;
      }
    }, 10);
    
});

// ---------------------------------------------------------------------------------------------------------------------------------


// Produkt aufrufen -------------------------------------------------------------------------------------------------------

$(".produkt").click(function()
{
    $('#produkte').fadeTo(1000, 0).hide(1);
    $('#einzelprodukt').show(1000).fadeTo(1000, 1);
})

// ------------------------------------------------------------------------------------------------------------------------








