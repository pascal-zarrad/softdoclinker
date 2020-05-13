<template>
    <v-btn text :href="href" :target="target">
        <v-icon>{{ icon }}</v-icon>
        <span>{{ text }}</span>
    </v-btn>
</template>

<script lang="ts">
import SoftDocLinkerDataStateInterface from "@/model/SharedStateInterface";
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Component that provides a navigation bar
 * for the application.
 *
 * @since 2.0.0
 */
@Component({
    name: "NavigationCustomButtonComponent"
})
export default class NavigationCustomButtonComponent extends Vue {
    /**
     * Icon displayed in front of the button
     */
    @Prop({ default: "" })
    icon?: string;

    /**
     * The text displayed by the button
     */
    @Prop({ default: "" })
    text?: string;

    /**
     * The target URL that should be opened when the button is clicked
     */
    @Prop({ default: "#" })
    href?: string;

    /**
     * Defines where the target URL should be opened (for example: new tab)
     */
    @Prop({ default: "_blank" })
    target?: string;
}
</script>
