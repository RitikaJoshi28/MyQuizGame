class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
     question.hide();
   //write code to change the background color here
     background("pink");

    //write code to show a heading for showing the result of Quiz
   textSize(30);
   text("My Quiz Game",450,10);
   question.getPlayerInfo();

    //call getContestantInfo( ) here
    getPlayerInfo()
   {
     var contestantsInfoRef=database.ref('players');
     contestantsInfoRef.on("value",(data)=>{
allPlayers=data.val();
})
   }

    //write condition to check if contestantInfor is not undefined
    if(keyIsDown(UP_ARROW) && question.index!==null)
    {
      contestantsInfoRef.distance+=50;
      contestantsInfoRef.update();
    }


    //write code to add a note here
    if(allContestants!==undefined)
    {
        fill("blue");
        textSize(25);
        text("NOTE: Contestants who answered correct are highlighted in green colour!",130,230);
    }

    //write code to highlight contest who answered correctly
    for(var plr in allContestants)
    {
      var correctAns="2";
      if(correctAns===allContestants[plr].answer)
      
        fill("green");
      else
        fill("red");
      
    }
    
  }

}
