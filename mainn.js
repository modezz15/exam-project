
let myObject;
let beersServed = 0;
let lastIdCounted = 0;
// run the function "getData" once the DOM content is loaded
document.addEventListener("DOMContentLoaded",getData);
// rerun the function "getData" every 3 seconds so the data could be updated frequently
setInterval(()=>{
    getData();  
}, 3000);
// fetching data from the database
async function getData() {
let data = FooBar.getData();
myObject= JSON.parse(data);
console.log(myObject);

// getting the number for the total amount of beers served

myObject.serving.forEach(customer=>{
    if(customer.id >lastIdCounted){
        beersServed += customer.order.length;
        lastIdCounted = customer.id;
    }
})
// clearing the data by inserting an empty string
document.querySelector("#divsWaiting").innerHTML = "";
let waiting = document.querySelector("#divsWaiting");
// setting the variable called n to match queue.lenght
let n = myObject.queue.length;
// using for loop to create a div element n times. We also set the location where should the element be created using appendChild
for(let i=0; i<n; i++){
    let div = document.createElement("div");
    waiting.appendChild(div);
 }
 document.querySelector("#divsServing").innerHTML = "";
let serving = document.querySelector("#divsServing");
let k = myObject.serving.length;
for(let i=0; i<k; i++){
    let div = document.createElement("div");
    serving.appendChild(div);
 }
 // getting values from the database as a text content
 document.querySelector("#waiting").textContent= `${myObject.queue.length}`;
 document.querySelector("#serving").textContent= `${myObject.serving.length}`;
 document.querySelector("#servedBeer").textContent = `${beersServed}`;
 document.querySelector("#barName").textContent = `Name: ${myObject.bar.name}`;
 document.querySelector("#closingTime").textContent = `Closing time: ${myObject.bar.closingTime}`;
 
 // clearing the data of the lists by adding more empty sritngs 
 document.querySelector(".beer_taps").innerHTML="";
 document.querySelector(".beer_info").innerHTML="";
 document.querySelector(".bartenders").innerHTML="";
 document.querySelector(".storage").innerHTML = "";
// calling the functions
showTaps();
showBeerInfo();
showBartenders();
showStorage();
}

function showTaps(){
    console.log("taps",myObject.taps)

    let taps = myObject.taps;
    // asinging a function for every object
    taps.forEach(tap =>{
        console.log("tap", tap.level)
    //here is the template
    let tapsTemplate = document.querySelector(".tapsTemplate").content;
  
    //here is the clone 
    let clone = tapsTemplate.cloneNode(true);
    
        //getting the value of level, which is equal to the height of the level
        clone.querySelector(".level").style.height = `${tap.level/10}px`;
        //getting the name of the beer tap
        clone.querySelector(".beer_tap_name").textContent = tap.beer;
        // if the capacity of the beer in keg is less then 12.5 liters the color changes to yellow
        if(tap.level < 1250){
            clone.querySelector(".level").style.background = '#f1b65c';
        // if the capacity of the beer in keg is less then 5 liters the color changes to red
        } if(tap.level < 500){
            clone.querySelector(".level").style.background = '#b73d52';
        }
        //append clone in the div
        document.querySelector(".beer_taps").appendChild(clone);
    } );

 };
 function showBeerInfo(){
    console.log("beerInfo", myObject.beertypes);
    let beerInfo = myObject.beertypes;
    beerInfo.forEach(infoBeer =>{
    let beerInfoTemplate = document.querySelector(".beerInfo").content;
    
    let clone = beerInfoTemplate.cloneNode(true);
    clone.querySelector("#beerName").textContent = infoBeer.name;
    clone.querySelector("#aroma").textContent = `Aroma: ` + infoBeer.description.aroma;
    clone.querySelector("#appearance").textContent = `Appearance: ` + infoBeer.description.appearance;
    clone.querySelector("#flavor").textContent = `Flavor: ` + infoBeer.description.flavor;
    clone.querySelector("#mouthFeel").textContent = `Mouthfeel: ` + infoBeer.description.mouthfeel;
    clone.querySelector("#overallImpression").textContent = `Overall impression` + infoBeer.description.overallImpression;
    clone.querySelector("#category").textContent = `Type: ` + infoBeer.category;
    clone.querySelector("#label").innerHTML = infoBeer.label;
    clone.querySelector("#alc").textContent = `alc: ` + infoBeer.alc + ` %`;
    clone.querySelector("#label").src = infoBeer.label;
   // clone.querySelector("#modalButton").addEventListener("click", ()=>{
   // document.querySelector("#description").style.height = "30vh";  
  //  });


    document.querySelector(".beer_info").appendChild(clone);
    });
}
function showBartenders(){
    console.log("bartenderInfo", myObject.bartenders);
    let bartenderInfo = myObject.bartenders;
    bartenderInfo.forEach(infoBartender =>{
        let bartendersTemplate = document.querySelector(".bartendersTemplate").content;
        let clone = bartendersTemplate.cloneNode(true);
        clone.querySelector("#name").textContent = infoBartender.name;
        clone.querySelector("#status").textContent = `Status` + `: ` + infoBartender.status;
        clone.querySelector("#statusDetail").textContent = `Work status` + `: ` + infoBartender.statusDetail;
        clone.querySelector("#usingTap").textContent = `Tap being used` + `: ` + infoBartender.usingTap;
        clone.querySelector("#servingCustomer").textContent = infoBartender.servingCustomer;
        if(infoBartender.status == "READY"){
            clone.querySelector("#nameContainer").style.background = '#f1b65c';
        } if(infoBartender.status == "WORKING"){
            clone.querySelector("#nameContainer").style.background = '#13937f';
        }

        document.querySelector(".bartenders").appendChild(clone);
    })

}
function showStorage(){
    console.log("storageInfo", myObject.storage);
    let storageInfo = myObject.storage;
    document.querySelector("#storageContainer").innerHTML = "";
    storageInfo.forEach(infoStorage =>{
        let storageTemplate = document.querySelector(".storageTemplate").content;
        let clone = storageTemplate.cloneNode(true);
        clone.querySelector("#storageName").textContent = infoStorage.name;
        clone.querySelector("#storageAmount").textContent = infoStorage.amount;
        let storage = clone.querySelector("#storageAmount");

        let n = infoStorage.amount;

       for(let i=0; i<n; i++){
          let div = document.createElement("div");
          storage.appendChild(div);
       }
     //    document.body.appendChild(storage);
        document.querySelector("#storageContainer").appendChild(clone);
        
    })
    
}
   

    