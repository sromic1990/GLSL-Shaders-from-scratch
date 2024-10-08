import * as THREE from 'https://cdn.skypack.dev/three@0.136'

class SimpleGLSL
{
    constructor()
    {}

    async initialize()
    {
        this.threejs_ = new THREE.WebGLRenderer();
        document.body.appendChild(this.threejs_.domElement);

        window.addEventListener('resize', () =>
        {
            this.onWindowResize_();
        }, false);

        this.scene_ = new THREE.Scene();

        this.camera_ = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
        this.camera_.position.set(0, 0, 1);

        await this.setupProject_();

        this.onWindowResize_();
        this.raf_();
    }

    async setupProject_()
    {
        const vsh = await fetch('./shaders/vertex-shader.glsl');
        const fsh = await fetch('./shaders/fragment-shader.glsl');

        const material = new THREE.ShaderMaterial(
            {
                uniforms:{
                    color1: {value: new THREE.Vector4(1, 1, 0, 1)},
                    color2: {value: new THREE.Vector4(0, 1, 1, 1)},
                },
                vertexShader: await vsh.text(),
                fragmentShader: await fsh.text()
            }
        );

        const colors = [
            new THREE.Color(0xFF0000),
            new THREE.Color(0x00FF00),
            new THREE.Color(0x0000FF),
            new THREE.Color(0x00FFFF),
        ];
        const colorFloats = colors.map(c => c.toArray()).flat();

        const geometry = new THREE.PlaneGeometry(1,1);
        geometry.setAttribute(
            'devColors',
            new THREE.Float32BufferAttribute(colorFloats, 3)
        );

        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0.5, 0.5, 0);
        this.scene_.add(plane);

        this.onWindowResize_();
    }

    onWindowResize_()
    {
        this.threejs_.setSize(window.innerWidth, window.innerHeight);
    }

    raf_()
    {
        requestAnimationFrame((t) => {
            this.threejs_.render(this.scene_, this.camera_);
            this.raf_();
        });
    }
}

let APP_ = null;

window.addEventListener('DOMContentLoaded', async () => {
    APP_ = new SimpleGLSL();
    await APP_.initialize();
});