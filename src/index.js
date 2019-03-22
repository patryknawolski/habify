function component () {
  let element = document.createElement('h1')

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello world'

  return element
}

document.body.appendChild(component())
