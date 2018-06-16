import {DocumentationConfiguration} from "./configuration";

declare var jQuery: any;

export class DocumentationListProcessor {

    /**
     * The currently displayed at the documentations list
     */
    private documentationNodes: HTMLElement[] = [];

    /**
     * Replaces the current documentation list with the new one from the data
     * @param {DocumentationConfiguration} data The DocumentationConfiguration which provides the data required to create the List.
     */
    public updateDocumentationList(data: DocumentationConfiguration): void {
        this.clear()
        this.rebuildTree(data);
    }

    /**
     * Generates the new list
     * @param {DocumentationConfiguration} data The data used to generate the new list
     */
    private rebuildTree(data: DocumentationConfiguration): void {
        for (let config of data.documentations) {
            let listElement: HTMLElement = document.createElement("li");
            listElement.classList.add("list-group-item");

            let titleElement: HTMLElement = document.createElement("h4");
            titleElement.innerText = config.title;
            titleElement.classList.add("list-group-item-heading");
            listElement.appendChild(titleElement);

            let descriptionElement: HTMLElement = document.createElement("p");
            descriptionElement.innerText = config.description;
            descriptionElement.classList.add("list-group-item-text");
            listElement.appendChild(descriptionElement);

            let links: HTMLElement = document.createElement("p");
            links.classList.add("list-group-item-text", "text-center");

            if (config.sourceURL != undefined && config.sourceURL != "none") {
                let sourceURLElement: HTMLElement = document.createElement("a");
                sourceURLElement.setAttribute("href", config.sourceURL);
                let iconSpan: HTMLElement = document.createElement("span");
                iconSpan.classList.add("fas", "fa-pencil-alt", "doc-list-link-span");
                sourceURLElement.appendChild(iconSpan);
                sourceURLElement.appendChild(this.generateTextSpan("Source"));
                links.appendChild(sourceURLElement);
            }

            if (config.documentationURL != undefined && config.documentationURL != "none") {
                let documentationURLElement: HTMLElement = document.createElement("a");
                documentationURLElement.setAttribute("href", config.documentationURL);
                let iconSpan: HTMLElement = document.createElement("span");
                iconSpan.classList.add("fa", "fa-book", "doc-list-link-span");
                documentationURLElement.appendChild(iconSpan);
                documentationURLElement.appendChild(this.generateTextSpan("Documentation"));
                links.appendChild(documentationURLElement);

                if (config.enableShow && !jQuery.browser.mobile) {
                    let documentationShowURLElement: HTMLElement = document.createElement("a");
                    documentationShowURLElement.setAttribute("href", "#");
                    documentationShowURLElement.addEventListener('click', function () {
                        let documentationFrame: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById("document-frame");
                        documentationFrame.classList.remove("no-scroll");
                        document.getElementById("document-viewer").classList.remove("no-scroll");
                        documentationFrame.src = config.documentationURL;
                    });
                    let iconShowSpan: HTMLElement = document.createElement("span");
                    iconShowSpan.classList.add("fa", "fa-eye", "doc-list-link-span");
                    documentationShowURLElement.appendChild(iconShowSpan);
                    documentationShowURLElement.appendChild(this.generateTextSpan("Show"));
                    links.appendChild(documentationShowURLElement);
                }
            }

            listElement.appendChild(links);

            this.documentationNodes.push(listElement);
            document.getElementById('doc-list-body').appendChild(listElement);
        }
    }

    /**
     * Clears the currently displayed DocumentationConfiguration's
     */
    private clear() {
        for (let element of this.documentationNodes) {
            element.remove();
        }
        this.documentationNodes = [];
    }

    /**
     * Generate a span styled for the document list
     * @param {string} text The text which will be displayed in the new span
     */
    private generateTextSpan(text: string): HTMLElement {
        let textSpan = document.createElement("span");
        textSpan.classList.add("doc-list-link-span");
        textSpan.innerText = " " + text;
        return textSpan;
    }
}