'use strict';

/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [{
    question: 'What color is broccoli?',
    answers: [
      'red',
      'orange',
      'pink',
      'green'
    ],
    correctAnswer: 'green'
  },
  {
    question: 'What is the current year?',
    answers: [
      '1970',
      '2015',
      '2019',
      '2005'
    ],
    correctAnswer: '2019'
  }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

/* These functions return HTML templates
function questionsGenerator(item) {
    return <div class = `class` >
        <
        h2 > $(item.question) < /h2>
    console.log("`templateGenerator` fn ran")
        //takes in array/object
}


function answerTemplateGenerator() {
    console.log('answer generator ran')
} 
*/

function welcomePageSource() {
  return `<div class='welcome'>
    <h1>What Is Your Rank?</h1>
    <h2>League of Legend Pop-Quiz!</h2>
    <h2>League of Legend Pop-Quiz! Submit your summonername to start the quiz.</h2>
    <img src="" alt="">//<!--add an imagae on the page-->

    <form id='quiz-welcome-page'>
      <label for="welcome-page">Your Summonername</label>
      <input type="text" name="welcome-page" class='quiz-welcome-page' placeholder="e.g. BestLeeSinNA">
      <button type="enter">Enter</button>

      <button type="submit">Submit and Go</button>
    </form>
  </div>
`;
}

function generateQuestion(item) {
  return `<div class="quiz">
  <h2>${store.question}</h2>
  <form>
  <input type="radio" id="${item.answers[0]}" name="answer" value="${item.answers[0]}">
  <label for="other">${item.answers[0]}</label><br>
  <input type="radio" id="${item.answers[1]}" name="answer" value="${item.answers[1]}">
  <label for="other">${item.answers[1]}</label><br>
  <input type="radio" id="${item.answers[2]}" name="answer" value="${item.answers[2]}">
  <label for="other">${item.answers[2]}</label><br>
  <input type="radio" id="${item.answers[3]}" name="answer" value="${item.answers[3]}">
  <label for="other">${item.answers[3]}</label>
  <button type="submit">Submit</button>
  </form>
</div>`;
}



function startQuiz() {
  $('main').submit('#quiz-welcome-page', function (evt) {
      evt.preventDefault();
      let userAnswer = $('input[name=welcome-page]').val()
    store.quizStarted = true;
    let question = generateQuestion(store.questions[store.questionNumber]);
    renderAll(question);
  });
}

function handleAnswerChoice() {
    $("main").on("submit", "form", function (evt) {
        evt.preventDefault();
        let currentQuestion = store.questions[store.questionNumber];
        let answer = $('input[name=answer]:checked').val();
        console.log(answer, currentQuestion.correctAnswer);
        if (answer === currentQuestion.correctAnswer) {
            alert("Woot Woot!");
        } else {
            alert("You suck!");
        }
        store.questionNumber++;
        let nextQuestion = generateQuestion(store.questions[store.questionNumber]);
        renderAll(nextQuestion);
    })
};





function renderAll(template) {
  let page = '';
  if (store.quizStarted === false) {
    page+= welcomePageSource();
  } else if (store.quizStarted === true && store.questionNumber < 5) {
      page+= template
  }
  $('.main').html(page);
}


function main() {
    startQuiz();
    renderAll();
}

$(main);


/*
function handleAnswerChoice() {
    $('main').on('submit', 'form', function(evt) {
        evt.preventDefault();
        let currentQuestion = store.questions[store.questionNumber]
        let answer = $('input[name=answer]:checked')
        console.log($(`input[name=answer]:checked`).val())
    })
}



function render(html) {
    $('main').html(html)
}




                /********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)