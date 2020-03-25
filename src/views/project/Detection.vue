<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      light: null
    };
  },
  methods: {
    initRenderer(element) {
      // 渲染一个场景
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(element.clientWidth, element.clientHeight);
      this.renderer.setClearColor(0xb9d3ff, 1);
      element.appendChild(this.renderer.domElement);
    },
    initScene() {
      // 添加一个场景
      this.scene = new THREE.Scene();
    },
    initCamera() {
      // 添加一个相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      this.camera.position.x = 0;
      this.camera.position.y = 1000;
      this.camera.position.z = 1000;
      this.camera.rotation.x -= 45 * (Math.PI / 180);
      this.scene.add(this.camera);
    },
    initLight() {
      //创建灯光
      this.light = new THREE.AmbientLight(0xffffff);
      this.scene.add(this.light);
    },
    initControl() {
      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    onResize() {
      // this.camera.aspect = window.innerWidth / window.innerHeight;
      // this.camera.updateProjectionMatrix();
      // this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    initThree(element) {
      this.initRenderer(element);
      this.initScene();
      this.initCamera();
      this.initLight();
      // 导入文件
      let mtlLoader = new MTLLoader();
      let objLoader = new OBJLoader();
      mtlLoader.load(`${this.publicPath}model/Building.mtl`, materials => {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(`${this.publicPath}model/Building.obj`, object => {
          object.position.set(0, -200, 0);
          this.scene.add(object);
        });
      });
      this.$nextTick(() => {
        this.initControl();
        //监听鼠标、键盘事件
        // this.controls.
      });
      // element.addEventListener("resize", this.onResize, false);
    },
    animate() {
      this.renderer.render(this.scene, this.camera);
      // this.controls.update();
      //再次调用animate方法实现刷新
      requestAnimationFrame(this.animate);
    }
  },
  mounted() {
    this.initThree(document.getElementById("container"));
    // 执行动画循环
    this.animate();
  }
};
</script>

  <style lang="scss" scoped>
#container {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>

