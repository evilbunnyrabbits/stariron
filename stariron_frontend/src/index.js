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
            menuStars.innerHTML = ""
            formCard.append(backBtn)
            menuStars.append(formCard)
            form.reset()
          } else if(e.target.id === "form-back-btn"){
            menuStars.innerHTML = ""
            getMainStars()
          } else if(e.target.id === "sign-back-btn"){
            menuStars.innerHTML = ""
            formCard.append(backBtn)
            menuStars.append(formCard)
          } else if(e.target.id === "2"){
            menuStars.innerHTML = ""
            signCard.append(backBtn)
            menuStars.append(signCard)
          } else if(e.target.id === "3"){
            console.log("I am div 3")
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
    backBtn.innerText = "main"
    let backToForm = document.createElement('button')
    backToForm.setAttribute('id', 'sign-back-btn')
    backToForm.innerText = "back to form"
    
    formCard.append(form, backBtn)

    
    const submitHandler = () => {
        form.addEventListener('submit', e => {
            e.preventDefault()
            // get sun sign info()
            const birthDate = document.querySelector("#birth-date").value
            let date = birthDate.split('-')
            let month = date[1]
            let day = date[2]
            menuStars.innerHTML = ""
            let sign = calculateSun(month, day)
            console.log(sign)
            signCard.innerHTML = ""
            signCard.innerHTML = `
            <h2 id="sign-name">${sign}</h2>
            `
            getSunSign()

            

            // form.reset()
        })
    }

    const signCard = document.createElement('div')
    signCard.setAttribute('class', 'card')
    signCard.setAttribute('id', 'sign-card')
    
    const calculateSun = (month, day) => {
        let sign 

        if((month == 01 && day <= 20) || (month == 12 && day >=22)) {
            sign = "Capricorn";
            return sign
          } else if ((month == 01 && day >= 21) || (month == 02 && day <= 18)) {
            sign = "Aquarius";
            return sign
          } else if((month == 02 && day >= 19) || (month == 03 && day <= 20)) {
            sign = "Pisces";
            return sign
          } else if((month == 03 && day >= 21) || (month == 04 && day <= 20)) {
            sign = "Aries";
            return sign
          } else if((month == 04 && day >= 21) || (month == 05 && day <= 20)) {
            sign = "Taurus";
            return sign
          } else if((month == 05 && day >= 21) || (month == 06 && day <= 20)) {
            sign = "Gemini";
            return sign
          } else if((month == 06 && day >= 22) || (month == 07 && day <= 22)) {
            sign = "Cancer";
            return sign
          } else if((month == 07 && day >= 23) || (month == 08 && day <= 23)) {
            sign = "Leo";
            return sign
          } else if((month == 08 && day >= 24) || (month == 09 && day <= 23)) {
            sign = "Virgo";
            return sign
          } else if((month == 09 && day >= 24) || (month == 10 && day <= 23)) {
            sign = "Libra";
            return sign
          } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            sign = "Scorpio";
            return sign
          } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            sign = "Sagittarius";
            return sign
          }
    }
    const getSunSign = () => {
      fetch(sunUrl)
      .then(resp => resp.json())
      .then(signs => renderSigns(signs))
    }

    function renderSigns(signs){
      let sign = signCard.querySelector('#sign-name').innerText
      if (sign != null || undefined) {
       let p = document.createElement('p')
       signObj = signs.filter(name => name.name === sign)
       p.innerText = `${signObj[0].mental_traits}`

       signCard.append(p, backBtn, backToForm)
       menuStars.append(signCard)
      // signs.forEach(signObj => renderSign(signObj))

    }}
    
    // function renderSign(signObj) {
    //   
    // }

    submitHandler()
    generateStars()
})

/* 

Create a form that loads upon open 
    takes a name 
    takes birthday 
    on submit (prevDef + render showPage with sun sign connected to Birthday)

*/