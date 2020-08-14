const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = "https://zodiacal.herokuapp.com/" 
const sunUrl = proxyurl + url + "api"
const moonUrl = proxyurl + url + "moon"
const risingUrl = proxyurl + url + "rising"
const elementsUrl = proxyurl + url + "elements"
const cardinalityUrl = proxyurl + url + "cardinalities"



document.addEventListener("DOMContentLoaded", evt => {

    const getSun = () => {
        fetch(sunUrl)
        .then(resp => resp.json(resp))
        .then(data => renderSigns(data))
    }
    
    const renderSigns = (signs) => {
        signs.forEach(sign => console.log(sign))
    }

    getSun()
    let w = window.innerWidth - 20;
    let h = window.innerHeight - 20;


    const generateStars = () => {
        const starContainer = document.getElementById("star-cluster")

        //Menu Stars
        for(let i=1; i < 4; i++) {
            const x10star = document.createElement('div')
            x10star.classList.add("star10px")
            const randomLength = Math.floor(Math.random() * w)
            const randomHeight = Math.floor(Math.random() * h)
            x10star.setAttribute("style", `margin-left:${randomLength - 100}px; margin-top: ${randomHeight}px`)
            starContainer.append(x10star)
        }

        //tiny stars
        for(let i=1; i < h; i++) {
            const x2star = document.createElement('div')
            x2star.classList.add("star2px")
            const randomLength = Math.floor(Math.random() * w)
            const randomHeight = Math.floor(Math.random() * h)
            x2star.setAttribute("style", `margin-left: ${randomLength}px; margin-top: ${randomHeight}px`)
            starContainer.append(x2star)
        }

        //slightly larger stars
        for(let i=1; i < h; i++) {
            const x5star = document.createElement('div')
            x5star.classList.add("star5px")
            const randomLength = Math.floor(Math.random() * w)
            const randomHeight = Math.floor(Math.random() * h)
            x5star.setAttribute("style", `margin-left:${randomLength}px; margin-top: ${randomHeight}px`)
            starContainer.append(x5star)
        }

    }
    generateStars()
})