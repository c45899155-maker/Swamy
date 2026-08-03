document.querySelector("button").onclick=function(){
alert("Welcome to Swamy Cricket 🏏");
}
const API_KEY = "YOUR_API_KEY";

async function loadLiveScore() {

    try {

        const response = await fetch(
            `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
        );

        const result = await response.json();

        if(result.status !== "success"){
            document.getElementById("status").innerHTML="API Error";
            return;
        }

        if(result.data.length===0){
            document.getElementById("status").innerHTML="No live matches";
            return;
        }

        const match=result.data[0];

        document.getElementById("match").innerHTML=match.name;

        if(match.score && match.score.length>0){

            const s=match.score[0];

            document.getElementById("score").innerHTML=
            `${s.r}/${s.w}`;

            document.getElementById("status").innerHTML=
            `${s.inning} (${s.o} Overs)`;

        }else{

            document.getElementById("score").innerHTML="Match Started";

            document.getElementById("status").innerHTML=match.status;

        }

    }catch(error){

        console.log(error);

        document.getElementById("status").innerHTML="Connection Failed";

    }

}

loadLiveScore();

// Refresh every 30 seconds
setInterval(loadLiveScore,30000);
