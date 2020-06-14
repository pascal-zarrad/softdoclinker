<template>
    <v-app id="softdoclinker-app">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            app
        >
            <v-list dense />
        </v-navigation-drawer>

        <navigation-component
            :sharedState="sharedState"
            :drawer="drawer"
            @toggleDrawer="toggleDrawer"
        />

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
import defaultSharedState from "@/model/defaultSharedState";
import SharedStateInterface from "@/model/SharedStateInterface";
import StateManagementInterface from "@/model/StateManagementInterface";
import Vue from "vue";

export default Vue.extend({
    name: "App",
    components: {
        NavigationComponent,
        RefreshDataComponent
    },
    data: function() {
        return {
            sharedState: defaultSharedState(),
            drawer: true
        };
    },
    mounted() {
        this.$softDocLinker.getStateManagement().then(
            (
                stateManagement: StateManagementInterface
            ): Promise<SharedStateInterface> => {
                stateManagement.sharedState = this.sharedState;
                return stateManagement.update(false);
            }
        );
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        }
    }
});
</script>
