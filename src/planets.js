import * as THREE from "three";
import {TextureLoader} from "three";
//Textures
const baseUrl = "/assets";
const textureLoader = new TextureLoader();
const mercuryTexture = textureLoader.load(`${baseUrl}/2k_mercury.jpg`);
const venusTexture = textureLoader.load(`${baseUrl}/2k_venus.jpg`);
const earthTexture = textureLoader.load(`${baseUrl}/2k_earth.jpg`);
const marsTexture = textureLoader.load(`${baseUrl}/2k_mars.jpg`);
const jupiterTexture = textureLoader.load(`${baseUrl}/2k_jupiter.jpg`);
const saturnTexture = textureLoader.load(`${baseUrl}/2k_saturn.jpg`);
const uranusTexture = textureLoader.load(`${baseUrl}/2k_uranus.jpg`);
const neptuneTexture = textureLoader.load(`${baseUrl}/2k_neptune.jpg`);
const moonTexture = textureLoader.load(`${baseUrl}/2k_moon.jpg`);

//Materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture});
const jupiterMaterial = new THREE.MeshStandardMaterial({
    map: jupiterTexture,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
    map: saturnTexture,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
    map: uranusTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
    map: neptuneTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});

const planets = [
    {
        name: "mercury",
        distance: 15,
        size: 0.15,
        material: mercuryMaterial,
        speed: 0.4,
        moons: [],
    },
    {
        name: "venus",
        distance: 30,
        size: 0.17,
        material: venusMaterial,
        speed: 0.25,
        moons: [],
    },
    {
        name: "earth",
        distance: 45,
        size: 0.2,
        material: earthMaterial,
        speed: 0.1,
        moons: [
            {
                name: "moon",
                distance: 2,
                size: 0.1,
                material: moonMaterial,
                speed: 0.2,
            },
        ],
    },
    {
        name: "mars",
        distance: 60,
        size: 0.49,
        material: marsMaterial,
        speed: 0.08,
        moons: [
            {
                name: "phobos",
                material: moonMaterial,
                distance: 1.5,
                size: 0.1,
                speed: 0.3,
            },
            {
                name: "deimos",
                material: moonMaterial,
                distance: 2,
                size: 0.08,
                speed: 0.2,
            },
        ],
    },
    {
        name: "jupiter",
        distance: 80,
        size: 1.3,
        material: jupiterMaterial,
        speed: 0.05,
        moons: [
            {
                name: "io",
                material: moonMaterial,
                distance: 3,
                size: 0.29,
                speed: 0.3,
            },
        ],
    },
    {
        name: "saturn",
        distance: 105,
        size: 0.6,
        material: saturnMaterial,
        speed: 0.03,
        moons: [
            {
                name: "titan",
                material: moonMaterial,
                distance: 3,
                size: 0.4,
                speed: 0.2,
            },
            {
                name: "enceladus",
                material: moonMaterial,
                distance: 2,
                size: 0.1,
                speed: 0.25,
            },
        ],
    },
    {
        name: "uranus",
        distance: 130,
        size: 0.7,
        material: uranusMaterial,
        speed: 0.02,
        moons: [
            {
                name: "titania",
                material: moonMaterial,
                distance: 2,
                size: 0.25,
                speed: 0.2,
            },
            {
                name: "oberon",
                material: moonMaterial,
                distance: 3,
                size: 0.24,
                speed: 0.18,
            },
        ],
    },
    {
        name: "neptune",
        distance: 155,
        size: 0.6,
        material: neptuneMaterial,
        speed: 0.015,
        moons: [
            {
                name: "triton",
                material: moonMaterial,
                distance: 2,
                size: 0.27,
                speed: 0.22,
            },
        ],
    },
];

export {planets};
