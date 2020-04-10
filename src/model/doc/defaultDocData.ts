import DocDataInterface from "@/model/doc/docDataInterface";
import DocVersionDataInterface from "@/model/doc/docVersionDataInterface";

/**
 * Data class that provides the default doc data of SoftDocLinker.
 *
 * @since 2.0.0
 */
export default class DefaultDocData implements DocDataInterface {
    /**
     * @inheritdoc
     */
    doc: DocVersionDataInterface[] = [];
}
