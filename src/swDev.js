export default function swDev(){
    // console.log(process.env.REACT_APP_BASE_URL,"baseurl")
    let swUrl = `http://localhost:3000/sw.js`;
    // let swUrl = process.env.REACT_APP_BASE_URL/sw.js

    //used to check whather the service worker is present in the browser or not becoz many old browser don't support it
    
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register(swUrl).then((response)=>{
            console.log(response,"response")
        }).catch(function(e){
            console.log(e,"error")
        }
        )
    }
    
}
