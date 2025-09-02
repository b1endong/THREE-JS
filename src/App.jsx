import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {useEffect, useRef} from "react";

export default function App() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const axisHelper = new THREE.AxesHelper(100);

        const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const earthMaterial = new THREE.MeshBasicMaterial({color: "blue"});
        const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthMesh.position.x = 10;

        //Sun
        const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({color: "yellow"});
        const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        sunMesh.scale.setScalar(5);

        sunMesh.add(earthMesh);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.z = 50;

        scene.add(sunMesh);
        scene.add(camera);
        scene.add(axisHelper);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener("resize", () => {
            const aspect = window.innerWidth / window.innerHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        const renderLoop = () => {
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(renderLoop);
        };
        renderLoop();
    }, []);

    return <canvas ref={canvasRef}></canvas>;
}
