import "./style.css";

//目标：摄像机 - 轨道控制器（通过轨道控制器，移动摄像机）
// 作用：调整摄像机位置灯，查看不同画面

// 1.单独引入OrbitControls 轨道控制器构造函数
// 2.创建轨道控制器
// 3.在渲染中更新场景渲染

// 1.引入three.js
import * as THREE from "three";

// 引入轨道控制器构造函数
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer;
let controls;

function init() {
    // 创建场景
    scene = new THREE.Scene();
    // 创建摄像机
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // 改变摄像机Z轴位置， 把摄像机向后位移5各单位
    camera.position.z = 5;

    // 创建渲染器
    renderer = new THREE.WebGLRenderer();

    // 设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 添加到DOM
    document.body.append(renderer.domElement);
}

// 创建立方体
function createCube() {
    // 1.创建图形，款身高为 1 单位（创建立方缓冲几何体）
    const geomentry = new THREE.BoxGeometry(1, 1, 1);

    // 2.创建材质，颜色为绿色 0X00ff00
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
    });

    // 3.创建网格物体对象，传入图形和材质
    const cube = new THREE.Mesh(geomentry, material);

    // 4.把物体加入到场景中
    scene.add(cube);
}

// 2.创建轨道控制器
function createControls() {
    controls = new OrbitControls(camera, renderer.domElement);
}

// 3.在循环渲染中更新场景
function renderLoop() {
    // 循环渲染（根据当前计算机浏览器刷新帧率，（默认60次/秒），不断调用此函数渲染最新画面状态）
    // 好处是：当前页面切换到后台，暂停递归
    requestAnimationFrame(renderLoop);

    // 更新（手动js代码更新摄像机信息，必须调用轨道控制器updata方法）
    controls.update();

    // 将摄像机与场景渲染到画布上
    renderer.render(scene, camera);
}

// 调用初始加载场景与摄像机方法
init();

// 调用创建立方体方法
createCube();

// 调用创建轨道控制器方法
createControls();

// 调用循环渲染中更新场景方法
renderLoop();
