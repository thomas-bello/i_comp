<template>
  <div>
    <div class="preview">
      <Comp v-bind="value.body" />
    </div>

    <hr />
    <div class="flex p-5">
      <div class="flex-1">
        <ComponentEdit :value.sync="value.body" />
        <div class="mt-5">
          <el-button type="primary" @click="submitForm">保存</el-button>
        </div>
      </div>

      <div class="border p-2 ml-5 rounded code-preview">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewEdit',
  data() {
    return {
      value: {
        body: {},
        header: {},
      },
    }
  },
  methods: {
    submitForm() {
      console.log(this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.preview {
  min-height: 10rem;
}
.code-preview {
  max-width: 40rem;
  min-width: 15rem;
}
</style>
