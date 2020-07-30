import SharedStateInterface from "@/model/SharedStateInterface";

/**
 * Augment Vue type to add our own instance properties required for
 * stuff that is shared between the entire application.
 */
declare module "vue/types/vue" {
    interface Vue {
        /**
         * The applications shared state that is accessible
         * across all components.
         */
        $sharedState: SharedStateInterface;
    }
}
