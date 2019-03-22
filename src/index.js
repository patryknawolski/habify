import 'normalize.css'

function component () {
  let element = document.createElement('h1')

  element.innerHTML = 'Hello world'

  return element
}

document.body.appendChild(component())
