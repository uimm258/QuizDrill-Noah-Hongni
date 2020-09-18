'use strict';
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'When was the online game "League of Legends" released?',
      answers: [
        '2008',
        '2009',
        '2010',
        '2011'
      ],
      correctAnswer: '2009'
    },
    {
      question: 'Which video game company developed the game "League of Legends?',
      answers: [
        'Activison',
        'Capcom',
        'Riot',
        'Blizzard'
      ],
      correctAnswer: 'Roit'
    },
    {
      question: 'Who is the champion Tryndamere married to in "League of Legends?"',
      answers: [
        'Ashe',
        'Silver',
        'Lux',
        'Janna'
      ],
      correctAnswer: 'Ashe'
    },
    {
      question: 'How many lanes are there in the rank map of the game "League of Legends?"',
      answers: [
        'One',
        'Two',
        'Three',
        'The map is a circle'
      ],
      correctAnswer: 'Three'
    },
    {
      question: 'What animals are seen in the Howling Abyss map of the game "League of Legends?"',
      answers: [
        'poro',
        'unicorn',
        'mermaid',
        'There is no animals in this map'
      ],
      correctAnswer: 'poro'
    },
    {
      question: 'Which tribe do the "League of Legends" champions Anivia, Braum, Gragas, Nunu and Tryndamere belong to?',
      answers: [
        'Winter Claw',
        'Frost Guard',
        'Avarosan',
        'All of them'
      ],
      correctAnswer: 'Avarosan'
    },
    {
      question: 'Who joins Serylda and Avarosa as the third sister in the "League of Legends" Three Sisters triad?',
      answers: [
        'Kalista',
        'Katerina',
        'Akali',
        'Lissandra'
      ],
      correctAnswer: 'Lissandra'
    },
    {
      question: 'Which "League of Legends" character leads the Winter Claw tribe?',
      answers: [
        'Nunu',
        'Lissandra',
        'Quinn',
        'Sejuani'
      ],
      correctAnswer: 'Sejuani'
    },
    {
      question: 'Which "League of Legends" champion does not come from the Void?',
      answers: [
        'Kha Zix',
        'Cho Gath',
        'Karthus',
        'Vel koz'
      ],
      correctAnswer: 'Karthus'
    },
    {
      question: 'In "League of Legends" Cassiopeia is half woman and half what creature?',
      answers: [
        'horse',
        'lion',
        'snake',
        'fish'
      ],
      correctAnswer: 'snake'
    },

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
    <h1>League of Legend Pop-Quiz!</h1>
    <h2>Submit your summonername to start the quiz.</h2>
    <div class="ready-section">
    <label for="welcome-page">Your Summonername</label>
    <input type="text" name="welcome-page" class='quiz-welcome-page' placeholder="e.g. BestLeeSinNA">
    <button class="ready-butt">Submit and Go</button>
    </div>
  </div>
`;
}
function generateQuestion(counter) {
  return `
  <div class="equiz">
    <h2>${store.questions[counter].question}</h2><br>
    
    <form class="tomwallace">
      <input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[0]}">
      <label for="male">${store.questions[counter].answers[0]}</label><br>
      
      <input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[1]}">
      <label for="female">${store.questions[counter].answers[1]}</label><br>
      
      <input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[2]}">
      <label for="other">${store.questions[counter].answers[2]}</label><br>
      
      <input type="radio" id="answers" name="answer" value="${store.questions[counter].answers[3]}">
      <label for="other">${store.questions[counter].answers[3]}</label><br>

      <button type="submit">Submit</button>
    </form>
</div>`;
}

function returnCorrectAnswer() {
  const correctTemplate = `
  <div class='correct-answer'>
    <h1 class='right-or-wrong'>You Got It!</h1>
    <button class='next-or-back'>Next Question</button>
  </div>
  `;
  return correctTemplate;
}

function returnThatsWrong() {
  const wrongTemplate = `
  <div class='correct-answer'>
    <h1 class='right-or-wrong'>That's not it!</h1>
    <button class='next-or-back'>Next Question</button>
  </div>
  `;
  return wrongTemplate;
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
    let correctAns = store.questions[store.questionNumber].correctAnswer;
    renderResults(correctAns);
  });
}
function handleNextQuestion() {
  $('.correct-answer').on('click', '.next-or-back', function () {
    console.log('Next question button');
    store.quizStarted === true;
    let counter = store.questionNumber;
    let question = generateQuestion(counter)
    renderAll(question);
  });
}
function checkAnswer(correctAns) {
  let answer = $('input[name="answer"]:checked').val();
  if (answer === correctAns) {
    store.questionNumber += 1;
    store.score += 1;
    return returnCorrectAnswer();
  } else {
    store.questionNumber += 1;
    return returnThatsWrong();
  }
}
function renderResults(answer) {
  let page = '';
  page += checkAnswer(answer);
  $('.main').html(page);
  handleNextQuestion();
}

function renderAll(template) {
  let page = '';
  if (store.quizStarted === false) {
    page += welcomePageSource();
  }
  if (store.quizStarted === true && store.questionNumber < 10) {
    page += template;
  }
  if (store.quizStarted === true && store.questionNumber === 10 ){
    page += finalPageSource();
  }

  $('.main').html(page);
}

function restartQuiz(){
  $('.thankyou-page').on('click', 'restart-butt', function (){
    startQuiz();
  });
}

function finalPageSource(){
  return `
  <div class="thankyou-page">
    <h1 class = "thankyou">Thank you For Taking The quiz!</h1> 
    <h3 class="thankyou">Think you can do better? Try It Again!</h3>
    <button class="restart-butt">Restart</button>
  </div>`;
}

function main() {
  renderAll();
  startQuiz();
  handleAnswerChoice();
  handleNextQuestion();
  restartQuiz()
}
$(main);