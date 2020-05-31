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
      clipHelpers: null,
      globalPlanes: null,
      light: null,
      gui: null,
      guiControls: {
        planeVectorx: 0,
        planeVectory: -1,
        planeVectorz: 0
      },
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
        sphere.info = item;
        this.scene.add(sphere);
        this.clickObjects.push(sphere);
      });
    },
    initObj() {
      // 导入文件
      let mtlLoader = new MTLLoader();
      let objLoader = new OBJLoader();
      mtlLoader.load(`${this.projectInfo.mtl}`, materials => {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(`${this.projectInfo.obj}`, object => {
          object.position.set(0, 0, 0);
          this.scene.add(object);
        });
      });
    },
    initClipPlanes(controls) {
      this.clipHelpers = new THREE.Group();
      this.globalPlanes = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
      this.globalPlanes = new THREE.Plane(
        new THREE.Vector3(
          controls.planeVectorx,
          controls.planeVectory,
          controls.planeVectorz
        ),
        1
      );
      this.clipHelpers.add(
        new THREE.PlaneHelper(this.globalPlanes, 200, 0xff0000)
      );
      this.clipHelpers.visible = false;
      this.scene.add(this.clipHelpers);
      //创建一个剖切面
      this.renderer.clippingPlanes = [this.globalPlanes]; // 显示剖面
      this.renderer.localClippingEnabled = true;
    },
    // initThreeClickEvent(clickObjects) {
    //   let raycaster = new THREE.Raycaster();
    //   let mouse = new THREE.Vector2();
    //   document
    //     .getElementById("container")
    //     .addEventListener("mousedown", onDocumentMouseDown, false);
    //   function onDocumentMouseDown(event) {
    //     let intersects = [];
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //     raycaster.setFromCamera(mouse, this.camera);
    //     intersects = raycaster.intersectObjects(clickObjects);
    //     if (intersects.length > 0) {
    //       for (let i = 0; i < intersects.length; i++) {
    //         window.console.log(intersects[i].object.info.position);
    //       }
    //     }
    //   }
    // },
    // changeClips(array) {
    //   this.$set(this.vector, "x", array[0]);
    //   this.$set(this.vector, "y", array[1]);
    //   this.$set(this.vector, "z", array[2]);
    //   window.console.log(this.vector);
    // },
    async initThree(element) {
      await this.initRenderer(element);
      await this.initScene();
      await this.initAxisHelper();
      await this.initCamera();
      await this.initLight();
      // await this.initGui();
      await this.initClipPlanes(this.guiControls);
      await this.initObj();
      await this.initSensor();
      // await this.initThreeClickEvent(this.clickObjects);
      await this.initControl();
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

