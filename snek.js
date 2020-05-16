var elem = document.getElementsByClassName("snake");
var id = setInterval(frame, 10);

var posx = 0;
var posy = 0;

var left = false;
var right = false;
var up = false;
var down = false;
var add = false;

console.log(screen.availWidth);
console.log(screen.width - 10);

function updatePos() {
    for (var i=0; i<elem.length; i++){
            elem[i].style.transform = "translate(" + (posx) + "px," + " " + (posy) + "px)";
    }
}

function frame() {
    if(right){

        if (posx==screen.width - 20){
            clearInterval(id);
        }
        else{
            
            posx++;
            //elem.style.transform = "translate(" + posx + "px," + " " + posy + "px)";
            updatePos();
            console.log(elem.style.transform);
            console.log("translate(" + posx + "px" + " " + posy + "px)")
        }
    }
    else if(left){

        if (posx==0){
            clearInterval(id);
        }
        else{
            
            posx--;
            //elem.style.transform = "translate(" + posx + "px," + " " + posy + "px)";
            updatePos();
            console.log(elem.style.transform);
        }
    }
    else if(up){

        if (posy==0){
            clearInterval(id);
        }
        else{
            
            posy--;
            // elem.style.transform = "translate(" + posx + "px," + " " + posy + "px)";
            updatePos();
            console.log(elem.style.transform);
        }
    }
    else if(down){

        if (posy==screen.height-130){
            clearInterval(id);
        }
        else{
            
            posy++;
            // elem.style.transform = "translate(" + posx + "px," + " " + posy + "px)";
            updatePos();
            console.log(elem.style.transform);
        }
    }
    

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        switch (event.key){
            case "ArrowRight":
                console.log('Right');

                if(left==false && right == false){

                    right = true;
                    left = false;
                    up = false;
                    down = false;

                }
               
                break;
                

            case "ArrowLeft":
                console.log('Left');

                if(right==false && left == false){

                    right = false;
                    left = true;
                    up = false;
                    down = false;
                    
                }
                break;
            
            case "ArrowDown":
                console.log('Down');

                if(up==false && down == false){

                    right = false;
                    left = false;
                    up = false;
                    down = true;

                }
                break;

            case "ArrowUp":
                console.log('Up');

                if(down==false && up == false){

                    right = false;
                    left = false;
                    up = true;
                    down = false;
                }
                break;

            case "Enter":

                console.log("Enter");
                add = true;

        }

        event.preventDefault();
    }, true);
}

