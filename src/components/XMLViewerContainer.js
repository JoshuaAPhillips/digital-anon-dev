import {Fragment, useEffect, useState} from "react";
import * as AppUtil from "../util/app-util";
import Container from "react-bootstrap/Container";
import AnnotationContainer from "./AnnotationContainer";
import {Responsive, WidthProvider} from "react-grid-layout";
import {CustomNavbar} from "./CustomNavbar";
import {DynamicXMLViewer} from "./DynamicXMLViewer";
import {CustomPagination} from "./CustomPagination";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function XMLViewerContainer() {
    const [selectedZone, setSelectedZone] = useState("");
    const [layout, setLayout] = useState(AppUtil.sideBySideLayout);

    const [filesInfo, setFilesInfo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [annoZones, setAnnoZones] = useState()

    function resetLayout(newLayout) {
        if (newLayout === 'sbs') {
            setLayout(AppUtil.sideBySideLayout)
        }
        else if (newLayout === 'fw') {
            setLayout(AppUtil.fullWidthLayout)
        }
    }

    function onLayoutChange(layout, layouts) {
        setLayout(layouts)
    }

    useEffect(() => {
        const loadFilesInfo = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/files_info.json`);
                const data = await response.json();
                setFilesInfo(data);
            }
            catch (e) {
                console.error(e)
            }
        };
        loadFilesInfo();
    }, []);


    return (
        <Fragment>
            <CustomNavbar loggedIn={true} helperFunctions={{resetLayout}} />
            <Container>

                <ResponsiveGridLayout
                    className="layout"
                    layouts={layout}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={130}
                    draggableHandle=".drag-handle"
                    resizeHandles={['se', 'ne']}
                    onLayoutChange={(layout, layouts) =>
                        onLayoutChange(layout, layouts)
                    }
                >
                    <div key="1">
                        <div className="border bg-light h-100 p-3">
                            <DynamicXMLViewer onSelection={selectedZone} setSelection={setSelectedZone}
                                              currentPage={filesInfo ? filesInfo[currentPage - 1] : ''}
                                              setAnnoZones={setAnnoZones}/>
                        </div>
                    </div>
                    <div key="2">
                        <div className="border bg-light h-100 p-3">
                            <AnnotationContainer onSelection={selectedZone} setSelection={setSelectedZone}
                                                 currentPage={filesInfo ? filesInfo[currentPage - 1] : ''}
                                                 annoZones={annoZones}/>
                        </div>
                    </div>

                </ResponsiveGridLayout>
                <CustomPagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                                  totalPages={filesInfo ? filesInfo.length : 0}/>
            </Container>

        </Fragment>
    )
}