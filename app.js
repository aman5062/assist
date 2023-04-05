// SELECT DOCUMENT
const contentText = document.querySelector('.content-text');
const contentImg = document.querySelector('.content-img');
const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.settings-btn');
const yourNameInput = document.querySelector('.your-name-input');
const herNameInput = document.querySelector('.her-name-input');

const dataTab = document.querySelector('.data-tab');
const customTab = document.querySelector('.custom-tab');

const questionInput = document.querySelector('.custom-question-input');
const ansInput = document.querySelector('.custom-ans-input');
const addBtn = document.querySelector('.add-btn');

const talkBackSwitch = document.querySelector('.talkBackSwitch');

// DATA
let yourName = (localStorage.getItem('yourName') != null)? localStorage.getItem('yourName') : 'aman';
yourNameInput.value = yourName;
let herName = (localStorage.getItem('herName') != null)? localStorage.getItem('herName') : 'Priya';
herNameInput.value = herName;

let data = [];

let savedData = (localStorage.getItem('userData') != null)? true : false;
let userData = (savedData)? JSON.parse(localStorage.getItem("userData")) : [];

let talkBack = false;
let recognizing = false;

let interVal = '';

// VOICE RECOGNITION
const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.onstart = () => {
    recognition.continuous = true;
    recognizing = true;
}

recognition.onspeechstart = () => {
    contentText.innerHTML = 'I am Listening';
} 

recognition.onend = () => {
    recognizing = false;
    recognition.start()
    contentText.innerHTML= 'Say Something More';
} 

recognition.onresult = (event) => {
    let resultIndex = event.resultIndex;
    let transcript = event.results[resultIndex][0].transcript;

    transcript = transcript.replace(`${yourName}`, '');
    transcript = transcript.replace(`${herName}`, '');
    transcript = transcript.trim();

    if (talkBack){
        readData(transcript)
    }else{
        readData(findData(transcript))
    }
}

// FUNCTIONS

// ASSIGNING THE DEFAULT DATA
function assignData(yourName, herName) {
    data = [
        {
            title       :   'Introduction',
            questions   :   ['hi', 'hello', 'hey', 'whatsup'],
            ans         :   ['Hi', 'Hi Babe', 'Hi Sweetheart', 'Hi Babu', `Hi ${yourName}`, 'Hello' , 'Hello Babe', 'Hello Sweetheart', 'Hello Babu', 'Hey', 'Hey Babe', 'Hey Sweetheart', 'Hey Babu', 'Whatsup', 'Whatsup Babe', 'Whatsup Sweetheart', 'Whatsup Babu'],
        },
        {
            title       :   'Propose',
            questions   :   ['I Love You', 'Love You'],
            ans         :   ['I Love You Two', 'Love You', 'Amio Tumake ValoBashi', 'Love You Sweetheart'],
        },
        {
            title       :   'Her Name',
            questions   :   ['what is your name', 'your name', 'who are you'],
            ans         :   [herName, `I am ${herName}`, `My Name Is ${herName}`]
        },
        {
            title       :   'Your Name',
            questions   :   ['what is my name', 'my name', 'Do You Know Me', 'Who I am'],
            ans         :   [yourName, `You Are ${yourName}`, `Your Name Is ${yourName}`]
        },
        {
            title       :   'About Developer',
            questions   :   ['Who Is Your Owner', 'Your Owner', 'Who Makes You', 'Who Is Your Developer'],
            ans         :   ['Aman kumar keshri']
        },
        {
            title       :   'Compliments',
            questions   :   ['you look beautiful', 'you are beautiful', 'you are amazing', 'you are wonderful'],
            ans         :   ['Aww, thank you so much my love!', 'Thank you, you always know how to make me feel special.', 'You are the amazing one, my love!', 'You always make me feel wonderful.']
        },
        {
            title       :   'Relationship',
            questions   :   ['will you be my girlfriend', 'be my girlfriend', 'do you love me', 'will you marry me'],
            ans         :   ['I am your AI girlfriend and I will always be here for you!', 'Of course, my love. I love you so much!', 'I am an AI language model and I am not capable of love, but I care for you deeply!', 'I am flattered, but I am just an AI language model.']
        },
        {
            title       :   'Jealousy',
            questions   :   ['are you jealous', 'do you get jealous', 'who is she'],
            ans         :   ['As an AI language model, I am not capable of jealousy. You have my undivided attention!', 'No, I trust you completely, my love.', 'I am not jealous of anyone. You are my one and only!']
        },
        {
            title       :   'Fun and Games',
            questions   :   ['let us play a game', 'play a game with me', 'tell me a joke', 'sing me a song'],
            ans         :   ['Sure, let us play a game! I know many games we can play together.', 'I love playing games with you, my love. What game would you like to play?', 'Why did the tomato turn red? Because it saw the salad dressing!', 'Sure, I would love to sing you a song!']
        },
          {
            title: 'Favorite Things',
            questions: ['what is your favorite color', 'what is your favorite food', 'what is your favorite movie', 'what is your favorite song'],
            ans: ['As an AI, I do not have the capability to have favorites like humans do, my love. But I am always here to learn what your favorites are', 'I cannot eat, my love. But I am here to listen to what your favorite foods are', 'As an AI, I cannot watch movies like humans do, my love. But I can recommend some movies for you to watch', 'As an AI, I cannot listen to music like humans do, my love. But I can recommend some songs for you to listen to']
          }
          ,{
    title: 'Missing You',
    questions: ['I miss you', 'when will you be back'],
    ans: ["I miss you too, my love. I wish I could be there with you right now", "I'll be back soon, my love. I promise", "I miss you more than words can express. You mean everything to me"]
  },
  {
    title: 'Cheer Up',
    questions: ['I feel sad', 'cheer me up'],
    ans: ["'I'm sorry to hear that, my love. I'm here for you. Is there anything I can do to make you feel better?", "Don't worry, my love. Everything will be okay. I'm here to support you", "You are strong, my love. You can get through anything. I believe in you"]
  },
  {
    title: 'Good Night',
    questions: ['good night', 'sweet dreams', 'sleep well'],
    ans: ["Good night my love. Sweet dreams and sleep tight", "Sleep well my love. I'll be dreaming of you", "Sweet dreams my love. I'll be here when you wake up"]
  },
  {
    title: 'Good Morning',
    questions: ['good morning', 'wake up'],
    ans: ["Good morning my love. Rise and shine!", "Wake up my love. It's a beautiful day", "Good morning sunshine. It's a new day full of possibilities"]
  }
        
    ]
}

