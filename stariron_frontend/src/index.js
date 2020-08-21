const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = "https://zodiacal.herokuapp.com/" 
const sunUrl = proxyurl + url + "api"
const signObjectUrl = "http://127.0.0.1:3000/sign_object/"
const favoritesUrl = "http://127.0.0.1:3000/favorites/"
const usersUrl = "http://127.0.0.1:3000/users/1"

let w = window.innerWidth - 20;
let h = window.innerHeight - 20;
const transDiv = document.querySelector('#trans-div')
const extraDiv = document.querySelector('#extra-div')
let br = document.createElement('br')


const menuStars = document.getElementById("menu-stars")
const formCard = document.createElement('div')
formCard.setAttribute('class', 'card')
const form = document.createElement('form')
form.classList = "form"

document.addEventListener("DOMContentLoaded", evt => {

    let mainButton = document.createElement('button')
    mainButton.classList = "form-back-btn", "btn btn-white btn-animated"
    mainButton.innerText = "X"

    let backToForm = document.createElement('button')
    backToForm.setAttribute('id', 'sign-back-btn')
    backToForm.classList = "btn btn-white btn-animated"
    backToForm.innerText = "back to form"

    const signCard = document.createElement('div')
    signCard.setAttribute('class', 'card')
    signCard.setAttribute('id', 'sign-card')

    let favBtn = document.createElement('button')
    favBtn.classList = "fav-btn", "btn btn-white btn-animated"
    favBtn.innerHTML = `&#x2665;`

    formCard.append(form)

    const submitHandler = (user) => {

        form.addEventListener('submit', e => {
            e.preventDefault()
            const form = e.target
            updateUser(form, user)
        })
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.id === "1"){
                menuStars.innerHTML = ""
                getUser()
                formCard.append(mainButton)
                menuStars.append(formCard)
                form.reset()
            } else if(e.target.matches(".form-back-btn")){
                menuStars.innerHTML = ""
                getMainStars()
                transDiv.innerHTML = ""
                extraDiv.innerHTML = ""
            } else if(e.target.id === "sign-back-btn"){
                menuStars.innerHTML = ""
                formCard.append(mainButton)
                menuStars.append(formCard)
                transDiv.innerHTML = ""
                extraDiv.innerHTML = ""
            } else if(e.target.id === "2"){
                menuStars.innerHTML = ""
                getSunDataAgain(menuStars)
            }  else if(e.target.matches(".fav-btn")){
                const button = e.target
                button.setAttribute("style", "color: red")
                addToFavorite(button)
            } else if(e.target.id === "3"){
                menuStars.innerHTML = ""
                renderFavCard(menuStars)
            } else if(e.target.matches("button.delete-fav-button")) {
                const button = e.target
                deleteFav(button)
            } else if(e.target.matches(".back-to-index")){
                menuStars.innerHTML = ""
                getSunDataAgain(menuStars)
                transDiv.innerHTML = ""
                extraDiv.innerHTML = ""
            }
        })
    }




    const updateUser = (form, user) => {
        const newUserName = form.name.value
        const newUserBirthday = form.birthday.value

        const data = {
            name: newUserName,
            birthday: newUserBirthday
        }
        const packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch(usersUrl, packet)
            .then(res => res.json())

        let date = newUserBirthday.split('-')
        let month = date[1]
        let day = date[2]
        menuStars.innerHTML = ""
        let sign = calculateSun(month, day)

        signCard.innerHTML = ""

        getSunSign(user, sign)
    }

    const getSunSign = (user, sign) => {

        fetch(sunUrl)
            .then(resp => resp.json())
            .then(signs => renderSigns(signs, user, sign))
    }

    function renderSigns(signs, user, signName){

        menuStars.innerHTML = ""

        let favBtn = document.createElement('button')
        favBtn.classList = "fav-btn", "btn btn-white btn-animated"
        favBtn.innerHTML = `&#x2665;`

        signCard.innerHTML = ''
        
        favBtn.dataset.id = user.id
        if (signName != null || undefined) {
            favBtn.dataset.id = user.id
            let signObj = signs.filter(name => name.name === signName)
            let zodiac = zodiacSignObj.filter(thing => thing.name === signName)
            console.log(zodiac[0].img)

            transDiv.innerHTML=`
            <h1 class="sign-name">${signName}</h2>
            <img src="${zodiac[0].img}" alt="${zodiac[0].name}" class="sign-main">
          `

            signCard.innerHTML = `
            <h2 id="sign-name">${signName}</h2>
            <p>${signObj[0].mental_traits}</p>            
            `
            signCard.append(br, favBtn)
            signCard.append(mainButton, backToForm)

            menuStars.append(signCard)

            renderCelebBox(signObj)
            renderExtraDiv(signObj)
        }}

    const renderExtraDiv = (signObj) => {
    
    const goodTraitsCard = document.createElement('div')
    goodTraitsCard.setAttribute('class', 'card')
    goodTraitsCard.setAttribute('id', 'good-traits-card')

    const badTraitsCard = document.createElement('div')
    badTraitsCard.setAttribute('class', 'card')
    badTraitsCard.setAttribute('id', 'bad-traits-card')

      const goodTraits = document.createElement("ul")
      signObj.forEach(item => {

          item.good_traits.forEach(trait => {
              const goodLi = document.createElement('li')
              goodLi.textContent = trait
              goodTraits.appendChild(goodLi)
          })
      })
      goodTraitsCard.innerHTML = `
          <h2>Good Traits</h2>
      `

      const badTraits = document.createElement("ul")
      signObj.forEach(item => {

          item.bad_traits.forEach(trait => {
              const badLi = document.createElement('li')
              badLi.textContent = trait
              badTraits.appendChild(badLi)
          })
      })
      badTraitsCard.innerHTML = `
          <h2>Bad Traits</h2>
      `

      goodTraitsCard.append(goodTraits)
      badTraitsCard.append(badTraits)
        extraDiv.innerHTML = ''
      extraDiv.append(goodTraitsCard, badTraitsCard)
    }

    const renderCelebBox = (signObj) => {

        const celebCard = document.createElement('div')
        celebCard.setAttribute('class', 'card')
        celebCard.setAttribute('id', 'celeb-card')
        let celebs = signObj[0].famous_people
        let crowd = celebs.length
        let celebrities = []
          for (var i = 0; i < 10; i++) {
            var rand = celebs[Math.floor(Math.random() * crowd)];
            celebrities.push(rand);
          }
          
    
        const celebContainerUl = document.createElement("ul")
        celebrities.forEach(celeb => {
                const celebLi = document.createElement('li')
                celebLi.textContent = celeb
                celebContainerUl.appendChild(celebLi)
            })
        celebCard.innerHTML = `
            <h2>Celebrities</h2>
        `
        celebCard.appendChild(celebContainerUl)

        menuStars.appendChild(celebCard)
    }

    const getMainStars = () => {
      for(let i=1; i < 4; i++) {
        const x10star = document.createElement('div')
        x10star.classList.add("star10px", "avatar")
        x10star.setAttribute('id', `${i}`)
        const randomLength = Math.floor(Math.random() * 150)
        const randomHeight = Math.floor(Math.random() * 150)
        x10star.setAttribute("style", `margin-left:${randomLength}px; margin-top: ${randomHeight}px`)
        menuStars.append(x10star)
    }
    const mainStar1 = document.getElementById('1')
    mainStar1.dataset.tooltip = "My Sign"
    const mainStar2 = document.getElementById('2')
    mainStar2.dataset.tooltip = "Sun Signs"
    const mainStar3 = document.getElementById('3')
    mainStar3.dataset.tooltip = "Favorite Collection"

    }

    const generateStars = () => {
        const starContainer = document.getElementById("star-cluster")

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

        //Menu Stars
        getMainStars()

    }

    const addToFavorite = (button) => {
        const content = button.parentElement.textContent
        const sign = document.getElementById("sign-name").textContent

        const data = {
            sign: sign,
            content: content
        }

        const packet = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch(signObjectUrl, packet)
            .then(res => res.json())
            .then(sign_object => {

                const data = {
                    user_id: 1,
                    sign_object_id: sign_object.id
                }

                const packet = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }

                fetch(favoritesUrl, packet)
                    .then(res => res.json())

            })
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
        <input type="date" id="birth-date" name="birthday"
           value="${user.birthday}"
           min="1900-01-01" max="2022-12-31">
           <br>
           </br>
        <input type="submit" name="submit"></br></br>
        `
        submitHandler(user)
    }
    
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

    const renderFavCard = (menuStars) => {
        const favCard = document.createElement('div')
        favCard.innerHTML = `
            <h3>My Favorite Signs</h3>
            <br />
            `
        const favList = document.createElement("div")
        favList.classList.add("fav-container")

        favCard.setAttribute("class", "card")
        favCard.append(favList)

        fetch(favoritesUrl)
            .then(res => res.json())
            .then(favorites => favorites.forEach(fav => {
                const signId = fav.sign_object_id

                fetch(signObjectUrl + signId)
                    .then(res => res.json())
                    .then(signObj => {

                        const signObjDiv = document.createElement('div')
                        signObjDiv.classList.add("fav-object-div")
                        signObjDiv.innerHTML = `<b>${signObj.sign}</b><br />${signObj.content}<br /><br />`
                        signObjDiv.dataset.id = fav.id
                        const deleteButton = document.createElement("button")
                        deleteButton.textContent = "Delete"
                        deleteButton.classList.add("delete-fav-button")
                        signObjDiv.append(deleteButton)
                        favList.append(signObjDiv)
                    })
            }))
        favCard.append(mainButton)

        menuStars.append(favCard)
    }
    
    const deleteFav = (button) => {
        const favId = button.parentElement.dataset.id
        const packet = {
            method: "DELETE"
        }
        fetch(favoritesUrl + favId, packet)
            .then(res => res.json())
            .then(item => button.parentElement.remove())
    }

    const getSunDataAgain = (menuStars) => {
        fetch(sunUrl)
            .then(res => res.json())
            .then(data => renderSignIndex(data))
    }

    const renderSignIndex = (data) => {

        let aries = data[0].symbol
        let taurus = data[1].symbol
        let gemini = data[2].symbol
        let cancer = data[3].symbol
        let leo = data[4].symbol
        let virgo = data[5].symbol
        let libra = data[6].symbol
        let scorpio = data[7].symbol
        let sagittarius = data[8].symbol
        let capricorn = data[9].symbol
        let aquarius = data[10].symbol
        let pisces = data[11].symbol

        const indexCard = document.createElement('div')
        indexCard.setAttribute('class', 'card')
        indexCard.setAttribute('id', 'index-card')

        indexCard.append(mainButton)
        menuStars.append(indexCard)

        const indexContainer = document.createElement("div")
        indexContainer.classList.add("sign-index-container")

        const indexTable = document.createElement('table')
        indexTable.classList.add("index-table")

        const tableRow1 = document.createElement('tr')
        const tableRow2 = document.createElement('tr')
        const tableRow3 = document.createElement('tr')

        tableRow1.innerHTML = `
                <td class="avatar" data-tooltip="Aries - ${aries}"><img src="https://www.horoscope.com/images-US/signs/profile-aries.png" alt="Aries" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Taurus - ${taurus}"><img src="https://cdn0.iconfinder.com/data/icons/astrology-numerology-and-horoscope/136/49-512.png" alt="Taurus" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Gemini - ${gemini}"><img src="https://www.pngarts.com/files/1/Gemini-PNG-Download-Image-1.png" alt="Gemini" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Cancer - ${cancer}"><img  src="https://daily.swarthmore.edu/wp-content/uploads/2017/09/profile-cancer.png" alt="Cancer" class="sign-index-image"/></td>
            `

        tableRow2.innerHTML = `
                <td class="avatar" data-tooltip="Leo - ${leo}"><img src="https://www.horoscope.com/images-US/signs/profile-leo.png" alt="leo" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Virgo - ${virgo}"><img src="https://images.ctfassets.net/nonm77rtn1g8/5H43vn3wbZkLyiGuvkOB4m/2713f4a19fd54e67f369b192b5ebf69a/Virgo_Sign.png" alt="Virgo" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Libra - ${libra}"><img src="https://pngriver.com/wp-content/uploads/2018/03/Download-Libra-PNG-Transparent-For-Designing-Projects.png" class="sign-index-image" alt="Libra"/></td>
                <td class="avatar" data-tooltip="Scorpio - ${scorpio}"><img src="https://daily.swarthmore.edu/wp-content/uploads/2017/09/profile-scorpio.png" alt="Scorpio" class="sign-index-image"/></td>
            `

        tableRow3.innerHTML = `
                <td class="avatar" data-tooltip="Sagittarius - ${sagittarius}"><img src="https://www.pngarts.com/files/2/Sagittarius-PNG-Transparent-Image.png" alt="Sagittarius" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Capricorn - ${capricorn}"><img src="https://i.dlpng.com/static/png/268300_preview.png" alt="Capricorn" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Aquarius - ${aquarius}"><img src="https://daily.swarthmore.edu/wp-content/uploads/2017/09/profile-aquarius.png" alt="Aquarius" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Pisces - ${pisces}"><img src="https://www.pngkey.com/png/full/82-826985_pisces-facts-pisces-zodiac-sign.png" alt="Pisces" class="sign-index-image"/></td>
            `

        indexTable.append(tableRow1)
        indexTable.append(tableRow2)
        indexTable.append(tableRow3)

        indexContainer.append(indexTable)

        indexCard.append(indexContainer)
        
        indexEventHandler(data)
    }

    const indexEventHandler = (data) => {
      
      document.addEventListener('click', e => {
        if(e.target.matches('.sign-index-image')){
          let sign = e.target.alt
          if(sign === sign){
            
            let newData = data.filter(name => name.name === sign)
            
            showThisSign(sign,newData)
            
          }
        }
      })
    }
    const showThisSign = (sign, newData) => {
      extraDiv.innerHTML = ""
      menuStars.innerHTML = ""
  
      signCard.innerHTML = ""
      favBtn.dataset.id = 1
  
      

      let zodiac = zodiacSignObj.filter(thing => thing.name === sign)
      transDiv.innerHTML=`
      <h1 class="sign-name">${sign}</h1>
      <img src="${zodiac[0].img}" alt="${zodiac[0].name}" class="sign-main">
      `
  
      signCard.innerHTML = `
      <button class="back-to-index" class="btn btn-white btn-animated">sun sign</button>
      <p>${newData[0].mental_traits}</p>            
      `
      signCard.append(br, favBtn)
      signCard.append(mainButton)
  
      menuStars.append(signCard)
  
      renderCelebBox(newData)
      renderExtraDiv(newData)
      
  }

    indexEventHandler()
    generateStars()
    clickHandler()

})

const zodiacSignObj = [
  {
      id: "1", 
      name: "Aries",
      img: "https://www.horoscope.com/images-US/signs/profile-aries.png",
  }, 
  {
      id: "2", 
      name: "Taurus",
      img: "https://cdn0.iconfinder.com/data/icons/astrology-numerology-and-horoscope/136/49-512.png",
  },  
  {
      id: "3", 
      name: "Gemini",
      img: "https://www.pngarts.com/files/1/Gemini-PNG-Download-Image-1.png",
  }, 
  {
      id: "4", 
      name: "Cancer",
      img: "https://daily.swarthmore.edu/wp-content/uploads/2017/09/profile-cancer.png",
  }, 
  {
      id: "5", 
      name: "Leo",
      img: "https://www.horoscope.com/images-US/signs/profile-leo.png",
  }, 
  {
      id: "6", 
      name: "Virgo",
      img: "https://images.ctfassets.net/nonm77rtn1g8/5H43vn3wbZkLyiGuvkOB4m/2713f4a19fd54e67f369b192b5ebf69a/Virgo_Sign.png",
  }, 
  {
      id: "7", 
      name: "Libra",
      img: "https://pngriver.com/wp-content/uploads/2018/03/Download-Libra-PNG-Transparent-For-Designing-Projects.png",
  }, 
  {
      id: "8", 
      name: "Scorpio",
      img: "https://daily.swarthmore.edu/wp-content/uploads/2017/09/profile-scorpio.png",
  }, 
  {
      id: "9", 
      name: "Sagittarius",
      img: "https://www.pngarts.com/files/2/Sagittarius-PNG-Transparent-Image.png",
  }, 
  {
      id: "10", 
      name: "Capricorn",
      img: "https://i.dlpng.com/static/png/268300_preview.png",
  }, 
  {
      id: "11", 
      name: "Aquarius",
      img: "https://daily.swarthmore.edu/wp-content/uploads/2017/09/profile-aquarius.png",
  }, 
  {
      id: "12", 
      name: "Pisces",
      img: "https://www.pngkey.com/png/full/82-826985_pisces-facts-pisces-zodiac-sign.png",
  }
]
