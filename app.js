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
      correctAnswer: 'Riot'
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
    <p>Questions:${counter+1}/${store.questions.length}</p>
    <p>Scores:${Math.round(store.score / store.questions.length * 100)}%</p>
    
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
  let questionNumber = store.questionNumber - 1
  const wrongTemplate = `
  <div class='correct-answer'>
    <h1 class='right-or-wrong'>That's not it!</h1>
    <p>The correct answer is: ${store.questions[questionNumber].correctAnswer}</p>
    <button class='next-or-back'>Next Question</button>
  </div>
  `;
  return wrongTemplate;
}

function endOfQuiz() {
  const summary = ` 
  <div class="end-game">
    <h1>Thank you For Taking The quiz!</h1> 
    <h1> Your final score is ${Math.round(store.score / store.questions.length * 100)}%</p>
    <h3>Think you can do better? Try It Again!</h3>
    <button class="restart" name="restart">Restart</button>
  </div>`;
  return summary;
}

function restartQuiz() {
  $('.end-game').on('click', '.restart', function () {
    store.quizStarted = true;
    store.questionNumber = 0;
    let counter = store.questionNumber;
    let question = generateQuestion(counter);
    renderAll(question);
    handleNextQuestion();
  });
}

function startQuiz() {
  $('.ready-section').on('click', '.ready-butt', function () {
    let userAnswer = $('input[name="welcome-page"]').val();

    if(userAnswer){
      store.quizStarted = true;
      let counter = store.questionNumber;
      let question = generateQuestion(counter);
      renderAll(question);
    } 
  });
}

function handleAnswerChoice() {
  $('body').submit('#answer-form', function (evt) {
    evt.preventDefault();
    let answer = $('input[name="answer"]:checked').val();
    if(answer){
      let correctAns = store.questions[store.questionNumber].correctAnswer;
      if (store.questionNumber + 1 === store.questions.length) {
        renderEndPage();
      } else {
        renderResults(correctAns);
      } 
    } 
  });
}

function handleNextQuestion() {
  $('.correct-answer').on('click', '.next-or-back', function () {
    console.log('Next question button');
    store.quizStarted === true;
    let counter = store.questionNumber;
    let question = generateQuestion(counter);
    renderAll(question);
    handleNextQuestion();
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

function renderEndPage(answer) {
  let page = '';
  page += endOfQuiz(answer);
  $('main').html(page);
  restartQuiz();
}

function renderResults(answer) {
  let page = '';
  page += checkAnswer(answer);
  $('main').html(page);
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
  if (store.quizStarted === true && store.questionNumber === store.questions.length){
    page += endOfQuiz();
    store.questionNumber=0;
    store.score=0
  }

  
  $('main').html(page);
}




function main() {
  renderAll();
  startQuiz();
  restartQuiz();
  handleAnswerChoice();
  handleNextQuestion();
}

$(main);