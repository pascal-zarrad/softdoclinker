import DocInfoDataInterface from "@/model/doc/DocVersionDataInterface";

/**
 * An interface to store a documentation
 * and its versions
 *
 * @since 2.0.0
 */
export default interface DocDataInterface {
    /**
     *
     */
    doc: DocInfoDataInterface[];
}
