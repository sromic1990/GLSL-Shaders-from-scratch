varying vec2 vUvs;

uniform sampler2D diffuse;

void main ()
{
    vec4 localPosition = vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}