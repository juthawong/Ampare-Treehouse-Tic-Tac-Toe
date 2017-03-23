(function( $ ) {
 //This one is self invoking to prevent conflict with other Javascript that use $ shorthand like jQuery
  let player1 = true; //Is it Player 1 Move ?
  let player1move =[]; //Store Player 1 Move in Array
  let player2move = []; // Store Player 2 Move in Array
  let winningcheckarray = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
  ]; //These are an index array that if it contains move like this. They win!
  function init(){

    //Initialize Some Snippet Template and Stuff
    $("body").append('<div class="screen screen-start" id="start">  <header>    <h1>Tic Tac Toe</h1>    <a href="#" class="button">Start game</a></header></div>');
    $(".board").hide();
    $('body').append('<div class="screen screen-win" id="finish">  <header>    <h1>Tic Tac Toe</h1>    <p class="message"></p>  <a href="#" class="button">New game</a>  </header></div>')
    $('.screen-win').hide();
  }
  init(); //Run Init Function
  $('.box').mouseenter(function(){
    //When mouse hover it show symbol of current player
    if($(this).hasClass('filled') == false){
      if($('#player1').hasClass('active') == true){
        $(this).css('background-image', 'url("img/o.svg")');
      } else {
        $(this).css('background-image', 'url("img/x.svg")');
      };
    };
  });
  $('.box').mouseout(function(){
    //If it mouse out
    if($(this).hasClass('filled') == false){
      //Remove Background Because We don't check anything yet
      $(this).css('background-image', 'none');
    };
  });

  $('.button:contains("Start")').click(function(){ //If button contains word start and click
    $(".screen-start").hide(); //Start Screen is hiding
    $('.board').show(); // Board Start Showing
    $('#player1').addClass('active'); //Set Player1 To Active So Other Code will works
  });
  $('.button:contains("New")').click(function(){
    //When Click New Game
    player1move =[]; //Reset Player 1 Move
    player2move = [];//Reset Player 2 Move
    $('.screen-win').hide(); //Hide Win Screen
    $('#player2').removeClass('active'); //Remove Player2 Active Class
    $('#player1').removeClass('active'); //Remove Player1 Active Class To Prevent Bugs
    $('#player1').addClass('active'); //Set Player 1 To Active
    $('.board').show();  //Show Board Game Again
    $('li.box').removeClass('filled'); //Remove The Filled Class
    $('li.box').css('background-image', 'none'); //Reset background-image
    $('li.box').removeClass('box-filled-2'); //Remove X Filled
    $('li.box').removeClass('box-filled-1'); //Remove O Filled
    player  = true;
  });
  $('.box').click(function(){
    //When  Click on XO Board
    if(!$(this).hasClass('filled') ){
      //Check That is not already filled
      if(player1){ //If it was player1
        $(this).addClass('box-filled-1'); //Set Current Box To Player1 ( O )
        player1move += $('.box').index(this); //Add Current Index To Player 1 Move Array
        $('#player1').removeClass('active'); //Remove Player1
        $('#player2').addClass('active'); //Set Player 2 As Active

      }else{
        $('#player2').removeClass('active'); //Remove Player 2 From Active
        $('#player1').addClass('active'); //Set Playerr 1 As Active Again
        $(this).addClass('box-filled-2'); //Add Player 2 Class on This Box
        player2move+=$('.box').index(this); //Add To Player 2 Move
      }
      $(this).addClass('filled'); //Set This Class as Filled So It not override
      let winner = checkWinner(); //Check Winner and Store in Variable
      let draw = checkDraw(); // Check Draw and Store in Variable
      if(winner||draw){ //If we have end game - Winner or Draw
        $('.screen-start').remove(); //Remove The Start Screen - We really no need of it
        $('.board').hide(); // Hide The Board
        $('.screen-win').show(); //Show The Win Screen
        $('.screen-win').removeClass('screen-win-two');
        $('.screen-win').removeClass('screen-win-one');
        $('.screen-win').removeClass('screen-win-tie'); //Remove The old Class First


        if(winner){ //Check Win First If someone win
          if(player1){ //If player1 is win
            $('.screen-win').addClass('screen-win-one'); //Set Screen as Player 1 Win
          }else{ //Player 2 Win
            $('.screen-win').addClass('screen-win-two'); //Set Screen as Player 2 Win
          }
          $(".message").html("Winner"); //Set Text As Winner

        }else if(draw){ //Later We Check Draw If we draw
          $('.message').html('Tie!'); //Set Text As Tie
          $('.screen-win').addClass('screen-win-tie'); //Set Screen as Tie Screen
        }
      }
      player1 = !player1; //Toggle Player 1 and Player 2
    }

  });

  function checkWinner() {
    //Check Who Win
    let player;
    if(player1){
      player = player1move;
    }else{
      player = player2move;
    }
    for (var i=0; i < winningcheckarray.length; i++){ //Looping Through and Check That it contains the move number
      var winNums = winningcheckarray[i];

      for (var j=0; j < winNums.length; j++) {
        var num = winNums[j];
        var compare = player.indexOf(num);
        console.log(compare); //Debugging Purpose

        
        if (compare === -1) { //It doesn't contain any
        break;
      }

      if(j === winNums.length - 1) { // Yes it is Contain
        return true; //Current Player is win

      }
    }
  }
}

function checkDraw() {
  //If these 2 guys play until 9 times because we have 9 box and none win. We are draw
  if (player1move.length + player2move.length === 9) {
    return true;
  }
}
})( jQuery );
