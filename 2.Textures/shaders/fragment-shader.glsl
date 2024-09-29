varying vec2 vUvs;

uniform sampler2D diffuse;

void main()
{
    gl_FragColor = texture2D(diffuse, vUvs);
}