<template>
    <Suspense>
        <template #default>
            <router-view></router-view>
        </template>
        <template #fallback>
            <p style="color: black;align-items: center;">Loading...</p>
        </template>
    </Suspense>
    <!-- <router-view></router-view> -->
</template>

<script setup>

</script>