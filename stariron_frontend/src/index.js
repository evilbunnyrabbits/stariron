const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = "https://zodiacal.herokuapp.com/" 
const sunUrl = proxyurl + url + "api"
const moonUrl = proxyurl + url + "moon"
const risingUrl = proxyurl + url + "rising"
const elementsUrl = proxyurl + url + "elements"
const cardinalityUrl = proxyurl + url + "cardinalities"
const signObjectUrl = "http://127.0.0.1:3000/sign_object/"
const favoritesUrl = "http://127.0.0.1:3000/favorites/"
const usersUrl = "http://127.0.0.1:3000/users/1"

let w = window.innerWidth - 20;
let h = window.innerHeight - 20;

const menuStars = document.getElementById("menu-stars")
const formCard = document.createElement('div')
    formCard.setAttribute('class', 'card')
const form = document.createElement('form')
    form.classList = "form"

document.addEventListener("DOMContentLoaded", evt => {

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
              getUser()
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
              menuStars.innerHTML = ""
              renderFavCard(menuStars)
          } else if(e.target.matches("button.delete-fav-button")) {
              const button = e.target
              deleteFav(button)
          }
      })
    }


    const renderFavCard = (menuStars) => {
        const favCard = document.createElement('div')
        const favList = document.createElement("ul")
        favCard.setAttribute("class", "card")
        favCard.append(favList)

        fetch(favoritesUrl)
            .then(res => res.json())
            .then(favorites => favorites.forEach(fav => {
                const signId = fav.id

                fetch(signObjectUrl + signId)
                    .then(res => res.json())
                    .then(signObj => {

                        const signObjLi = document.createElement('li')

                        signObjLi.innerText = signObj.description
                        signObjLi.dataset.id = signObj.id
                        const deleteButton = document.createElement("button")
                        deleteButton.textContent = "Delete"
                        deleteButton.classList.add("delete-fav-button")
                        signObjLi.append(deleteButton)
                        favList.append(signObjLi)
                    })
            }))

        menuStars.append(favCard)
    }


    const getUser = () => {
      fetch(usersUrl)
        .then(resp => resp.json())
        .then(data => renderUser(data))
    }


    function renderUser(user){
      form.innerHTML = ""
      form.innerHTML = `
    <h2 class="header-two">Welcome</h2>
    <label>What is your name?</label>
    <br>
    <input type="text" name="name" placeholder="name" value="${user.name}">
    </br>
    </br>
    <label>Date of Birth</label>
    <br>
    <input type="date" id="birth-date" name="birth-date"
       value="${user.birthday}"
       min="1900-01-01" max="2022-12-31">
       <br>
       </br>
    <input type="submit" name="submit"></br></br>
    `
    submitHandler(form, user)
    }

    let backBtn = document.createElement('button')
      backBtn.setAttribute('id', 'form-back-btn')
      backBtn.classList = "btn btn-white btn-animated"
      backBtn.innerText = "main"

    let backToForm = document.createElement('button')
      backToForm.setAttribute('id', 'sign-back-btn')
      backToForm.classList = "btn btn-white btn-animated"
      backToForm.innerText = "back to form"

    let favBtn = document.createElement('button')
      favBtn.setAttribute('id', 'fav-button')
      favBtn.classList = "btn btn-white btn-animated"
      favBtn.innerHTML = `&#x2665;`


    formCard.append(form, backBtn)

    const submitHandler = (info, user) => {
        form.addEventListener('submit', e => {
            e.preventDefault()

            const birthDate = info.querySelector("#birth-date").value 
            const name = info.name.value 


          fetch(usersUrl, {
            method: 'PATCH', 
            headers: {
              "content-type": "application/json", 
              "accepts": "application/json"
            }, 
            body:JSON.stringify({name: name, birthday: birthDate})
          }) 
          .then(resp => resp.json)
            
            // get sun sign info()
            
            let date = birthDate.split('-')
            let month = date[1]
            let day = date[2]
            menuStars.innerHTML = ""
            let sign = calculateSun(month, day)

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
    
    const deleteFav = (button) => {
        const favId = button.parentElement.dataset.id
        const favParentUl = button.parentElement.parentElement
        console.log(favParentUl)

        const packet = {
            method: "DELETE"
        }
        fetch(favoritesUrl + favId, packet)
            .then(res => res.json())
    }



    // function renderSign(signObj) {
    // }

    
    generateStars()
    clickHandler()
})

/* 
I moved the form sign down here 
*/
form.innerHTML = `
<h2 class="header-two">Welcome</h2>
<label>What is your name?</label>
<br>
<input type="text" name="name" placeholder="name" value="">
</br>
</br>
<label>Date of Birth</label>
<br>
<input type="date" id="birth-date" name="birth-date"
   value=""
   min="1900-01-01" max="2022-12-31">
   <br>
   </br>
<input type="submit" name="submit"></br></br>
`