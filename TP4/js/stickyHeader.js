let logo = document.getElementById('logo');
let header = document.getElementById('header');
let valueScale = 1;
let logoHeader = document.querySelector(".logoHeader");
document.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    let computedStyle = window.getComputedStyle(logo);
    let top = computedStyle.getPropertyValue('top');
    let value = parseFloat(top);
    if(value > 50){
        logo.style.top = value - scrollPosition * 0.4 + 'px';
        let width = computedStyle.getPropertyValue('width');
        let height = computedStyle.getPropertyValue('height');
        let valueWidth = parseFloat(width);
        let valueHeight = parseFloat(height);
        logo.style.width = valueWidth - 8 + 'px';
        logo.style.height = valueHeight - 8 + 'px';
    }else{
        logo.style.display = 'none';
        header.classList.add('header');
        logoHeader.style.display = 'block';
    }

})