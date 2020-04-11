<template>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
    >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <span class="hidden-sm-and-down">
                {{ sharedState.currentConfig.instanceName }}
            </span>
        </v-toolbar-title>
        <v-spacer />
        <navigation-custom-button-component />
    </v-app-bar>
</template>

<script lang="ts">
import NavigationCustomButtonComponent from "@/components/element/NavigationCustomButtonComponent.vue";
import SOFT_DOC_LINKER from "@/softDocLinker";
import SoftDocLinkerDataStateInterface from "@/model/sharedStateInterface";
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
     * Brand displayed on navigation bar.
     */
    @Prop({ default: SOFT_DOC_LINKER })
    sharedState?: SoftDocLinkerDataStateInterface;
}
</script>
