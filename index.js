let limit = 100;
let noOfQuestions = 10;
let operations = ['+', '-'];

let start = function() {
  $('#math-form').on('submit', function(event) {
    event.preventDefault();
    checkAnswers();
  });
  for (let i = 1; i <= noOfQuestions; i++) {
    $(document).on('blur', `#answer${i}`, function(event) {
      checkAnswer(i);
      checkAnswers();
    });
  }
  $('#restart').on('click', function(event) {
    restart();
  });
  $('#help').on('click', function(event) {
    showHelp();
  });
  generateQuestions();
}

let restart = function() {
  $('#math-form').html('');
  $('#result-info').html('');
  $('#restart').addClass('hidden');
  generateQuestions();
}

let generateQuestions = function() {
  for (let i = 1; i <= noOfQuestions; i++) {
    let run = true;
    while(run) {
      let x = Math.floor((Math.random() * limit) + 1);
      let y = Math.floor((Math.random() * limit) + 1);
      let operation = operations[Math.floor(Math.random() * operations.length)]
      let result = eval(`${x} ${operation} ${y}`);
      if (result <= limit && result >= 0) {
        let task = questionTemplate(x, y, result, operation, i);
        let txt = `<p class="title">Primer ${i}</p>`;
        txt += task;
        $('#math-form').append(txt);
        run = false;
      }
    }
  }
  showHelp();
}

let questionTemplate = function(x, y, result, operation, i) {
  return `
    <div id="question-${i}">
      <input type="hidden" name="x${i}" id="x${i}" value="${x}" />
      <input type="hidden" name="y${i}" id="y${i}" value="${y}" />
      <input type="hidden" name="operation${i}" id="operation${i}" value="${operation}" />
      <label for="answer${i}">${x} ${operation} ${y}</label>
      = <input name="answer${i}" id="answer${i}" type="number"" />
      <input type="hidden" name="result${i}" id="result${i}" value="${result}" />
    </div>
    <div id="status-${i}" class="status"></div>
  `;
}

let showHelp = function() {
  for (i = 1; i <= noOfQuestions; i++) {
    if ($(`#answer${i}`).prop('disabled') == false) {
      let x = $(`#x${i}`).val();
      let y = $(`#y${i}`).val();
      let operation = $(`#operation${i}`).val();
      $(`#status-${i}`).html(breakDown(x, y, operation));
    }
  }
}


let breakDown = function(x, y, operation) {
  if (($('#help').prop("checked") == false) || !['+', '-'].includes(operation) || (limit > 100)) {
    return '';
  }
  let x2 = x % 10;
  let x1 = x - x2;
  let y2 = y % 10;
  let y1 = y - y2;
  let breakDown = `${x1} ${operation} ${y1} + ${x2} ${operation} ${y2}`

  return breakDown;
}

let checkAnswers = function() {
  let correct = 0;
  let total = 0;
  for (i = 1; i <= noOfQuestions; i++) {
    let answer = $(`#answer${i}`).val();
    let result = $(`#result${i}`).val();
    if (answer === result) {
      correct ++;
    }
    if (answer != '') {
      total ++;
    }
  }
  $('#result-info').html(`Tačno ${correct} od ${total}`);
  if (total == noOfQuestions) {
    $('#restart').removeClass('hidden');
  }
}

let checkAnswer = function(i) {
  let answer = $(`#answer${i}`).val();
  let result = $(`#result${i}`).val();
  let status = $(`#status-${i}`);
  if (answer == '') {
    return;
  } else {
    $(`#answer${i}`).prop( "disabled", true );
    status.removeClass('status');
    if (answer === result) {
      status.html('Tačno');
      status.addClass('success');
      status.removeClass('wrong');
    } else {
      status.html(`Netačno, tačan odgovor je: ${result}`);
      status.removeClass('success');
      status.addClass('wrong');
    }
  }
}


$(start);