<template>
    <v-app id="softdoclinker-app">
        <!-- Notification management -->
        <notifications-component />

        <!-- Drawer for documentation view  -->
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            app
        >
            <v-list dense />
        </v-navigation-drawer>

        <navigation-component :drawer="drawer" @toggleDrawer="toggleDrawer" />

        <!-- Content area for loaded documentation -->
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" />
            </v-container>
        </v-content>
        <refresh-data-component></refresh-data-component>
    </v-app>
</template>

<script lang="ts">
import NavigationComponent from "@/components/NavigationComponent.vue";
import RefreshDataComponent from "@/components/RefreshDataComponent.vue";
import NotificationsComponent from "@/components/NotificationsComponent.vue";
import defaultSharedState from "@/model/defaultSharedState";
import SharedStateInterface from "@/model/SharedStateInterface";
import StateManagementInterface from "@/model/StateManagementInterface";
import Vue from "vue";

export default Vue.extend({
    name: "App",
    components: {
        NavigationComponent,
        RefreshDataComponent,
        NotificationsComponent
    },
    data: function() {
        return {
            drawer: true
        };
    },
    mounted() {
        this.$softDocLinker.getStateManagement().then(
            (
                stateManagement: StateManagementInterface
            ): Promise<SharedStateInterface> => {
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
