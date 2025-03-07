<template>
    <div>
        <h1>当前页面路径：{{ currentPath }}</h1>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPath = ref('');

onMounted(() => {
    currentPath.value = route.path;
});

</script>
<style scoped></style>