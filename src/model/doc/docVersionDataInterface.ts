/**
 * An interface to represent one simple documentation version
 * object that contain a version and description of a
 * specific documentation.
 *
 * @since 2.0.0
 */
export default interface DocVersionDataInterface {
    /**
     * The version of the documentation
     */
    documentationVersion: string;
    /**
     * The url of the specific version
     */
    documentationUrl: string;
}
