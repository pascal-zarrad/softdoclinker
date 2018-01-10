/**
 * A Object that provides the required Meta-Data to construct a documentation list element
 */
export class DocumentationData {

    /**
     * The title of the documentation info to display
     */
    public title: string;

    /**
     * The description of the targeted documentation
     */
    public description: string;

    /**
     * The URL to the source
     */
    public sourceURL: string;

    /**
     * The URL to the documentation files.
     */
    public documentationURL: string;

    private constructor(title: string, description: string, sourceURL: string, documentationURL: string) {
        this.title = title;
        this.description = description;
        this.sourceURL = sourceURL;
        this.documentationURL = documentationURL;
    }

    /**
     * Deserialize a JSon DocumentationData Object to a DocumentationData object
     * @param data The data to deserialize
     * @returns {DocumentationData} The created DocumentationData object
     */
    public static fromJSon(data): DocumentationData {
        return new DocumentationData(data.title, data.description, data.sourceURL, data.documentationURL);
    }
}