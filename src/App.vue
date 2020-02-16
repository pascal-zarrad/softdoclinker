<template>
    <v-app>
        <navigation-component />

        <v-content>
            <loading-component />
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import NavigationComponent from "@/components/NavigationComponent.vue";

export default Vue.extend({
    name: "App",
    components: {
        LoadingComponent,
        NavigationComponent
    },
    data: () => ({
        overlay: false
    })
});
</script>
