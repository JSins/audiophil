// Arrays -------------------------
let steine = [
  ["Heilstein (Rot)"],
  ["Heilstein (Blau)"],
  ["Heilstein (Grün)"],
  ["Heilstein (Violett)"],
  ["Heilstein (Schwarz)"],
  ["Heilstein (Weiß)"],
  ["Heilstein (Gelb)"],
  ["Heilstein (Eisblau)"],
  ["Heilstein (Okka)"],
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

let games = [
["Ace Combat 6"],
["Ori and the Blind Forest"],
["Crysis 3"],
["Minecraft"],
["Battlefield 1"],
["The Elderscrolls V - Skyrim"],
["Star Wars Battlefront 2"],
["Assault Cube"],
["Fallout 4"],
["Halo - Combat Evolved"]
];

let warenkorbarray = [];
// ---------------------------------





// Shop-Auswahl --------------------------------------------------------------

var auswahl = "";
var produktanzahl;

$('.wahl').click(function(){
  auswahl = this.id;
  console.log(auswahl);


  if(auswahl == 'steine')
  {
    produktanzahl = steine.length;
    $('.hintergrundfarbe').css("background", "#000000");
    $('.standard').css("background", "#1a1a1a");
    $('.standard').css("font-family", "Overpass, sans-serif");
  }
  else if(auswahl == 'games')
  {
    produktanzahl = games.length;
    $('.hintergrundfarbe').css("background", "#000000");
    $('.standard').css("background", "#1a1a1a");
    $('.standard').css("font-family", "Press Start 2P, cursive");
  }
  else if(auswahl == 'fitness')
  {
    produktanzahl = fitness.length;
    $('.hintergrundfarbe').css("background", "#000000");
    $('.standard').css("background", "#1a1a1a");
    $('.standard').css("font-family", "Overpass, sans-serif");
  }
});

// ----------------------------------------------------------------------------





// Startbildschirm ausblenden -------------------------------------------------
let hintergrundstein = new Audio('audio/breathee.mp3');

$('#startbutton').click(()=>{
  if(auswahl == "")
  {
    alert("Wählen Sie bitte zuerst ein Thema.")
  }
  else
  {
    $('#full').fadeOut(3000).hide(1000);

    if(auswahl == 'steine')
    {
      hintergrundstein.play();
      hintergrundstein.volume = 0.7;
    }
    if(auswahl == 'games')
    {
      
    }
    if(auswahl == 'fitness')
    {
      
    }
    
    
    blendinproducts();
  }

})

// ----------------------------------------------------------------------------






let buttonaudio = new Audio('audio/click2_01.mp3');
$('button').click(()=>{
  buttonaudio.play();
})











// Warenkorb -----------------------------------------------------------------------------------------


function warenkorbrefresh()
{
  $('#warenkorb').html('Warenkorb (' + warenkorbarray.length + ')');
}

warenkorbrefresh();

// ---------------------------------------------------------------------------------------------------




function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
}





// Rechnungserstellung je nach mouseenter oder leave ------------------------------------------------------------------------------

$(document).on('mouseenter', '.produkt', function() {

  $('.produkt:not(#' + this.id + ')').clearQueue().fadeTo(1000, 0.2);
  statuse[this.id] = 1;
  zaehlers[this.id] = 0.04;
  
  sounds[this.id].play();
  sounds[this.id].volume = 0;
  var iddesobjects = this.id;

  var int = setInterval( function() 
  {
      // Die Rechnung -----------------------------------------------------------
      lauts[iddesobjects] = lauts[iddesobjects] + zaehlers[iddesobjects];
      // ------------------------------------------------------------------------
      
      // Wert Runden und Lautstärke setzen --------------------------------------
      console.log(iddesobjects + ' ' + Math.round(lauts[iddesobjects]*100)/100);
      sounds[iddesobjects].volume = clamp(lauts[iddesobjects], 0, 1);
      // ------------------------------------------------------------------------

    if (lauts[iddesobjects] >= 0.999 || statuse[iddesobjects] == 0)
    {
      clearInterval(int);
      return;
    }
  }, 40);
  
});


