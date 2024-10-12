<template>
  <button class="alert-button" @click="handleButtonClick">测试less按钮</button>
</template>

<script lang="ts" setup>
import {toRefs} from "vue";
import "./style/index.less";

defineOptions({
  name: "LessButton"
});

const props = defineProps<{ message: string }>();

const {message} = toRefs(props);

const handleButtonClick = () => {
  alert(message.value);
};
</script>
