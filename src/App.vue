<template>
    <v-app id="softdoclinker-app">
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" app>
            <v-list dense />
        </v-navigation-drawer>

        <navigation-component :sharedState="sharedState" />

        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" />
            </v-container>
        </v-content>
        <refresh-data-component
            :sharedState="sharedState"
        ></refresh-data-component>
    </v-app>
</template>

<script lang="ts">
import NavigationComponent from "@/components/NavigationComponent.vue";
import RefreshDataComponent from "@/components/RefreshDataComponent.vue";
import SOFT_DOC_LINKER from "@/softDocLinker";
import Vue from "vue";

export default Vue.extend({
    name: "App",
    components: {
        NavigationComponent,
        RefreshDataComponent
    },
    data: () => ({
        sharedState: SOFT_DOC_LINKER.sharedState
    })
});
</script>
