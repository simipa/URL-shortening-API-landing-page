/* short link api*/
let myurl;
let shortURL;
function shorten() {
    myurl = document.getElementById("link").value;

    let request = new XMLHttpRequest();
    function success() {
        
        let data = JSON.parse(this.responseText);
        shortURL = data.result.short_link;
        console.log("done");
        switch (data.error_code) {
            case 1:
              error("Invalid URL submitted");
              document.getElementById("invalid").innerHTML="URL parameter is empty";
              break;
            case 3:
              error("Rate limit reached. Wait a second and try again");
              break;
            case 6:
              error("Unknown error");
              break;
            default:
                document.getElementById("api").innerHTML +=
            ` 
            <div class="row justify-content-center bg-white short-link" style=" padding: 1% 0 1% 0; "  >
            <div class="col-12 col-lg-6 text-dark" style=" padding: 1% 2% 1% 2%;  overflow-wrap: break-word;">
                    <div >${data.result.original_link}</div>
                </div>
                <div class="col-12 col-lg-4 text-lg-right text-primary" style=" padding: 1% 2% 1% 2%; ">
                    <div id="short-url" >${data.result.short_link}</div>
                </div>
                <div class="col-12 col-lg-2 text-center" style=" padding: 1% 2% 1% 2%; ">
                    <div><button class="btn copy" type="button"  onclick="copy()">Copy!</button>
                    </div>
                </div>
                `;
        ;
        }
        
    }

    function error(err) {
        console.log('Error Occurred :', err);
    }

    request.open('POST', `https://api.shrtco.de/v2/shorten?url=${myurl}`, true);
    request.onload = success;
    request.onerror = error;
    request.send();   
}
/*copy short link*/

function copy() {
      document.querySelector(".copy").innerHTML="Copied!";
        const el = document.createElement('textarea');
        el.value = shortURL;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
}




