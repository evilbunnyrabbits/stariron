

document.addEventListener("DOMContentLoaded", evt => {

    let w = window.innerWidth - 50;
    let h = window.innerHeight


    const generateStars = () => {
        const starContainer = document.getElementById("star-cluster")

        for(let i=1; i < h; i++) {
            const x2star = document.createElement('div')
            x2star.classList.add("star2px")
            const randomLength = Math.floor(Math.random() * w)
            x2star.setAttribute("style", `margin-left: ${randomLength}px`)
            starContainer.append(x2star)
        }
        for(let i=1; i < h; i++) {
            const x5star = document.createElement('div')
            x5star.classList.add("star5px")
            const randomLength = Math.floor(Math.random() * w)
            x5star.setAttribute("style", `margin-left: ${randomLength}px`)
            starContainer.append(x5star)
        }

    }
    generateStars()
})