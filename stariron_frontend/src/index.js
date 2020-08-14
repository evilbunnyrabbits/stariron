const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = "https://zodiacal.herokuapp.com/" 
const sunUrl = proxyurl + url + "api"
const moonUrl = proxyurl + url + "moon"
const risingUrl = proxyurl + url + "rising"
const elementsUrl = proxyurl + url + "elements"
const cardinalityUrl = proxyurl + url + "cardinalities"


document.addEventListener("DOMContentLoaded", evt => {
    const menuStars = document.getElementById("menu-stars")

    const getMainStars = () => {
      for(let i=1; i < 4; i++) {
        const x10star = document.createElement('div')
        x10star.classList.add("star10px")
        x10star.setAttribute('id', `${i}`)
        const randomLength = Math.floor(Math.random() * 150)
        const randomHeight = Math.floor(Math.random() * 150)
        x10star.setAttribute("style", `margin-left:${randomLength}px; margin-top: ${randomHeight}px`)
        menuStars.append(x10star)
    }
    }
    //getSun()
    let w = window.innerWidth - 20;
    let h = window.innerHeight - 20;

    const generateStars = () => {
        const starContainer = document.getElementById("star-cluster")

        //Menu Stars
        getMainStars()

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

    const clickHandler = () => {
      document.addEventListener("click", e => {
          if (e.target.id === "1"){
            let starForm = e.target
            menuStars.innerHTML = ""
            menuStars.append(formCard)
            console.log("I am div 1")
          } else if(e.target.id === "2"){
            console.log("I am div 2")
          } else if(e.target.id === "3"){
            console.log("I am div 3")
          } else if(e.target.id === "form-back-btn"){
            menuStars.innerHTML = ""
            getMainStars()
          }
      })
    }

    const form = document.createElement('form')
    const formCard = document.createElement('div')
    formCard.setAttribute('class', 'card')
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
    let backBtn = document.createElement('button')
    backBtn.setAttribute('id', 'form-back-btn')
    backBtn.innerText = "back"
    
    formCard.append(form, backBtn)

    
    const submitHandler = () => {
        form.addEventListener('submit', e => {
            e.preventDefault()
            // getSunSignInfo()
            const birthDate = document.querySelector("#birth-date").value
            let date = birthDate.split('-')
            let month = date[1]
            let day = date[2]
            menuStars.innerHTML = ""
            getSunSign(month, day)
            

            // form.reset()
        })
    }

    const signCard = document.createElement('div')
    signCard.setAttribute('class', 'card')
    signCard.setAttribute('id', 'sign-card')
    //vv this is aspirational code vv
    const getSunSign = (month, day) => {
        let sign 

        if((month == 01 && day <= 20) || (month == 12 && day >=22)) {
            sign = "capricorn";
          } else if ((month == 01 && day >= 21) || (month == 02 && day <= 18)) {
            sign = "aquarius";
          } else if((month == 02 && day >= 19) || (month == 03 && day <= 20)) {
            sign = "pisces";
          } else if((month == 03 && day >= 21) || (month == 04 && day <= 20)) {
            sign = "aries";
          } else if((month == 04 && day >= 21) || (month == 05 && day <= 20)) {
            sign = "taurus";
          } else if((month == 05 && day >= 21) || (month == 06 && day <= 20)) {
            sign = "gemini";
          } else if((month == 06 && day >= 22) || (month == 07 && day <= 22)) {
            sign = "cancer";
          } else if((month == 07 && day >= 23) || (month == 08 && day <= 23)) {
            sign = "leo";
          } else if((month == 08 && day >= 24) || (month == 09 && day <= 23)) {
            sign = "virgo";
          } else if((month == 09 && day >= 24) || (month == 10 && day <= 23)) {
            sign = "libra";
          } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            sign = "scorpio";
          } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            sign = "sagittarius";
          }
          let signTitle = document.createElement('h2')
          signTitle.innerText = `${sign}`
          signCard.append(signTitle, backBtn)
          menuStars.append(signCard)
          
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
    generateStars()
})

/* 

Create a form that loads upon open 
    takes a name 
    takes birthday 
    on submit (prevDef + render showPage with sun sign connected to Birthday)

*/