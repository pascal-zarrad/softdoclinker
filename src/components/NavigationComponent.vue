<template>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
    >
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <span class="hidden-sm-and-down">
                {{ this.$sharedState.currentConfig.instanceName }}
            </span>
        </v-toolbar-title>
        <v-spacer />
        <navigation-custom-button-component
            v-for="customButton in this.$sharedState.currentConfig.navigation
                .links"
            v-bind:key="customButton.id"
            :icon="customButton.icon"
            :text="customButton.displayText"
            :href="customButton.href"
            :target="customButton.target"
        />
    </v-app-bar>
</template>

<script lang="ts">
import NavigationCustomButtonComponent from "@/components/element/NavigationCustomButtonComponent.vue";
import SharedStateInterface from "@/model/SharedStateInterface";
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Component that provides a navigation bar
 * for the application.
 *
 * @since 2.0.0
 */
@Component({
    name: "NavigationComponent",
    components: {
        NavigationCustomButtonComponent
    }
})
export default class NavigationComponent extends Vue {
    /**
     * Function that enables opening and closing of the drawer.
     */
    public toggleDrawer(): void {
        this.$emit("toggleDrawer");
    }
}
</script>
