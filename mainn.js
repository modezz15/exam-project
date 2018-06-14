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



 document.querySelector("#waiting").textContent= `${myObject.queue.length}`;
 document.querySelector("#serving").textContent= `${myObject.serving.length}`;
 document.querySelector("#servedBeer").textContent = `${beersServed}`;
 document.querySelector("#barName").textContent = `${myObject.bar.name}`;
 document.querySelector("#closingTime").textContent = `${myObject.bar.closingTime}`;
 
 document.querySelector(".beer_taps").innerHTML="";
 document.querySelector(".beer_info").innerHTML="";
 document.querySelector(".bartenders").innerHTML="";
 document.querySelector(".storage").innerHTML = "";
showTaps();
showBeerInfo();
showBartenders();
showStorage();
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
        clone.querySelector(".level").style.height = `${tap.level/10}px`;
        //getting the name of the beer tap
        clone.querySelector(".beer_tap_name").textContent = tap.beer;
        
        if(tap.level < 1250){
            clone.querySelector(".level").style.background = 'yellow';
        } if(tap.level < 500){
            clone.querySelector(".level").style.background = 'red';
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
    clone.querySelector("#aroma").textContent = infoBeer.description.aroma;
    clone.querySelector("#appearance").textContent = infoBeer.description.appearance;
    clone.querySelector("#flavor").textContent = infoBeer.description.flavor;
    clone.querySelector("#mouthFeel").textContent = infoBeer.description.mouthfeel;
    clone.querySelector("#overallImpression").textContent = infoBeer.description.overallImpression;
    clone.querySelector("#category").textContent = `Type: ` + infoBeer.category;
    clone.querySelector("#label").innerHTML = infoBeer.label;
    clone.querySelector("#alc").textContent = `alc: ` + infoBeer.alc;
    clone.querySelector("#label").src = infoBeer.label;


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
        // clone.querySelector("#storageAmount").style.width = 10 * infoStorage.amount + "%";
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
   

    