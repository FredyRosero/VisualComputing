## Transformaciones lineales

Una transformación lineal es una función que preserva las operaciones vectoriales de suma y multiplicación por escalar. En términos matemáticos, una transformación T es lineal si cumple dos propiedades fundamentales: T(u + v) = T(u) + T(v) y T(cu) = cT(u), donde u y v son vectores y c es un escalar. Las transformaciones lineales son especialmente importantes en gráficos por computadora porque incluyen operaciones como rotación, escala y skew, aunque no incluyen traslaciones.

## Transformaciones afines

Affine map = lineal map + traslation

Una transformación afín es una transformación que preserva líneas rectas y el paralelismo. Matemáticamente, se puede expresar como la composición de una transformación lineal y una traslación:

$$
f(x) = Ax + b
$$

Donde:

- A es una matriz que representa la transformación lineal (rotación, escala, skew)
- b es un vector que representa la traslación

En coordenadas homogéneas, una transformación afín en 2D se puede representar como una única matriz 3x3:

$$
\begin{bmatrix} a_{11} & a_{12} & t_x \\ a_{21} & a_{22} & t_y \\ 0 & 0 & 1 \end{bmatrix}
$$

Donde la submatriz 2x2:

$$
\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}
$$

representa la transformación lineal, y el vector:

$$
\begin{bmatrix} t_x \\ t_y \end{bmatrix}
$$

representa la traslación.

Esta representación nos permite combinar múltiples transformaciones afines simplemente multiplicando sus matrices correspondientes, lo que es computacionalmente eficiente y matemáticamente elegante.

## El orden de las transformaciones

El orden en que se aplican las transformaciones es crucial porque la multiplicación de matrices no es conmutativa:

$$
AB \neq BA
$$

Por ejemplo, considere dos transformaciones:

- T: Traslación de (2,0)
- R: Rotación de 90° alrededor del origen

Si primero aplicamos la traslación y luego la rotación (R∘T), la matriz resultante sería:

$$
\begin{bmatrix} 0 & -1 & -2 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}
$$

Pero si primero aplicamos la rotación y luego la traslación (T∘R), obtenemos:

$$
\begin{bmatrix} 0 & -1 & 2 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}
$$

Esto produce resultados diferentes cuando se aplica a un punto P(1,0):

R∘T: P(1,0) → P(3,0) → P(0,3)

T∘R: P(1,0) → P(0,1) → P(2,1)

Por esta razón, en P5.js y otros motores gráficos, el orden de las transformaciones es fundamental para lograr el resultado deseado.

<aside>
💡

Las matrices se operan de derecha a izquierda

</aside>

## Composición de transformaciones

La composición de transformaciones se puede expresar matemáticamente como una secuencia de multiplicaciones de matrices. Cuando tenemos múltiples transformaciones T₁, T₂, ..., Tₙ, la transformación final se calcula como:

$$
T = T_n \cdot T_{n-1} \cdot ... \cdot T_2 \cdot T_1
$$

Por ejemplo, si queremos aplicar una rotación R seguida de una traslación T y luego una escala S, la matriz final sería:

$$
M = S \cdot T \cdot R
$$

Expandiendo esto en matrices 3x3 (usando coordenadas homogéneas):

$$
\begin{bmatrix} s_x & 0 & 0 \\ 0 & s_y & 0 \\ 0 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} \cos(\theta) & -\sin(\theta) & 0 \\ \sin(\theta) & \cos(\theta) & 0 \\ 0 & 0 & 1 \end{bmatrix}
$$

La matriz resultante aplicará primero la rotación, luego la traslación y finalmente la escala a cualquier punto que transformemos.

Es importante notar que al multiplicar estas matrices, el orden de las operaciones va de derecha a izquierda, lo que significa que la última matriz en la multiplicación (la de la derecha) es la primera transformación que se aplica.