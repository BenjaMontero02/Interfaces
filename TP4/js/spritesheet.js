const sprite = document.getElementById('sprite');
  const totalFrames = 7; // Número total de frames en tu sprite sheet
  const spriteWidth = 100; // Ancho de un frame en tu sprite sheet
  const delay = 100; // Tiempo de espera entre frames en milisegundos
  let isHovered = false;

  sprite.addEventListener('mouseenter', () => {
    isHovered = true;
    animateSprite();
  });

  sprite.addEventListener('mouseleave', () => {
    isHovered = false;
    sprite.style.backgroundPositionX = '0px'; // Reiniciar la posición del sprite
  });

  function animateSprite(frame = 0) {
    // Verificar si está siendo hover
    if (!isHovered) {
      return;
    }

    // Calcular la posición del sprite en el sprite sheet
    const spritePosition = -frame * spriteWidth;

    // Aplicar la posición al sprite
    sprite.style.backgroundPositionX = spritePosition + 'px';

    // Esperar un tiempo antes de pasar al siguiente frame
    setTimeout(() => {
      if (frame < totalFrames - 1) {
        // Llamar a la función nuevamente para el siguiente frame
        animateSprite(frame + 1);
      } else {
        // Si es el último frame, reiniciar la animación después de un pequeño retraso
        setTimeout(() => {
          if (isHovered) {
            animateSprite();
          }
        }, delay);
      }
    }, delay);
}