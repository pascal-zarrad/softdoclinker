/* istanbul ignore file */

import DocDataInterface from "@/model/doc/docDataInterface";
import DocCollectionInterface from "@/model/doc/docCollectionInterface";

/**
 * Data class that provides the default doc data of SoftDocLinker.
 *
 * @since 2.0.0
 */
export default class DefaultDocCollectionData
    implements DocCollectionInterface {
    /**
     * @inheritdoc
     */
    documentations: DocDataInterface[] = [];
}
