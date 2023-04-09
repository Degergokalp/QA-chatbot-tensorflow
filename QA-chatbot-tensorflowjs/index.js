let model;

// The text field containing the input text
let inputText;

// The text field containing the question
let questionText;

// The div where we will write the model's answer
let answersOutput;

function createButton(innerText, id, listener, selector, disabled = false) {
  const btn = document.createElement('BUTTON');
  btn.innerText = innerText;
  btn.id = id;

  btn.addEventListener('click', listener);
  document.querySelector(selector).appendChild(btn);
}

const colect = [];

function setupButtons() {
  // Button to predict
  createButton('Go!', 'answer-btn',
    () => {
      //questions
      const messagesContainer = document.getElementById("messages");
      let userDiv = document.createElement("div");
      userDiv.id = "user";
      userDiv.className = "user response";
      userDiv.innerHTML = `${questionText.value}`;
      messagesContainer.appendChild(userDiv);

      //answers
      let botDiv = document.createElement("div");
      let botText = document.createElement("span");
      botDiv.id = "bot";
      botDiv.className = "bot response";
      botText.innerText = "Typing...";
      botDiv.appendChild(botText);
      messagesContainer.appendChild(botDiv);

      messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
      
      model.findAnswers(questionText.value, inputText.value).then((answers) => {
        const ans = answers.map((answer) => `${answer.text}`);
        const conf = answers.map((answer) => `(confidence: ${answer.score})`);
        const ans_conf = answers.map((answer) => `${answer.text} (confidence: ${answer.score})`);        
        colect.push(ans_conf)
        
        const answersList = answers.map((answer) => `<li>${answer.text} (confidence: ${answer.score})</li>`)
          .join('<br>');

          //setTimeout for the bot response
          setTimeout(() => {
            botText.innerHTML = `${ans_conf[0]}`;
            // Start file download-1.
            document.getElementById("btn")
            .addEventListener("click", function() {

            var filename = "chat_archive.json";

            var textInput = document.getElementById('input-text');
          

            var chatbotdata = {
              "chat_archive": {
              "text": "",
              "chat": {},
              }
            };
            
            //create JSON file for chat archive
            var msg = document.getElementById('messages').children;
            for (i = 0; i <= msg.length - 1; i++) {
              chatbotdata.chat_archive.text= textInput.value;
              var question = i + " - Q";
              var answer = i + " - A";
              if (msg[i].id == "user"){
                Object.keys(chatbotdata).forEach(key => Object.assign(chatbotdata[key].chat, { [question]: msg[i].innerText }));
              }else if (msg[i].id == "bot"){
                Object.keys(chatbotdata).forEach(key => Object.assign(chatbotdata[key].chat, { [answer]: msg[i].innerText }));
              }
            }
              var myJsonString = JSON.stringify(chatbotdata);
              download(filename,  myJsonString); 
            },false);

            // create txt file for all possible answers
            document.getElementById("btn2")
            .addEventListener("click", function() {
            var filename = "poss_answrs.txt";
            download(filename,  colect); },false);

          }, 2000);
      }).catch((e) => console.log(e));

      document.getElementById("question").value = "";

    }, '#answer-button', true);
}
//get txt file
document.getElementById('input-file')
  .addEventListener('change', getFile)

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(
      document.getElementById('input-text'), input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
  	target.value = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

function download(file, text) {
  var element = document.createElement('a');
  element.setAttribute('href',
  'data:text/plain;charset=utf-8, '
  + encodeURIComponent(text));
  element.setAttribute('download', file);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

async function init() {
  setupButtons();
  answersOutput = document.getElementById('answer');
  inputText = document.getElementById('input-text');
  questionText = document.getElementById('question');

  model = await qna.load();
  document.getElementById('answer-btn').disabled = false;
}

init();