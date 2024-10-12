<template>
  <button
      class="m-0 p-1 outline-none bg-pink-300 text-white rounded-md transition-transform duration-300 hover:cursor-pointer hover:scale-[1.05]"
      @click="handleButtonClick">
    测试tailwind按钮
  </button>
</template>

<script lang="ts" setup>
import {toRefs} from "vue";

defineOptions({
  name: "TailwindButton"
});

const props = defineProps<{ message: string }>();

const {message} = toRefs(props);

const handleButtonClick = () => {
  alert(message.value);
};
</script>
