export class Question{
    static create(question){
    return  fetch('https://tigran-question-app.firebaseio.com/question.json',{
             method: 'POST',
             body: JSON.stringify(question),
             headers: {
                 'Content-Type':'application/json'
             }
         })
         .then(response=>response.json())
         .then(response=>{
           question.id=response.name
           return question
        })
        .then(addToLocalStorage)
        .then(Question.renderList)
    }
    static fetch(token){
        if(!token){
           return Promise.resolve('<p class="error"> Սխալ մութքագրում </p>')
        }
    return  fetch(`https://tigran-question-app.firebaseio.com/question.json?auth=${token}`)
    .then(response=>response.json())
    .then(response=>{
       if (response && response.error){
        return ` <p class="error"> ${response.error} </p>`
        }

        return response?Object.keys(response).map(key=>({
            ...response[key],
            id:key
        })): []
    })
       
    }

    static renderList(){
        const questions=getQuestLocal()
        const html=questions.length
        ?questions.map(toCard).join('')
        :`<div class="mui--text-headline">Դուք դեռ Վոչինչ չեք հարցրել</div>`
        const list= document.getElementById('list');
        list.innerHTML=html
        
    }
    static listToHtml(questions){
        return questions.length
        ?`<ol>${questions.map(q=>`<li>${q.text}</li>`).join('')}</ol>`
        :`<p>Հարցեր չկան</p>`
    }
}
function addToLocalStorage(question){
    let all=getQuestLocal()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))

}



function getQuestLocal(){
    return JSON.parse(localStorage.getItem('questions')||'[]')
}
function toCard(question){
    return   ` 
    <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    
    </div>
    
    <div>${question.text} </div>
    <br>
    `
}