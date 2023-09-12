let data, ansArr, display, random, q, a1 ,a2 ,a3, a4;
let qNum = 0;
let numCorrect = 0;

async function callQuiz() {
    
    try {
        let response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
        data = await response.json();
    } catch(error) {
        console.log("Error fetching data from api" , error);
    }
    
}

//call api and populate elements on page load
window.onload = async () => {

    //assigning DOM objects and putting in array for later use in assignments()
    display = document.getElementById("displayScore");
    q = document.getElementById("question");
    a1 = document.getElementById("l1");
    a2 = document.getElementById("l2");
    a3 = document.getElementById("l3");
    a4 = document.getElementById("l4");
    ansArr = [a1 , a2 , a3 , a4];
    
    await callQuiz();
    assignments(); 
    
};


function assignments() {
    let temp = qNum + 1;
    q.innerHTML = `${temp}. ${data.results[qNum].question}`;

    random = Math.floor(Math.random() * 4);
    ansArr[random].innerHTML = data.results[qNum].correct_answer;

    let k = 0;
    for(let i = 0; i <= 3; i++) {
        
        if(i != random) {
            ansArr[i].innerHTML = data.results[qNum].incorrect_answers[k];
            k++;
        }
    }
}  

function checkAnswer() {
    const radioSelected = document.querySelector('input[name="btn"]:checked');
    
    if(qNum < 9) {
        
        if(radioSelected != null) {
            if(radioSelected.value == random) {
                numCorrect++;
            }
            display.innerHTML = `Score = ${numCorrect} / 10`;
            qNum++;
        } else {
            alert("Please select an answer!");
        }
    }
    radioSelected.checked = false;
    
}

async function btnClick() {
    if(qNum < 9){
       
        checkAnswer();
        assignments();
         
    } else if(qNum == 9) {
        qNum = 10; //to trigger 'else' below (qNum will be reset to '0' in 'else')
        numCorrect = 0;
        checkAnswer(); //to reset radio buttons
        q.innerHTML = "GAME OVER!!! Press button below to play again";
        submit.value = "Click to play again!";
        ansArr.forEach(element => {
            element.innerHTML = ""; 
        });
    } else {
        qNum = 0;
        display.innerHTML = `Score = ${numCorrect} / 10`;
        submit.value = "Click to answer";
        await callQuiz();
        assignments();
    }
}





