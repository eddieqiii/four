const SPACE = 1;
const WIDTH = 100;
const CAM_Y = 2;
const CAM_Z = 0;

var scene, camera, renderer;
var points;
var i, j;

init();
drawGrid();
animate();

function init () {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.position.y += CAM_Y;
	camera.position.z += CAM_Z;
	document.body.appendChild(renderer.domElement);
};

function drawGridMesh () {
	var meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
	var meshGeo = new THREE.Geometry();

	for (i = 0; i < WIDTH; i++) {
		for (j = 0; j < WIDTH; j++) {
			meshGeo.vertices.push(points[i][j]);
		}
	};

	var newShape = new THREE.SkinnedMesh(meshGeo, meshMaterial);
	scene.add(newShape);
}

function drawGrid () {
	var lineMaterial = new THREE.LineBasicMaterial({ color: 0x75EFE5 });

	points = [];
	var currentZ = 0;
	var currentY = 0;
	var currentX;
	for (i = 0; i < WIDTH; i++) {
		currentX = -(WIDTH * SPACE / 2);
		var vertices = [];
		for (j = 0; j < WIDTH; j++) {
			currentY = Math.random();
			var xjitter = (Math.random() - 0.5) / 5;
			vertices.push(new THREE.Vector3(currentX + xjitter, currentY, currentZ));
			currentX += SPACE;
		};
		points.push(vertices);
		currentZ -= SPACE;
	};

	for (i = 0; i < WIDTH; i++) {
		scene.add(drawLine(points[i], lineMaterial));
		scene.add(drawLine(points.map(x => x[i]), lineMaterial));
	};
	//drawGridMesh();
};

function drawLine (vertices, material) {
	var geo = new THREE.Geometry();
	for (j = 0; j < vertices.length; j++) {
		geo.vertices.push(vertices[j]);
	};
	return new THREE.Line(geo, material);
}

function animate () {
	tick();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

function tick () {
	//camera.position.y += 0.001;
	camera.position.z -= 0.01

	/*var jitterAmt;
	for (i = 0; i < WIDTH; i++) {
		for (j = 0; j < WIDTH; j++) {
			jitterAmt = (Math.random() - 0.5) / 100;
			points[i][j].y += jitterAmt;
		}
	}
	for (i = 0; i < 2 * WIDTH; i++) {
		scene.children[i].geometry.verticesNeedUpdate = true;
	};*/
};
