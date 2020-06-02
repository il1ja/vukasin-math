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
    });
  }
  generateQuestions();
  $('#math-form').append(`<br /><br /><input type="submit" name="submit" value="Pošalji" />`);
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
}

let questionTemplate = function(x, y, result, operation, i) {
  return `
    <div id="question-${i}" class="status">
      <input type="hidden" name="x${i}" id="x${i}" value="${x}" />${x}
      ${operation}
      <input type="hidden" name="y${i}" id="y${i}" value="${y}" />${y}
      = <input name="answer${i}" id="answer${i}" type="number"" />
      <input type="hidden" name="result${i}" id="result${i}" value="${result}" />
    </div>
    <div id="status-${i}" class="status"></div>
  `;
}

let checkAnswers = function() {
  let correct = 0;
  for (i = 1; i <= noOfQuestions; i++) {
    let answer = $(`#answer${i}`).val();
    let result = $(`#result${i}`).val();
    if (answer === result) {
      correct +=1;
    }
  }
  $('#result-info').html(`Tačno ${correct} od ${noOfQuestions}`);
}

let checkAnswer = function(i) {
  let answer = $(`#answer${i}`).val();
  let result = $(`#result${i}`).val();
  let status = $(`#status-${i}`);
  if (answer == '') {
    return;
  } else {
    $(`#answer${i}`).prop( "disabled", true );
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