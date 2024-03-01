import "./style.css";

//目标：浏览器窗口、尺寸改变时，画布自适应
// 作用：浏览器发生变化，画布大小随着浏览器的变化而变化

// 1. 创建适配函数，监听浏览器resize时间
// 2. 调整渲染器画布宽高，摄像机宽高比和更新椎体空间

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

// 1.创建坐标轴
function createHelper() {
    // 创建坐标轴
    const axesHelper = new THREE.AxesHelper(2);
    // 将坐标轴添加到场景中
    scene.add(axesHelper);
}

// 1.创建适配方法,作用是浏览器发生变化，画布大小随着浏览器的变化而变化
function renderResize() {
    window.addEventListener("resize", () => {
        // 重新设置画布大小
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 重新设置摄像机宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        // 重新更新椎体空间
        camera.updateProjectionMatrix();
    });
}
// 调用初始加载场景与摄像机方法
init();

// 调用创建立方体方法
createCube();

// 调用创建轨道控制器方法
createControls();

// 调用创建坐标轴方法
createHelper();

// 调用循环渲染中更新场景方法
renderLoop();

// 调用适配方法
renderResize();
