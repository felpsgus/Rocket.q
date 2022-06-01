import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal-wrapper h2')
const modalparagraph = document.querySelector('.modal-wrapper p')
const modalButton = document.querySelector('.modal-wrapper button')

const checkButtons = document.querySelectorAll('.actions a.check')
checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

const deleteButton = document.querySelectorAll('.actions a.delete')
deleteButton.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})

const cancelButton = document.querySelector('.modal-wrapper .button')
cancelButton.addEventListener('click', event => {
  modal.close()
})

function handleClick(event, check = true) {
  event.preventDefault()

  const text = check ? 'Marcar como lida' : 'Excluir'
  const slug = check ? 'check' : 'delete'
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = `${text} esta pergunta`
  modalparagraph.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`
  modalButton.innerHTML = check ? 'Sim, marcar' : 'Sim, excluir'

  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modal.open()
}
