// const url = "https://api.quotable.io/random";
const url = "https://free-quotes-api.herokuapp.com/";

generateQuote();

document.querySelector("button").addEventListener("click", generateQuote);


function generateQuote(){
   fetch(url)
   .then(function(data) {
      return data.json();
   })
   .then(function(data){    
      document.querySelector("blockquote p").innerHTML = data.quote;
      var author = data.author;
      if (author == ""){
         author = "Someone";
      }      
      document.querySelector("figcaption").innerHTML = author;
      slideQuoteIn();
   })
   .catch(function(err) {
      console.log(err); 
   });
}

let options = {
   root: document.querySelector('#scrollArea'),
   rootMargin: '0px',
   threshold: 0.005,
}
 
let observer = new IntersectionObserver((elements) => {
   elements.forEach((e) => {
      if (e.isIntersecting){
         e.target.classList.add("fade-in");
         setTimeout(() => {
            e.target.style.opacity = "0.9";
            e.target.classList.remove("fade-in");
         }, 1200);         

      }            
      if (e.intersectionRect.top == 0){         
         e.target.style.opacity = "0";
      }
   })
}, options);

const scrollElements = document.querySelectorAll(".js-scroll");

const handleScrollAnimation = () => {
   scrollElements.forEach((element) =>{
      observer.observe(element);
   })
}

window.addEventListener('scroll', () => {
   handleScrollAnimation();
})

function slideQuoteIn(){
   quote = document.querySelector("figure");   
   quote.classList.add("w3-animate-right");
   setTimeout(() => {
      quote.classList.remove("w3-animate-right")
   }, 1000);
}