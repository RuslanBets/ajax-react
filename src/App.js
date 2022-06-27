import './App.css';
import { Component } from 'react';


let cities = []
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

fetch(endpoint).then(json => json.json()).then(text => {
  for (const obj of text) {
    cities.push(obj)
  }
})

function addContentDie(value1, value2, value3) {
  let span1 = document.createElement('span')
  let span2 = document.createElement('span')
  let span3 = document.createElement('span')

  span1.innerHTML = value1
  span2.innerHTML = value2
  span3.innerHTML = value3

  let div = document.createElement('div')
  div.append(span1, span2, span3)
  div.classList.add('die')
  return div
}

function addThousandSeparator(num) {
  const string = String(num)
  let result = ''
  let part = ''

  for (let i = string.length - 1; i >= 0; i--) {
    if (part.length === 3) {
      result += `${part},`
      part = ''
    }
    part += string[i]
  }
  result += part

  result = result.split('').reverse().join('')

  return result
}



class App extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  addDie = (event) => {
    this.setState(({ value }) => ({ value: event.target.value }))

    let arrInputValue = []
    let parrentElem = document.querySelector('.wrapper')
    let dives = parrentElem.children

    for (const child of dives) {
      if (child.nodeName === 'DIV') {
        child.remove()
      }
    }


    for (const info of cities) {
      if (info.city.startsWith(event.target.value)) {
        arrInputValue.push(info)
      }
    }

    for (const info of arrInputValue) {
      let sumPeople = addThousandSeparator(info.population)

      parrentElem.append(addContentDie(info.city + ',', info.state + ',', sumPeople))
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <input className='input' placeholder='City or State' type="text" onChange={this.addDie} value={this.state.value} />
      </div>
    )
  }
}

export default App;
