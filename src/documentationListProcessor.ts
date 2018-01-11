import {DocumentationConfiguration} from "./configuration";

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
                iconSpan.classList.add("fa", "fa-pencil");
                iconSpan.innerText = " Source";
                sourceURLElement.appendChild(iconSpan);
                links.appendChild(sourceURLElement);
            }

            if (config.documentationURL != undefined && config.documentationURL != "none") {
                let documentationURLElement: HTMLElement = document.createElement("a");
                documentationURLElement.setAttribute("href", config.documentationURL);
                let iconSpan: HTMLElement = document.createElement("span");
                iconSpan.classList.add("fa", "fa-book");
                iconSpan.innerText = " Documentation";
                documentationURLElement.appendChild(iconSpan);
                links.appendChild(documentationURLElement);

                if (config.enableShow) {
                    let documentationShowURLElement: HTMLElement = document.createElement("a");
                    documentationShowURLElement.setAttribute("href", "#");
                    documentationShowURLElement.addEventListener('click', function () {
                        let documentationFrame: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById("document-frame");
                        documentationFrame.classList.remove("no-scroll");
                        document.getElementById("document-viewer").classList.remove("no-scroll");
                        documentationFrame.src = config.documentationURL;
                    });
                    let iconShowSpan: HTMLElement = document.createElement("span");
                    iconShowSpan.classList.add("fa", "fa-eye");
                    iconShowSpan.innerText = " Show";
                    documentationShowURLElement.appendChild(iconShowSpan);
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
}