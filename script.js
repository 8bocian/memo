let isWaiting = true;

window.onload = function(){
    const sizeRange = document.getElementById("range");
    sizeRange.addEventListener("change", function(event){
            start(event.currentTarget.value*2);
            // console.log(event.currentTarget.value*2);
            // start(event.currentTarget.value*2);
    });
};
function start(size){
    let clicked = null;
    let moves = 0;
    let score = 0;
    let memos = [];
    for(let i=0; i<(size**2)/2; i++){
        memos.push(`<img src='pokemon_jpg/${i}.jpg' width='60px'>`);
        memos.push(`<img src='pokemon_jpg/${i}.jpg' width='60px'>`);
            }
    memos = shuffle(memos);
    console.log(memos);
    const memoField = document.getElementById("memo");
    memoField.innerHTML = "";
    for(let i=0; i<memos.length; i++){
        const element = document.createElement("div");
        element.className = "memo_element";
        element.innerHTML = memos[i];
        console.log(element.innerHTML);
        element.addEventListener("click", function(event){
            if(!isWaiting){
                if (event.currentTarget.innerHTML == ""){
                    moves += 1;
                    const idx = event.currentTarget.param;
                    const value = memos[idx];
                    if(clicked == null){
                        clicked = idx;
                        event.currentTarget.innerHTML = value;
                    } else {
                        if(memos[clicked] == memos[idx] && idx != clicked){
                            console.log("match");
                            const cell = document.querySelector(`#memo :nth-child(${clicked+1})`);
                            event.currentTarget.innerHTML = value;
                            cell.addEventListener("click", {});
                            event.currentTarget.addEventListener("click", {});
                            clicked = null;
                            score += 2;
                            if(score == memoField.children.length){
                                alert(`Winner! in ${moves/2}`);
                            }
                        } else {
                            isWaiting = true;
                            const cell2 = document.querySelector(`#memo :nth-child(${clicked+1})`);
                            
                            event.currentTarget.innerHTML = value;
                            
                            setTimeout(function(elem) {
                                elem.style.background="antiquewhite";
                                elem.innerHTML = "";
                                cell2.style.background = "antiquewhite";
                                cell2.innerHTML = "";
                                isWaiting = false;
                            }, 1000, event.currentTarget);
                            clicked = null;
                        }
                    }
                }
            }
        });
        element.param = i;
        memoField.appendChild(element);
    }

    memoField.style.display = "grid";
    memoField.style.gridTemplateColumns = `repeat(${size}, auto)`;
    memoField.style.width = "min-content";

    isWaiting = true;
    setTimeout(hideAll, 2000);
   
}

function hideAll(){
    const memoField = document.getElementById("memo");
    for(let i=0; i<memoField.children.length; i++){
        memoField.children[i].innerHTML = "";
    }
    isWaiting = false;
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  
    return array;
}