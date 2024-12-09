## Rotación desde un punto de origen

Para rotar un objeto alrededor de un punto arbitrario (x₀,y₀), necesitamos realizar una secuencia de transformaciones:

1. Trasladar el punto de origen al punto (x₀,y₀)
2. Realizar la rotación deseada
3. Trasladar de vuelta a la posición original

Matemáticamente, esto se expresa como:

$$
T_{-p} \cdot R_{\theta} \cdot T_p
$$

Donde:

- T_p es la traslación al punto (x₀,y₀)
- R_θ es la matriz de rotación por el ángulo θ
- T_{-p} es la traslación inversa

En forma matricial (usando coordenadas homogéneas):

$$
\begin{bmatrix} 1 & 0 & -x_0 \\ 0 & 1 & -y_0 \\ 0 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} \cos(\theta) & -\sin(\theta) & 0 \\ \sin(\theta) & \cos(\theta) & 0 \\ 0 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} 1 & 0 & x_0 \\ 0 & 1 & y_0 \\ 0 & 0 & 1 \end{bmatrix}
$$

Esta composición de matrices nos da la transformación completa para rotar alrededor de cualquier punto en el espacio.