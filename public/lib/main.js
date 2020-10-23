var searched = false

const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    const node = document.querySelector(element)
    node.classList.add(`${prefix}animated`, animationName)

    function handleAnimationEnd () {
      node.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true })
  })

const getMovie = async (tags) => {
  try {
    const response = await fetch(`http://localhost:8000/?search=${tags}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(`An error occured: ${error}`)
  }
}

const showMovies = (movie) => {
  console.log(movie)
  const num = movie.length / 3
  let index = 0
  let ancestor = null
  const lists = []
  for (let i = 0; i < num; i++) {
    let bool = false
    ancestor = document.createElement('div')
    ancestor.classList.add('column', 'is-one-third')
    for (let i = 0; i < 3; i++) {
      const parent = document.createElement('div')
      const child = document.createElement('div')
      parent.classList.add('box')
      child.classList.add('content')
      let p = document.createElement('p')
      let s = document.createElement('strong')
      s.innerText = 'Name: '
      p.appendChild(s)
      p.appendChild(document.createTextNode(movie[index].Name))
      child.append(p)
      p = document.createElement('p')
      s = document.createElement('strong')
      s.innerText = 'Date: '
      p.appendChild(s)
      p.appendChild(document.createTextNode(movie[index].Date))
      child.append(p)
      p = document.createElement('p')
      s = document.createElement('strong')
      s.innerText = 'Time: '
      p.appendChild(s)
      p.appendChild(document.createTextNode(movie[index].Time))
      child.append(p)
      p = document.createElement('p')
      s = document.createElement('strong')
      s.innerText = 'Available Seats: '
      p.appendChild(s)
      p.appendChild(document.createTextNode(movie[index].Seats))
      child.append(p)
      parent.append(child)
      index++
      ancestor.appendChild(parent)
      if (!movie[index]) {
        i = 4
        bool = true
      }
    }
    lists.push(ancestor)
    const temp1 = document.createElement('li')
    const temp2 = document.createElement('a')
    temp2.classList.add('pagination-link')
    temp2.innerText = i + 1
    temp1.appendChild(temp2)
    document.getElementById('pages').appendChild(temp1)
    if (bool) {
      break
    }
  }
  document.getElementById('list').appendChild(lists[0])
  const temp = document.getElementById('pages').children[0]
  temp.firstChild.classList.add('is-current')
  document.getElementById('paginator').classList.remove('is-invisible')
  return lists
}

const searcher = async (element, bool) => {
  if (element.value === '') {
    document.getElementById('movieError').classList.add('is-invisible')
    element.classList.remove('is-danger')
    element.classList.add('is-danger')
    element.classList.remove('is-warning')
    document.getElementById('searchBtn').classList.add('is-danger')
    const ele1 = document.getElementById('search')
    ele1.classList.add('shake-horizontal', 'shake-constant')
    setTimeout(() => ele1.classList.remove('shake-horizontal', 'shake-constant'), 250)
    document.getElementById('searchError').classList.remove('is-invisible')
  } else {
    searched = true
    document.getElementById('movieError').classList.add('is-invisible')
    element.classList.remove('is-danger')
    element.disabled = true
    const ele2 = document.getElementById('searchBtn')
    ele2.classList.remove('is-danger')
    ele2.classList.remove('is-warning')
    element.classList.remove('is-warning')
    ele2.classList.add('is-loading')
    ele2.disabled = true
    document.getElementById('searchError').classList.add('is-invisible')
    const temp = await getMovie(element.value)
    if (temp.length === 0) {
      searched = false
      element.disabled = false
      ele2.disabled = false
      ele2.classList.remove('is-loading')
      ele2.classList.add('is-warning')
      element.classList.add('is-warning')
      document.getElementById('movieError').classList.remove('is-invisible')
      const ele1 = document.getElementById('search')
      ele1.classList.add('shake-vertical', 'shake-constant')
      setTimeout(() => ele1.classList.remove('shake-vertical', 'shake-constant'), 250)
      return
    }
    document.getElementById('movieError').remove()
    const lists = showMovies(temp)
    await animateCSS('#list', 'fadeIn')
    element.classList.add('is-success')
    ele2.classList.remove('is-loading')
    ele2.classList.add('is-success')
    ele2.innerHTML = 'Search New...'
    ele2.disabled = false
    document.getElementById('pages').addEventListener('click', async (event) => {
      const target = event.target
      if (target.tagName === 'A' && !target.classList.contains('is-current')) {
        const pages = document.getElementById('list')
        document.querySelector('.is-current').classList.remove('is-current')
        target.classList.add('is-current')
        await animateCSS('#list', 'fadeOut')
        pages.children[0].remove()
        pages.appendChild(lists[target.innerText - 1])
        await animateCSS('#list', 'fadeIn')
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await animateCSS('#main', 'fadeIn')
  document.getElementById('search').classList.remove('is-invisible')
  // await animateCSS('#search', 'fadeIn')
  document.getElementById('searchBar').addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
      searcher(event.target)
    }
  })
  document.getElementById('searchBtn').addEventListener('click', (event) => {
    if (!searched) {
      searcher(document.getElementById('searchBar'))
    } else {
      window.location.reload()
    }
  })
}, false)
