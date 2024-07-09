function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('glCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;

    // Добавляем обработчик изменения выбора фигуры
    document.getElementById('shape').addEventListener('change', function () {
        const shape = this.value;
        document.getElementById('circle-controls').style.display = (shape === 'circle') ? 'block' : 'none';
        document.getElementById('polygon-controls').style.display = (shape === 'polygon') ? 'block' : 'none';
    });
}

function drawCircle(radius) {
    const geometry = new THREE.CircleGeometry(radius, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const circle = new THREE.Mesh(geometry, material);
    scene.add(circle);
}

function drawPolygon(sides) {
    const shape = new THREE.Shape();
    const radius = 50;
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    shape.lineTo(radius, 0);

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const polygon = new THREE.Mesh(geometry, material);
    scene.add(polygon);
}

function drawShapes() {
    // Очистка сцены перед каждым построением
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    const shape = document.getElementById('shape').value;
    if (shape === 'circle') {
        const radius = document.getElementById('radius').value;
        drawCircle(radius);
    } else if (shape === 'polygon') {
        const sides = document.getElementById('sides').value;
        drawPolygon(sides);
    }
    renderer.render(scene, camera);
}

init();
renderer.render(scene, camera);