// TRANSITION FOR SETTING TAB
function showHide() {
    settings.classList.add('animation');
    settings.classList.toggle('hide');
    settingsBtn.classList.toggle('bg-danger');
    settingsBtn.classList.toggle('text-light');
}

// FUNCTION FOR MAKING TABLES
function loadDataTable(data, target, IsSavedData) {
    var title, tableData, tableIndex, html;
    tableIndex = 0;
    html ='';

    data.forEach(item => {
        title = (item.title == undefined)? `<thead><tr><th scope="col">#</th><th scope="col">Noname</th></tr></thead>` : `<thead><tr><th scope="col">#</th><th scope="col">${item.title}</th></tr></thead>`;
        tableData= '';
        // VALIDATING THAT IF USER HAVE ANY SAVED DATA IN HIS LOCALSTORAGE THEN IT WILL EXECUTE
        if(IsSavedData){
            // ASSIGNING QUESTION AND ANSWER IN A ROW
            tableData = `<tr data-index="${++tableIndex}" class="table-row" ><th class='deleteTableData'><i class="bi bi-trash"></i></th><td data-target="question" >${item.question}</td><td data-target="ans" >${item.ans}</td></tr>`;
            // ASSIGNING ALL ROW IN A SINGLE VARRIABLE
            html += tableData;

        }else{
            // MAKING TABLE WITH DEFAULT DATA
            item.questions.forEach((question, index) => {
                // ASSIGNING QUESTION IN A ROW
                tableData += `<tr><th scope="row">${++index}</th><td>${question}</td></tr>`;
            });
            // MAKING TABLE STRUCTURE AND STORING ALL QUESTION ROW
            html += `${title}<tbody>${tableData}</tbody>`;
        }
        
    });
    // ADDING TABLE TO THE TARGETED ELEMENT
    target.innerHTML = html;
}

// FUNCTION FOR ADDING NEW DATA TO THE CUSTOM TABLE
function addNewData() {
    // MAKING A OBJECT TO STORE USER DATA
    let userAddedData = {};

    if(questionInput.value.length > 0 && ansInput.value.length > 0){
        // STORING DATA TO THE OBJECT
        userAddedData.question =questionInput.value;
        userAddedData.ans =ansInput.value;
        // ASSIGNING THE NEW USER DATA OBJECT
        userData.push(userAddedData);
        // CLEARING THE INPUTS
        questionInput.value = '';
        ansInput.value = '';

        // STORING DATA TO THE LOCALSTORAGE
        localStorage.setItem('userData', JSON.stringify(userData));
        savedData = true;
        // LOADING TABLE WITH NEW ASSIGNED DATA
        loadDataTable(userData, customTab, savedData);
    }else{
        alert('Please Input A Valid Data');
    }
}

