<template>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                transition="scale-transition"
                width="40"
            />

            {{ instanceName }}
        </div>

        <v-spacer></v-spacer>

        <v-btn
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            text
        >
            <span class="mr-2">Latest Release</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Component that provides a navigation bar
 * for the application.
 *
 * @since 2.0.0
 */
@Component
export default class NavigationComponent extends Vue {
    @Prop({ default: "SoftDocLinker" })
    instanceName: string = "SoftDocLinker";
}
</script>
