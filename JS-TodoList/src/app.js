import {Question} from  './question'
import {isValid, createModal} from './utils'
import {getAuthForm, authWithEmailAndPassword} from  './auth'

import './style.css'
const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')

const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load',Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', modalOpen)

input.addEventListener('input', ()=>{
    submitBtn.disabled =!isValid(input.value)
})
function submitFormHandler(event) {
    event.preventDefault()
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true
        ////////////////////////  Async server
        Question.create(question).then(()=>{

            console.log('Question', question)
            input.value = ''
            input.className=''
            submitBtn.disabled=false
        })
    }

}
function modalOpen(){
    createModal('Մութքագրում', getAuthForm())
    document.getElementById('auth-form').addEventListener('submit',authFormHandler, {once:true})
}



function authFormHandler(event){
    event.preventDefault()
    const btn=event.target.querySelector('button')
    const email=event.target.querySelector('#email').value
    const password=event.target.querySelector('#password').value
  authWithEmailAndPassword(email,password)
  .then(Question.fetch)
  .then(renderModalAfterAuth)
  .then(()=>btn.disabled=false)
}

function renderModalAfterAuth(content){
     if(typeof content === 'string'){
       createModal('ՍԽԱԼ։!',content)
     }else{
       createModal('Հարցեի ցուցակ',Question.listToHtml(content))
     }
}