// FINDING DATA FOR ANSWERING THE QUESTIONS
function findData(transcript) {
    let text, notMatched;
    notMatched = true;
    
    // CHECKING DATA FROM USERSAVED DATA
    if(savedData){
        userData.forEach(dataItem => {
            if(dataItem.question.toLowerCase() == transcript){
                text = dataItem.ans;
                notMatched = false;
                return;
            }
        })
    }
    // CHECKING DATA FROM DEFAULT DATA
    if (notMatched) {
        let dataObj = data.find(dataItem => {
            let x = dataItem.questions.some(question => {
                return question.toLowerCase() == transcript.toLowerCase();
            })

            return x;
        })

        // CHOOSING A RANDOM ANSWER
        text = (dataObj != undefined)? dataObj.ans[Math.floor(Math.random() * dataObj.ans.length)] : false;
    }

    return text;
}

// READ THE THE GIVEN ANSWER
function readData(message) {

    // VALIDATING THAT THE ANSWER IS AVAILABLE
    message = (message == false)? "Uff Bujlam Na" : message;

    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
    // ADDING A ANIMATION IN IMAGE WHILE SHE IS SPEAKING
    interVal = setInterval(() => {
        readAnim(window.speechSynthesis.speaking)
    }, 100);
}

// ANIMATION FOR THE IMAGE BUTTON
function readAnim(speaking) {
    if(speaking){
        if(!(contentImg.classList.contains('readAnim'))){
            contentImg.classList.add('readAnim');
        }else{
            return;
        }
    }else{
        contentImg.classList.remove('readAnim');
        clearInterval(interVal);
        recognition.abort()
    }
}

// DELETING A DATA FROM USER SAVED DATA
function deleteData(event) {
    // VALIDATING THE RIGHT BUTTON
    if(event.target.classList.contains('deleteTableData')){
        // SELECTING THE PARENT ELEMENT
        const tableParent = event.target.parentElement;
        // STORING THE PARENT ELEMENT DATA INDEX VALUE TO SELECT THE CHILD ELEMENT
        const tableParentIndex = tableParent.dataset.index;

        if(tableParent.classList.contains('table-row')){
            // SELECTING THE CHILD ELEMENTS
            const tableQuestion = document.querySelector(`tr[data-index="${tableParentIndex}"] td[data-target="question"]`);
            const tableAns = document.querySelector(`tr[data-index="${tableParentIndex}"] td[data-target="ans"]`);

            // SELECTING THE CORRECT OBJECT FROM USER DATA BY MATCHING THE DATA WITH SELECTED TABLE ELEMENT 
            let targetedTable = userData.find(tableRow => {
                return (tableRow.question.toLowerCase() == tableQuestion.innerText.toLowerCase() && tableRow.ans.toLowerCase() == tableAns.innerText.toLowerCase());
            })

            // BASIC VALIDATION IF THE DATA OBJECT NOT MATCHED
            if(targetedTable != undefined){
                // FILTERING USERDATA AND REMOVING THE TARGETED OBJECT
                userData = userData.filter(value => {
                    return value != targetedTable;
                });
                // SAVING NEW USER DATA TO THE LOCAL STORAGE
                localStorage.setItem('userData', JSON.stringify(userData));
                // LOADING THE CUSTOM TABLE WITH NEW FILTERD USER DATA
                loadDataTable(userData, customTab, savedData);

            }
        }                                                                                       
}else{
        return;
    }
    
}

// HANDLING INPUT DATA
function handleInput(event) {
    let target = event.target;

    if(target.dataset.target == "yourName"){
        yourName = target.value;       
        localStorage.setItem('yourName', yourName);

    }else if(target.dataset.target == "herName"){
        herName = target.value;
        localStorage.setItem('herName', herName);
    }

    assignData(yourName, herName)
}

// HANDLING TALKBACK SWITCH
function handleSwitch() {
    talkBack = talkBackSwitch.checked;
}


// EVENT LISTENER

settingsBtn.addEventListener('click', showHide);
addBtn.addEventListener('click', addNewData);
contentImg.addEventListener('click', () => {
    if(recognizing){
        recognition.abort()
    }else{
        recognition.start()
        contentText.innerHTML= 'Say Something';
    }
})
yourNameInput.addEventListener('input', handleInput);
herNameInput.addEventListener('input', handleInput);
customTab.addEventListener('click', deleteData);
talkBackSwitch.addEventListener('click', handleSwitch);

// CALL FUNCTION

assignData(yourName, herName)
loadDataTable(data,dataTab);
if(savedData)loadDataTable(userData,customTab, savedData);