$(document).on('mouseleave', '.produkt', function() {
  $('.produkt:not(#' + this.id + ')').clearQueue().fadeTo(1000, 0.8);

  statuse[this.id] = 0;
  zaehlers[this.id] = -0.04;

  sounds[this.id].volume = 0;
  var iddesobjects = this.id;

  var int = setInterval( function() 
  {
      // Die Rechnung -----------------------------------------------------------
      lauts[iddesobjects] = lauts[iddesobjects] + zaehlers[iddesobjects];
      // ------------------------------------------------------------------------
      
      // Wert Runden und Lautstärke setzen --------------------------------------
      console.log(iddesobjects + ' ' + Math.round(lauts[iddesobjects]*100)/100);
      sounds[iddesobjects].volume = clamp(lauts[iddesobjects], 0, 1);
      // ------------------------------------------------------------------------

    if (statuse[iddesobjects] == 1)
    {
      clearInterval(int);
      return;
    }
    
    if(lauts[iddesobjects] < 0.001)
    {
      sounds[iddesobjects].pause();
      clearInterval(int);
      return;
    }
  }, 40);
});

// ---------------------------------------------------------------------------------------------------------------------------------










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


  for(i = 0; i <= produktanzahl-1; i++)
  {  
    if(auswahl == 'steine')
    {
      $('#produkte').append("<div class='produkt' id='" + i + "'><img src='img/" + auswahl + "/" + i + ".jpg' class='produktbild'><h3>" + steine[i] + "</h3></div>");
    }
    else if(auswahl == 'games')
    {
      $('#produkte').append("<div class='produkt' id='" + i + "'><img src='img/" + auswahl + "/" + i + ".jpg' class='produktbild'><h3>" + games[i] + "</h3></div>");
    }
    else if(auswahl == 'fitness')
    {
      $('#produkte').append("<div class='produkt' id='" + i + "'><img src='img/" + auswahl + "/" + i + ".jpg' class='produktbild'><h3>" + fitness[i] + "</h3></div>");
    }


    $('#' + i).hide();
    counter++;
    console.log(counter);

    // Sounds in Array schreiben ---------------------
    sounds[i] = new Audio('audio/' + auswahl + '/' + i + '.mp3');
    zaehlers[i] = 0;
    lauts[i] = 0;
    statuse[i] = 0;
  
          // -----------------------------------------------
  }
  
  // ------------------------------------------------------------------------------------------------------------------------------
  
  //  Wenn Array durchlesen fertig ist, dann fade die nach und nach ein -------------------------------------------------------------
  
  if(counter == produktanzahl);
  {
      counter = 0;
      console.log("done");
      setInterval(function(){
         $('#' + counter).fadeTo(1000, 1);
          counter++;
          }, 200); 
  }
}

// ---------------------------------------------------------------------------------------------------------------------------------









let produktid;

// Produkt aufrufen -------------------------------------------------------------------------------------------------------

$(document).on('click', '.produkt', function() {
    zaehlers[this.id] = 0;
    produktid = this.id;
    $('#einzelprodukt').html("");
    $('#produkte').fadeTo(1000, 0).hide(1);
    $('#einzelprodukt').show(1000).fadeTo(1000, 1);
    $('#einzelprodukt').append("<img src='img/" + auswahl + "/" + this.id + ".jpg' id='grossbild'><div id='infotext'><h1 id='einzelhead'>" + steine[this.id] + "</h1><hr><section id='beschreibung'>" + steininfo[this.id] + "</section><button id='warenkorb'>In den Warenkorb</button></div>");
});

// ------------------------------------------------------------------------------------------------------------------------







// Zurück-Knopf -----------------------------------------------------------------------------------------------------------

function zurück()
{
  $('#einzelprodukt').fadeTo(1000, 0).hide(1);
  $('#produkte').show(1000).fadeTo(1000, 1);
}

$('.back').click(()=>{
  zurück();
});



$(document).on('click', '#warenkorb', function() {
  warenkorbarray.push(produktid);
  console.log(warenkorbarray);
  warenkorbrefresh();
  zurück();
});

// -----------------------------------------------------------------------------------------------------------------------

