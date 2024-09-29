varying vec2 vUvs;

void main()
{
    //gl_FragColor = vec4(vUvs, 0.0, 1.0);
    gl_FragColor = vec4(1.0 - vUvs.x, 0.0, 1.0 - vUvs.y, 1.0);
}