import DocDataInterface from "@/model/doc/docDataInterface";

/**
 * An interface that represents a collection of documentations
 */
export default interface DocCollectionInterface {
    /**
     * An array that contains DocDataInterfaces
     */
    documentations: DocDataInterface[];
}
