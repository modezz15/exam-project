let myObject;
let beersServed = 0;
let lastIdCounted = 0;
document.addEventListener("DOMContentLoaded",getData);
setInterval(()=>{
    getData();
}, 3000);
async function getData() {
let data = FooBar.getData();
myObject= JSON.parse(data);
console.log(myObject);

myObject.serving.forEach(customer=>{
    if(customer.id >lastIdCounted){
        beersServed += customer.order.length;
        lastIdCounted = customer.id;
    }
})



 document.querySelector("#waiting").textContent= Numeber in line: ${myObject.queue.length};
 document.querySelector("#serving").textContent= Serving: ${myObject.serving.length};
 document.querySelector("#servedBeer").textContent = Served beers: ${beersServed};
 
 document.querySelector(".beer_taps").innerHTML="";
showTaps();

}
function showTaps(){
    console.log("taps",myObject.taps)

    let taps = myObject.taps;

    taps.forEach(tap =>{
        console.log("tap", tap.level)
    //here is the template
    let tapsTemplate = document.querySelector(".tapsTemplate").content;
  
    //here is the clone 
    let clone = tapsTemplate.cloneNode(true);
    
        //getting the value of level, which is equal to the height of the level
        clone.querySelector(".level").style.height = ${tap.level/10}px;
        //getting the name of the beer tap
        clone.querySelector(".beer_tap_name").textContent = tap.beer;
        
        if(tap.level < 2450){
            document.querySelector(".level").style.backgroundColor = red;
        }
        //append clone in the div
        document.querySelector(".beer_taps").appendChild(clone);
    } );
 };