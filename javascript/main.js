// Startbildschirm ausblenden -------------------------------------------------
let hintergrund = new Audio('audio/breathee.mp3');

$('#startbutton').click(()=>{
    $('#full').fadeOut(3000).hide(1000);
    hintergrund.play();
    hintergrund.volume = 0.7;
    
})
// ----------------------------------------------------------------------------


let buttonaudio = new Audio('audio/click2.mp3');
$('button').click(()=>{
  buttonaudio.play();
})


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



$('#back').click(()=>{
  // $('#einzelprodukt').fadeTo(1000, 0).hide(1000);
  // $('#produkte').show(1).fadeTo(1000, 1);
  $(".produkt").hide(1000);
  
  blendinproducts();
  
})




// Produkte aus Array aussgeben -------------------------------------------------------------------------------------------------

let i;
var counter = 0;
var sounds = [];
var zaehlers = [];
var lauts = [];
var statuse =[];
var neu;

function blendinproducts()
{


  for(i = 0; i <= steine.length-1; i++)
  {  
          $('#produkte').append("<div class='produkt' id='" + i + "'><img src='img/" + i + ".jpg' class='produktbild'><h3>" + steine[i] + "</h3></div>");
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
         $('#' + counter).fadeTo(1000, 1);
          counter++;
          }, 200); 
  }
}

blendinproducts();



// ---------------------------------------------------------------------------------------------------------------------------------




// Rechnungserstellung je nach mouseenter oder leave ------------------------------------------------------------------------------

$(".produkt").mouseenter(function() {
    
    // $('#' + this.id).clearQueue().fadeTo(100, 1);
    $('.produkt:not(#' + this.id + ')').clearQueue().fadeTo(1000, 0.2);
    



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
    $('.produkt:not(#' + this.id + ')').clearQueue().fadeTo(1000, 0.8);
    // $('#' + this.id).clearQueue().fadeTo(100, 0.8);


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








