const input = document.querySelector('#input')
const btnDelete = document.getElementById('delete')
const numbers = document.getElementsByClassName('nums')
const symbols = document.getElementsByClassName('symbol')
let lastClicked = 'symbol'

const allowedNum = [...document.querySelectorAll('.nums')].map(ev => ev.textContent)
const allowedSimbols = [...document.querySelectorAll('.symbol')].map(ev => ev.textContent)

Array.from(numbers).forEach(function(numberElement) {
  const numberValue = numberElement.textContent
  numberElement.addEventListener('click', function() {
    lastClicked = 'number'
    input.value += numberValue
    if (input.value.length > 20) {
      input.value = input.value.slice(0, 20);
      alert('Quantidade máxima de caracteres atingido.')
  }
  });
});

Array.from(symbols).forEach(function(numberElement) {
  const symbolValue = numberElement.textContent
  numberElement.addEventListener('click', function() {
    if (lastClicked !== 'symbol') {
      lastClicked = 'symbol'
      input.value += symbolValue
    }
  })
})

let media = window.matchMedia("(max-width: 768px)")
document.querySelector('#clear').addEventListener('click', function () {
  if(media.matches){
    input.value = " "
  } else {
    input.value = " "
    input.focus()
  }
})

btnDelete.addEventListener('click', function (){
  input.value = input.value.slice(0, -1)
})

input.addEventListener('keydown', ev => {
  ev.preventDefault()
  if(allowedNum.includes(ev.key)){
    input.value += ev.key
    return
  }
  if(allowedSimbols.includes(ev.key)){
    input.value += ev.key
    return
  }
  if(ev.key === 'Backspace'){
    input.value = input.value.slice(0, -1)
  }
  if(ev.key === 'Enter'){
    calculate()
  }
})

input.addEventListener('keyup', () => {
  if (input.value.length > 20) {
      input.value = input.value.slice(0, 20);
      alert('Quantidade máxima de caracteres atingido.')
  }
})

document.querySelector('#equal').addEventListener('click', calculate)

function calculate(){
  try {
    const result = eval(input.value)
    input.value = result
  } catch {
    alert('Formato usado inválido.')
    input.value = ''
  }
}

document.querySelector('#copyToClipboard').addEventListener('click', () => {
  navigator.clipboard.writeText(input.value)
  alert('Copiado para a área de transferência com sucesso.')

  // if(btnCopy.innerText === 'Copy'){
  //   btnCopy.innerText = 'Copied!'
  //   btnCopy.classList.add('success')
  //   navigator.clipboard.writeText(input.value)
  //   alert('Copiado para a área de transferência com sucesso.')
  //  } else {
  //   btnCopy.innerText = 'Copy'
  //   btnCopy.classList.remove('success')
  //  }
})

const main = document.querySelector('main')
const root = document.querySelector(':root')
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark"){
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#101010")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = "dark"
  }
})