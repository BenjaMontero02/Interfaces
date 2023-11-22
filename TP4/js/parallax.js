let duendeVerde = document.getElementById("duendeVerde");

document.addEventListener('scroll', () => {
    let value = window.scrollY;

    // Obtén el estilo computado del elemento
    let computedStyle = window.getComputedStyle(duendeVerde);

    // Accede al valor de la propiedad 'left'
    let right = computedStyle.getPropertyValue('right');

    console.log('Valor de left:', right);
    console.log('Valor de scrollPositionY: ', value)
    var numericValue = parseFloat(right);
    if(numericValue < 10 ){
        let position = numericValue + (value * 0.005);
        if(position < 10){
            duendeVerde.style.right = position + 'px';
        }else{
            duendeVerde.style.right = 10 + 'px';
        }
    }
});