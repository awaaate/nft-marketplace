import { useRouter } from "next/dist/client/router";
import Error from "next/error";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useFetchMyNFTs } from "../../lib/hooks/useFetchMyNFTs";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function MangaReader() {
    const router = useRouter();
    const { data, error, mutate } = useFetchMyNFTs();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    const item = data.find((i) => i.tokenId === router.query.id);
    if (!item) return <Error statusCode={404} />;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    console.log(item);
    return (
        <>
            <Document
                file={item.pdf}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div>
                <p>
                    Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                    {numPages || "--"}
                </p>
                <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    Previous
                </button>
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default MangaReader;
