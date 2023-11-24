let duende = document.getElementById("duende");

document.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;

    let computedStyle = window.getComputedStyle(duende);

    let top = computedStyle.getPropertyValue('top');
    
    let value = parseFloat(top);
    console.log(value);
    if(value > -95){
        let status = value - scrollPosition * 0.0099;

        if(status > -95){
            console.log(status);
            duende.style.top = status + "px";
        }else{
            duende.style.top = -95 + "px";
        }
    }
})