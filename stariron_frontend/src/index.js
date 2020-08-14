const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = "https://zodiacal.herokuapp.com/" 
const sunUrl = proxyurl + url + "api"
const moonUrl = proxyurl + url + "moon"
const risingUrl = proxyurl + url + "rising"
const elementsUrl = proxyurl + url + "elements"
const cardinalityUrl = proxyurl + url + "cardinalities"




document.addEventListener("DOMContentLoaded", evt => {
    const base = document.querySelector('.base')
    // const getSun = () => {
    //     fetch(sunUrl)
    //     .then(resp => resp.json(resp))
    //     .then(data => renderSigns(data))
    // }
    
    // const renderSigns = (signs) => {
    //     signs.forEach(sign => console.log(sign))
    // }

    // getSun()

    let w = window.innerWidth - 50;
    let h = window.innerHeight


    const generateStars = () => {
        const starContainer = document.getElementById("star-cluster")

        for(let i=1; i < 4; i++) {
            const x10star = document.createElement('div')
            x10star.classList.add("star10px")
            const randomLength = Math.floor(Math.random() * w)
            const randomHeight = Math.floor(Math.random() * h)
            x10star.setAttribute("style", `margin-left:${randomLength - 50}px; margin-top: ${randomHeight - 50}px`)
            starContainer.append(x10star)
        }

        for(let i=1; i < h; i++) {
            const x2star = document.createElement('div')
            x2star.classList.add("star2px")
            const randomLength = Math.floor(Math.random() * w)
            const randomHeight = Math.floor(Math.random() * h)
            x2star.setAttribute("style", `margin-left: ${randomLength}px; margin-top: ${randomHeight}px`)
            starContainer.append(x2star)
        }
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

    const form = document.createElement('form')
    const formDiv = document.createElement('form')
    formDiv.setAttribute('id', 'form-div')
    form.innerHTML = `
    <h2 class="header-two">Welcome</h2>
    <label>What is your name?</label>
    <input type="text" name="name" placeholder="name">
    <br>
    <label>Date of Birth</label>
    <input type="date" id="birth-date" name="birth-date"
       value=""
       min="1900-01-01" max="2022-12-31">
    <input type="submit" name="submit"> 
    `
    formDiv.append(form)
    base.append(formDiv)

    
    
    
    const submitHandler = () => {
        form.addEventListener('submit', e => {
            e.preventDefault()
            // getSunSignInfo()
            const birthDate = document.querySelector("#birth-date").value
            let date = birthDate.split('-')
            let month = date[1]
            let day = date[2]
            getSunSign(month, day)
            // form.reset()
        })
    }

    const getSunSign = (month, day) => {
        const signCard = document.createElement('div')
        base.innerHTML = ""
        base.append(signCard)
        let sign 

        if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
        //     return sign = "capricorn";
        //   } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        //     return sign = "aquarius";
        //   } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        //     return sign = "pisces";
        //   } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        //     return sign = "aries";
        //   } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        //     return sign = "taurus";
        //   } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        //     return sign = "gemini";
        //   } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        //     return sign = "cancer";
        //   } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
        //     return sign = "leo";
        //   } else 
          if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return sign = "virgo";}
        //   } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
        //     return sign = "libra";
        //   } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
        //     return sign = "scorpio";
        //   } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        //     return sign = "sagittarius";
        //   }
          console.log(sign)}
        // fetch(sunUrl, {
        //     method: "POST", 
        //     headers: {
        //         'content-type': 'application/json', 
        //         accepts: 'application/json'
        //     },
        //     body: JSON.stringify()
        // })
    }

    submitHandler()
    getSunSign()
    
})

/* 

Create a form that loads upon open 
    takes a name 
    takes birthday 
    on submit (prevDef + render showPage with sun sign connected to Birthday)

*/