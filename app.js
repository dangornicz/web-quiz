let data, ansArr, display, random, q, a1 ,a2 ,a3, a4;
let qNum = 0;
let numCorrect = 0;
let green = "rgb(41, 177, 41)";

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
    ansArr = [a1 , a2 , a3 , a4]; //array that holds the answers for current question

    await callQuiz();
    assignments(); 
    
};

function assignments() { //assign question and answers to html elements
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

function checkAnswer() { //checks radio button selected vs. correct answer and clears radio buttons 
    const radioSelected = document.querySelector('input[name="btn"]:checked');

        if(radioSelected != null) { //if radio button is selected (else displays message)
            if(radioSelected.value == random) { //if answer correct 
                numCorrect++;
                display.style.color = green;
                display.style.borderColor = green;
                display.innerHTML = `Score = ${numCorrect} / 10`;
            } else { //if answer incorrect
                display.style.color = "red";
                display.style.borderColor = "red";
                display.innerHTML = `Score = ${numCorrect} / 10<br>The correct answer was: ${data.results[qNum].correct_answer}`;
            }
            qNum++; //enumerate variable that tracks what # question 
        } else {
            alert("Please select an answer!");
        }
        radioSelected.checked = false; //clear radio buttons
    }
    
    


async function btnClick() {//when button is clicked

    if(qNum < 9){ //for questions 1-9 (indexes 0-8 in array)
        checkAnswer();
        assignments();
    } else if(qNum == 9) {//after question #10 is answered
        checkAnswer(); //to reset radio buttons
        qNum = 10; //to trigger 'else' below (qNum will be reset to '0' in 'else')
        q.innerHTML = "GAME OVER!!! Press button below to play again";
        submit.value = "Click to play again!";
        ansArr.forEach(element => { //clear text-values in radio buttons
            element.innerHTML = ""; 
        });
    } else {//when button clicked to reset game
        qNum = 0;
        numCorrect = 0;
        display.style.color = green;
        display.style.borderColor = green;
        display.innerHTML = `Score = ${numCorrect} / 10`;
        submit.value = "Click to answer";
        await callQuiz();
        assignments();
    }
}





