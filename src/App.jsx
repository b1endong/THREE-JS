import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {TextureLoader, CubeTextureLoader} from "three";
import {FlyControls} from "three/addons/controls/FlyControls.js";
import {useEffect, useRef} from "react";
import {planets} from "./planets.js";

export default function App() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const axisHelper = new THREE.AxesHelper(100);
        const textureLoader = new TextureLoader();
        const backgroundTextureLoader = new CubeTextureLoader();

        backgroundTextureLoader.setPath("/THREE-JS/assets/");

        //Background
        const backgroundTexture = backgroundTextureLoader.load([
            "px.png",
            "nx.png",
            "py.png",
            "ny.png",
            "pz.png",
            "nz.png",
        ]);
        scene.background = backgroundTexture;

        //Saturn Ring with repeating texture
        const ringGeometry = new THREE.RingGeometry(8, 10, 64); // Tăng segments để smooth hơn
        const ringTexture = textureLoader.load(
            `/THREE-JS/assets/2k_saturn_ring_alpha.png`
        );

        // Thiết lập lặp lại texture theo chiều ngang của vòng
        ringTexture.repeat.set(16, 3); // Lặp lại 16 lần theo chiều ngang, 3 lần theo bán kính
        ringTexture.wrapS = THREE.RepeatWrapping;
        ringTexture.wrapT = THREE.RepeatWrapping;

        const ringMaterial = new THREE.MeshStandardMaterial({
            map: ringTexture,
            side: THREE.DoubleSide,
        });

        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = -Math.PI / 2.5;

        //Sun
        const sunTexture = textureLoader.load(`/THREE-JS/assets/2k_sun.jpg`);
        const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
        const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
        const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.z = 50;

        scene.add(sunMesh);
        scene.add(camera);

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

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.002);
        scene.add(ambientLight);
        const sunLight = new THREE.PointLight(0xffffff, 1000); // 5 là độ mạnh
        sunLight.position.set(0, 0, 0);
        scene.add(sunLight);

        const planetsMeshes = planets.map((planet) => {
            const planetGeometry = new THREE.SphereGeometry(
                planet.size * 10,
                32,
                32
            );
            const planetMesh = new THREE.Mesh(planetGeometry, planet.material);
            if (planet.name === "saturn") {
                planetMesh.add(ringMesh);
            }

            scene.add(planetMesh);
            planetMesh.position.x = planet.distance;
            planet.moons.forEach((moon) => {
                const moonGeometry = new THREE.SphereGeometry(
                    moon.size * 3,
                    32,
                    32
                );
                const moonMesh = new THREE.Mesh(moonGeometry, moon.material);
                planetMesh.add(moonMesh);
            });

            return planetMesh;
        });

        console.log(planetsMeshes);

        const renderLoop = () => {
            planetsMeshes.forEach((planet, index) => {
                planet.rotation.y += planets[index].speed * 0.02 * 2;
                planet.position.x =
                    planets[index].distance * Math.sin(planet.rotation.y);
                planet.position.z =
                    planets[index].distance * Math.cos(planet.rotation.y);
                planet.children.forEach((moon, moonIndex) => {
                    if (
                        planets[index].moons[moonIndex] &&
                        planets[index].moons &&
                        moon.geometry.type != "RingGeometry"
                    ) {
                        moon.rotation.y +=
                            planets[index].moons[moonIndex].speed * 0.01 * 2;
                        moon.position.x =
                            planets[index].moons[moonIndex].distance *
                            Math.sin(moon.rotation.y) *
                            2;
                        moon.position.z =
                            planets[index].moons[moonIndex].distance *
                            Math.cos(moon.rotation.y) *
                            2;
                    }
                });
            });

            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(renderLoop);
        };
        renderLoop();
    }, []);

    return <canvas ref={canvasRef}></canvas>;
}
