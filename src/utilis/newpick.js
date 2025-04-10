//The algorithmn needs to achieve two things:
//1.Keep the user swiping
//2.Chooses picks that keeps the user appealling but not too repetitive and recurring making it plain and boring

//How to achive this is very simple:
//we will compare to same form and age at least simliar, and also same social level of school,like private goes with private you get,status and finally those who swiped right on you

//This is called the Aphrodite Conjecture!
//So we look into school prefrence,status,age,form, and those who swiped right on you and elo
//We also take into account of elo, every user starts with 1000 elo, the one who gets a swipe right gets more elo.
//So thats:
//mainly gender, 0=male and 1=female if this fails then everything fails
//Elo takes max 30, if the user has higher elo or same the points are doubled
//School preference max 30 
//users that have swiped right on them 25
//age same for age
//User that they have already seen mind this

//Aphrodite Conjecture

const aphroditeConjecture=(user,scouter)=>{
    const elo= (scouter.elo/200)>(user.elo/200)? (user.elo/200)*2 : (user.elo/200);
    const schoolPreference=scouter.schoolPreference.includes(user.school)?30:0;
    const usersRight= user.rightUsers.includes(user.username)? 25:0;
    let age=0;
    if(Math.abs(user.age-scouter.age)===0){
        age=15
    }else{
        age=10
    }

     return elo+schoolPreference+usersRight+age;
}

module.exports={aphroditeConjecture}