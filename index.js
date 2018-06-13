fetch('http://localhost:3000/')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    createCups(myJson);
  });

  
  function createCups(myJson){
  myJson.forEach(function(cup) {
    const card = document.createElement("div")
    card.style.width = "350px"
    card.className = "card";
        const image = document.createElement("img")
        image.style.width = "200px"
        image.className = "card-img-top";
        image.src = cup.logo.url;
        
        card.appendChild(image)
        
        const cardBody = document.createElement("div")
        cardBody.className = "card-body"
        card.appendChild(cardBody);
          const title = document.createElement("h4")
          title.className = "card-title";
          title.textContent = `Model: ${cup.model}`
          cardBody.appendChild(title);

          const band = document.createElement("p")
          band.className = "card-text";
          band.textContent = `Band Material: ${cup.band.material}`
          cardBody.appendChild(band);
          const base = document.createElement("p")
          base.className = "card-text";
          base.textContent = `Base material: ${cup.base.material}`
          cardBody.appendChild(base);

          const price = document.createElement("p")
          price.className = "card-text";
          price.textContent = `Base Price: ${cup.price}`
          cardBody.appendChild(price);
          
          
          const container = document.querySelector(".container");
          container.appendChild(card)
        })
      }
      let form = document.getElementById("form1")
      console.log(form)
      
      // event listeners
      form.addEventListener('submit', submitACup)

      function submitACup(e) {

        e.preventDefault()
        const elements = e.target.elements 
        const band = elements.band.value 
        const model = elements.model.value
        const lid = elements.lid.value
        const price = elements.price.value
        const url = elements.url.value
    
        const cup = {
            base: {material: "rubber", color: "blue"},
            band: {material: band, color: "yellow"} ,
            model: model ,
            lid: {material: lid},
            price,
            logo: {url: url}
          
        }
        
        // post book
        postCup(cup)
            .then(cup => {
                e.target.reset()
                // return createBookItem(book)
            })
            // .then(el => addBookToList(el))
            // .catch(err => console.error(err))
    }
    
    async function postCup(cup) {
        const url = 'http://localhost:3000/'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cup)
        }
        const response = await fetch(url, options)
        const newCup = await response.json()
       console.log(newCup)
    }