import DocDataInterface from "@/model/doc/DocDataInterface";

/**
 * An interface that represents a collection of documentations
 */
export default interface DocCollectionInterface {
    /**
     * An array that contains DocDataInterfaces
     */
    documentations: DocDataInterface[];
}
