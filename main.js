const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// creating an object which contains two properties.  They are opposites, so that
// when we submit the 1st properties key (empty heart) to the "server", the 
// variable heart.innerText below is set to the colored heart.  The next time we
// click on it, the colored heart is sent, it matches the 2nd key, so we receive 
// back the value of empty heart.  A clever way of alternating between states.
let glyphStates = {
  "♡": "♥",
  "♥": "♡"
};

let colorStates = {
  "red" : "",
  "": "red"
};

// Your JavaScript code goes here!
const modal = document.getElementById("modal")
modal.className = "hidden"

// pull a htmlCollection of the like-glyphs
const hearts = document.getElementsByClassName("like-glyph")

// convert it to array so we can ...
heartsArray = Array.from(hearts);
// console.log(heartsArray)

// run forEach on it and add event listeners to each.
heartsArray.forEach(function(heart) {
  heart.addEventListener("click", processClick)
})

// we pass processClick a single argument of the event object from
// the addEventListener and use its target to access the properties
// inside.
function processClick(heartClickEvent) {
  let heart = heartClickEvent.target;

  mimicServerCall("that_url")
  .then(function(serverMessage) {
    console.log(heart.innerText)
    heart.innerText = glyphStates[heart.innerText];
    console.log(heart.innerText)
    heart.style.color = colorStates[heart.style.color];
  })
  // in case we hit an error, we use .catch instead of
  // .then to remove the "hidden" attribute from the modal
  // and display an error message.  We could also grab the
  // error object and send that.
  .catch(function(error) {
   // Basic
   // alert("Something went wrong!");
   // or....
    document.getElementById("modal").className = "";
    console.log(error)
  });
}


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
