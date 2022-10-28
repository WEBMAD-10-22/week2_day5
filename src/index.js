onload = () => {
    const canvas = document.querySelector('#canvas')
    const menu = document.querySelector('.difficulty')
    const extremeDifficulty = document.querySelector('.hard')
    const normalDifficulty = document.querySelector('.normal')

    extremeDifficulty.addEventListener('click', () => {
        Game.isDifficult = true
        menu.classList.toggle('non-display')
        canvas.classList.toggle('non-display')
        Game.init()
    })

    normalDifficulty.addEventListener('click', () => {
        menu.classList.toggle('non-display')
        canvas.classList.toggle('non-display')
        Game.init()
    })
}