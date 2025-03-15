# Proyecto: Buscaminas

## Introducción
Este proyecto es una implementación del clásico juego Buscaminas desarrollado como práctica para demostrar habilidades de programación web. El objetivo fue crear una versión funcional y visualmente atractiva del juego que todos conocemos, añadiendo algunas características adicionales para mejorar la experiencia de usuario.

## Tecnologías Utilizadas

### HTML5
Se eligió HTML5 para estructurar el sitio web porque:
- Permite crear una estructura semántica clara con elementos como **div**, **section** y **button** que facilitan la organización del tablero de juego
- Los atributos **data-** personalizados posibilitan almacenar información relevante en cada celda (como coordenadas y estado)
- El uso de elementos interactivos como **buttons** mejoran la experiencia del usuario al proporcionar interacciones intuitivas
- Las etiquetas semánticas como **header** y **main** ayudan a organizar el contenido de manera accesible

La estructura HTML se organizó para separar claramente las diferentes áreas funcionales: panel de control (con selección de dificultad, contador de minas y temporizador), tablero de juego dinámico, y botones de acción como reiniciar o cambiar configuraciones.

### Test
Prueba el juego aca [Buscaminas](https://aviorkahalani.github.io/minesweeper/).

### CSS3
Se utilizó CSS3 para el diseño y estilo del sitio porque:
- Las **media queries** permitieron crear un diseño responsive que se adapta a diferentes tamaños de pantalla
- Los selectores avanzados como **:hover** y **:active** proporcionan retroalimentación visual cuando el usuario interactúa con las celdas
- El uso de **variables CSS** (como **--cell-size** y **--board-color**) facilita la personalización y mantenimiento consistente de los estilos
- Las transiciones y animaciones suaves mejoran la experiencia visual al revelar celdas o marcar minas
- El sistema de **grid** de CSS facilitó la creación de un tablero perfectamente alineado y adaptable

Para la paleta de colores, se eligió un esquema que recuerda a la versión clásica de Windows con toques modernos: el gris claro para el fondo, azules y rojos para los números, y contrastes adecuados para asegurar la legibilidad en todas las situaciones del juego.

### JavaScript
JavaScript fue la tecnología fundamental en este proyecto porque:
- Permitió implementar toda la lógica compleja del juego Buscaminas, desde la generación aleatoria de minas hasta la propagación en cascada al hacer clic en celdas vacías
- Los **event listeners** capturan los clics del usuario (tanto primario como secundario) para revelar celdas o colocar banderas
- El uso del **DOM manipulation** facilita la actualización dinámica del tablero sin recargar la página
- La implementación de **temporizadores** mediante **setInterval** proporciona feedback de tiempo real sobre la duración de la partida
- Los **algoritmos recursivos** permiten revelar automáticamente las celdas vacías adyacentes cuando el jugador selecciona una celda sin minas cercanas

Las funciones específicas que se desarrollaron incluyen:
- **generateBoard()** - Crea el tablero de juego dinámicamente basado en el nivel de dificultad seleccionado
- **plantMines()** - Distribuye aleatoriamente las minas por el tablero evitando la primera celda seleccionada
- **countAdjacentMines()** - Calcula cuántas minas hay alrededor de cada celda
- **revealCell()** - Muestra el contenido de una celda y maneja la revelación en cascada
- **checkWin()** - Verifica si el jugador ha completado correctamente el juego
- **handleRightClick()** - Gestiona la colocación de banderas cuando el jugador sospecha de una mina

## Características del Juego

### Generación Dinámica del Tablero
El tablero de juego se genera dinámicamente mediante JavaScript, permitiendo:
- Adaptarse a los diferentes niveles de dificultad (**fácil**: tablero **8x8** con **10 minas**, **medio**: tablero **16x16** con **40 minas**, **difícil**: tablero **16x30** con **99 minas**)
- Asegurar que la primera celda seleccionada nunca contenga una mina
- Recalcular el número de minas adyacentes para cada celda después de la distribución

### Sistema de Puntuación y Temporizador
El juego incluye:
- Un **contador de banderas** que se actualiza en tiempo real según el jugador marca o desmarca celdas
- Un **temporizador** que registra la duración de la partida desde el primer clic
- Retroalimentación visual inmediata sobre el estado del juego (en curso, victoria o derrota)

### Diseño Responsive
El juego está construido para funcionar en diferentes dispositivos:
- En pantallas grandes, el tablero se muestra completo con todas las opciones visibles
- En dispositivos móviles, los elementos se reorganizan para mantener la jugabilidad
- Los controles táctiles están optimizados para jugar en dispositivos sin ratón

### Modo Especial: 7 BOOM
Se implementó un modo especial llamado "7 BOOM" donde:
- Todas las celdas que contienen el número **7** en alguna coordenada o son múltiplos de **7** se convierten automáticamente en minas
- Este modo agrega un desafío adicional para jugadores experimentados
- Crea patrones predecibles pero difíciles que requieren estrategia y planificación

## Desafíos y Soluciones

### Algoritmo de Revelación en Cascada
Uno de los mayores desafíos fue implementar el algoritmo de propagación cuando el jugador hace clic en una celda vacía:
- Se utilizó una función **recursiva** que revela automáticamente todas las celdas vacías adyacentes
- Se implementaron verificaciones de límites para evitar desbordamientos en los bordes del tablero
- Se optimizó el rendimiento para evitar llamadas redundantes en tableros grandes

### Gestión de Estados del Juego
Otro desafío importante fue manejar correctamente los diferentes estados del juego:
- Se implementó un sistema de estados (**no iniciado**, **en curso**, **victoria**, **derrota**) para controlar el comportamiento del tablero
- Cada estado tiene comportamientos específicos para evitar interacciones no deseadas
- Se añadió un sistema de bloqueo para prevenir acciones cuando el juego ha terminado

### Compatibilidad con Dispositivos Móviles
Adaptar el juego para dispositivos móviles presentó varios retos:
- Se implementó un sistema de detección de pulsación larga para simular el clic derecho en dispositivos táctiles
- Los tamaños de celda se ajustan dinámicamente según el dispositivo utilizando unidades relativas
- Se añadieron controles específicos para mejorar la experiencia en pantallas táctiles

## Conclusión
Este proyecto de Buscaminas demuestra la aplicación práctica de HTML5, CSS3 y JavaScript para recrear un juego clásico con funcionalidades modernas. Las tecnologías web actuales permitieron desarrollar una versión intuitiva, visualmente atractiva y funcional que se adapta a diferentes dispositivos.

El desarrollo de este juego requirió implementar varios conceptos avanzados de programación:
- Algoritmos recursivos para la revelación en cascada
- Generación procedural para la distribución de minas
- Manejo de eventos para diferentes tipos de interacción
- Diseño responsive para adaptarse a múltiples dispositivos

El resultado final es un juego completamente funcional que mantiene la esencia del Buscaminas clásico mientras incorpora mejoras visuales y funcionales para el usuario moderno.

---

## Créditos
Este proyecto fue originalmente creado por **aviorkahalani**. Se ha tomado como referencia su trabajo publicado en el repositorio de GitHub: https://github.com/aviorkahalani/minesweeper
