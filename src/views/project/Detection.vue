<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      axisHelper: null,
      light: null,
      obj: "Truss3D.obj",
      mtl: "Truss3D.mtl",
      clickObjects: []
    };
  },
  computed: {
    ...mapState(["threeDatas", "projectInfo"])
  },
  methods: {
    ...mapMutations(["INIT_3D_DATAS"]),
    initRenderer(element) {
      // 渲染一个场景
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(element.clientWidth, element.clientHeight);
      this.renderer.setClearColor(0xb9d3ff, 0.5);
      element.appendChild(this.renderer.domElement);
    },
    initScene() {
      // 添加一个场景
      this.scene = new THREE.Scene();
    },
    initAxisHelper() {
      this.axisHelper = new THREE.AxesHelper(250);
      this.scene.add(this.axisHelper);
    },
    initCamera() {
      // 添加一个相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        6000
      );
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 100;
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
      this.controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      this.controls.dampingFactor = 0.25;
      //是否可以缩放
      this.controls.enableZoom = true;
      //是否自动旋转
      this.controls.autoRotate = true;
      //设置相机距离原点的最近距离
      this.controls.minDistance = 1;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 2000;
      //是否开启右键拖拽
      this.controls.enablePan = true;
    },
    initSensor() {
      this.threeDatas.forEach(item => {
        let pos = item.position || "0,0,0";
        let x = pos.split(",")[0] || 0;
        let y = pos.split(",")[1] || 0;
        let z = pos.split(",")[2] || 0;
        let geometry = new THREE.SphereGeometry(1, 32, 32);
        let color = { color: 0xff0000 };
        if (item.value) {
          let current = parseInt(item.value[0]);
          if (current - item.threshold < item.limit * 0.95) {
            color = { color: 0xffff00 };
          } else {
            color = { color: 0xff0000 };
          }
        }

        let material = new THREE.MeshBasicMaterial(color);
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x, y, z);
        this.scene.add(sphere);
      });
    },
    initThree(element) {
      this.initRenderer(element);
      this.initScene();
      this.initAxisHelper();
      this.initCamera();
      this.initLight();
      // 导入文件
      let mtlLoader = new MTLLoader();
      let objLoader = new OBJLoader();
      // mtlLoader.load(`${this.publicPath}model/${this.mtl}`, materials => {
      //   materials.preload();
      //   objLoader.setMaterials(materials);
      //   objLoader.load(`${this.publicPath}model/${this.obj}`, object => {
      //     object.position.set(0, 0, 0);
      //     this.scene.add(object);
      //   });
      // });
      mtlLoader.load(`${this.projectInfo.mtl}`, materials => {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(`${this.projectInfo.obj}`, object => {
          object.position.set(0, 0, 0);
          this.scene.add(object);
        });
      });
      this.initSensor();
      this.initThreeClickEvent();
      this.$nextTick(() => {
        this.initControl();
      });
    },

    initThreeClickEvent() {
      window.console.log("点击事件");
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      document
        .getElementById("container")
        .addEventListener("mousedown", onDocumentMouseDown, false);
      function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);
        var intersects = raycaster.intersectObjects(this.clickObjects);
        // var intersects = raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
          window.console.log(intersects[0].object);
          // showDetailPage(intersects[0].object.name);
        }
      }
    },

    animate() {
      this.renderer.render(this.scene, this.camera);
      //再次调用animate方法实现刷新
      requestAnimationFrame(this.animate);
    }
  },
  created() {
    this.$http.get(`/project/${this.$route.params.id}/sensor`).then(res => {
      this.INIT_3D_DATAS(res.data);
    });
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
  height: 800px;
  width: 100%;
}
</style>

