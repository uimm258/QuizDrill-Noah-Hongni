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

function welcomePageSource() {
  return `
  <div class='welcome'>
    <h1>What Is Your Rank?</h1>
    <h2>League of Legend Pop-Quiz!</h2>
    <h2>League of Legend Pop-Quiz! Submit your summonername to start the quiz.</h2>
    <img src="" alt="">//<!--add an imagae on the page-->
    <div class="ready-section">
    <label for="welcome-page">Your Summonername</label>
    <input type="text" name="welcome-page" class='quiz-welcome-page' placeholder="e.g. BestLeeSinNA">
    <button class="ready-butt">Submit and Go</button>
    </div>
  </div>
`;
}
function generateQuestion(counter) {
  return `<div class="equiz">
<h2>${store.questions[counter].question}</h2>
<form class="tomwallace">
<input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[0]}">
<label for="male">${store.questions[counter].answers[0]}</label><br>
<input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[1]}">
<label for="female">${store.questions[counter].answers[1]}</label><br>
<input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[2]}">
<label for="other">${store.questions[counter].answers[2]}</label>
<input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[3]}">
<label for="other">${store.questions[counter].answers[3]}</label>
<button type="submit">Submit</button>
</form>
</div>`;
}
function startQuiz() {
  $('.ready-section').on('click', '.ready-butt', function () {
    let userAnswer = $('input[name="welcome-page"]').val();
    console.log(userAnswer);
    store.quizStarted = true;
    let counter = store.questionNumber;
    let question = generateQuestion(counter);
    renderAll(question);
  });
}
function handleAnswerChoice() {
  $('body').submit('#answer-form', function (evt) {
    evt.preventDefault();
    let answer = $('input[name="answer"]:checked').val();
    console.log(answer);
    let count = store.questionNumber;
    if (answer === store.questions[count].correctAnswer) {
      store.questionNumber += 1;
      store.score += 1;
      let nextQuestion = generateQuestion(store.questionNumber);
      return renderAll(nextQuestion + returnCorrectAnswer());
    } else {
      store.questionNumber += 1;

    }
  });
}
function returnCorrectAnswer() {
  const correctTemplate = `<div class='correct-answer'></div>
  <h1 class='right-or-wrong'>You Got It!</h1>
  <button class='next-or-back'>Next Question</button>`;
  return correctTemplate;
}

function returnThatsWrong() {
  const wrongTemplate = `<div class='correct-answer'></div>
  <h1 class='right-or-wrong'>That's not it!</h1>
  <button class='next-or-back'></button>`;
  return wrongTemplate;
}









function renderAll(template) {
  let page = '';
  if (store.quizStarted === false) {
    page += welcomePageSource();
  }
  if (store.quizStarted === true && store.questionNumber < 5) {
    page += template;
  }
  $('.main').html(page);
}
function main() {
  renderAll();
  startQuiz();
  handleAnswerChoice();
}
$(main);
