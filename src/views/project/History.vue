<template>
  <div>
    <el-row>
      <el-col
        :xs="{span: 24, offset: 0}"
        :sm="{span: 18, offset: 3}"
        :md="{span: 14, offset: 5}"
        :lg="{span: 14, offset: 5}"
        :xl="{span: 14, offset: 5}"
      >
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(item, index) in history"
            :key="index"
            :timestamp="item.time"
            placement="top"
            color="#409EFF"
            icon="el-icon-more"
            size="large"
          >
            <div class="container">
              <el-button type="text" size="mini" style="float:right">
                <i class="el-icon-position"></i> 查看详情
              </el-button>
              <p>
                <span class="icon">描述：</span>
                <span class="info">{{item.description}}</span>
              </p>
              <p>
                <span class="icon">状态：</span>
                <span class="status">{{item.status}}</span>
              </p>
              <p>
                <span class="icon">备注：</span>
                <span class="status">{{item.notes}}</span>
              </p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [
        {
          time: "2020-01-01 20:20:20",
          description: "极端天气，部分测点测值超限。",
          status: "已处理",
          url: "",
          notes: "这里是一些备注。"
        },
        {
          time: "2020-01-01 20:20:20",
          description: "极端天气，部分测点测值超限。",
          status: "已处理",
          url: "",
          notes:
            "这里是一些备注备注。这里是一些备注备注。这里是一些备注备注。这里是一些备注备注。这里是一些备注备注。这里是一些备注备注。这里是一些备注备注。这里是一些备注备注。这里是一些备注备注。"
        },
        {
          time: "2020-01-01 20:20:20",
          description: "极端天气，部分测点测值超限。",
          status: "已处理",
          url: "",
          notes: "这里是一些备注。这里是一些备注。"
        },
        {
          time: "2020-01-01 20:20:20",
          description:
            "极端天气，部分测点测值超限。这里是一些描述，描述，描述。极端天气，部分测点测值超限。这里是一些描述，描述，描述。极端天气，部分测点测值超限。这里是一些描述，描述，描述。极端天气，部分测点测值超限。这里是一些描述，描述，描述。极端天气，部分测点测值超限。这里是一些描述，描述，描述。",
          status: "已处理",
          url: "",
          notes: "这里是一些备注。这里是一些备注。"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #E4E7ED;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  .icon {
    font-weight: 200;
  }
}
</style>