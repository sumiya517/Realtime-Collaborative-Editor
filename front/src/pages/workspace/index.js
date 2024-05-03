import React, { useEffect, useState } from "react";
import "./index.scss";
import Container from "../../components/container";
import Layout from "../../layouts/layout";
import { useLocation, useParams } from "react-router-dom";
import { useGetWorkspaceByIdQuery, useUpdateWorkspaceMutation } from "../../redux/workspcaeSlice/workspaceSlice";
import Loader from "../../components/loader";

const Workspace = () => {
    // const [containers, setContainers] = useState(["", "", "", ""]);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("Untitled");
    const [active, setActive] = useState("rgb(223, 255, 0)");

    // const [stickynotes, setStickynotes] = useState([
    //     {
    //         color: "rgb(223, 255, 0)",
    //         coordinates: {
    //             x: "",
    //             y: "",
    //             height: "",
    //             width: "",
    //         }
    //     }
    // ]);
    // const [containers, setContainers] = useState([
    //     {
    //         owner: "",
    //         stickyNotes: [stickynotes]
    //     }
    // ]);
    const colors = [
        "rgb(223, 255, 0)",
        "rgb(252, 242, 129)",
        "rgb(255, 127, 80)",
        "rgb(254, 187, 190)",
        "rgb(159, 226, 191)",
        "rgb(64, 224, 208)",
        "rgb(135, 206, 250)",
        "rgb(204, 204, 255)",
    ];



    const { id } = useParams();
    const { data, isLoading, isError, isSuccess } = useGetWorkspaceByIdQuery(id);
    const [updateWorkspace] = useUpdateWorkspaceMutation();
    const [workspace, setWorkspace] = useState(data ? data :
        {

            title: "Untitled",
            theme: "",
            containers: [
                {
                    owner: "",
                    stickyNotes: [
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: 27,
                                y: 27,
                                height: "",
                                width: "",
                            }
                        },
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: 27,
                                y: 150,
                                height: "",
                                width: "",
                            }
                        }
                    ]
                },
                {
                    owner: "",
                    stickyNotes: [
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: 27,
                                y: 27,
                                height: "",
                                width: "",
                            }
                        },
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: 25,
                                y: 150,
                                height: "",
                                width: "",
                            }
                        }
                    ]
                },
                {
                    owner: "",
                    stickyNotes: [
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: "",
                                y: "",
                                height: "",
                                width: "",
                            }
                        },
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: "",
                                y: "",
                                height: "",
                                width: "",
                            }
                        }
                    ]
                },
                {
                    owner: "",
                    stickyNotes: [
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: "",
                                y: "",
                                height: "",
                                width: "",
                            }
                        },
                        {
                            color: "rgb(223, 255, 0)",
                            coordinates: {
                                x: "",
                                y: "",
                                height: "",
                                width: "",
                            }
                        }
                    ]
                }
            ],
            createdBy: ""
        }
    );

    const handleInputChange = (e) => {
        let updatedWorkspace = workspace.title;
        updatedWorkspace = e.target.value
        setWorkspace({
            ...workspace,
            title: updatedWorkspace
        });
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveName = () => {
        setName(workspace.title);
    };

    const handleColor = (index, value) => {

        const updatedContainers = [...workspace.containers];
        updatedContainers[index].stickyNotes.map((sticky) => {
            sticky.color = value
        })
        setWorkspace({
            ...workspace,
            containers: updatedContainers
        });
    }

    const handleOwner = (value, index) => {
        console.log(index);
        const updatedContainers = [...workspace.containers];
        console.log(updatedContainers[index].owner,value);
        updatedContainers[index].owner = value
        setWorkspace({
            ...workspace,
            containers: updatedContainers
        });
    };

    const handleDeleteContainer = (index) => {
        console.log(index);
        if (workspace.containers.length > 2) {
            const updatedContainers = workspace.containers.filter((item, i) => index !== i);
            setWorkspace({...workspace, containers: updatedContainers});
        }
        else {
            console.log('at least two containers are needed!');
        }

    }
    const handleAddContainer = () => {
        if (workspace.containers.length < 4) {
            const updatedContainers = [...workspace.containers, ""];
            // setContainers(updatedContainers)
        }
        else {
            console.log('at most four containers are allowed!');
        }
    }

    const handleSubmit = async () => {
        console.log(workspace);
        await updateWorkspace({ data: workspace, id: id })
    }

    console.log('workspace', workspace)
    useEffect(() => {
        if (data && !isLoading) {
            setWorkspace({
                ...workspace,
                title: data.title,
                theme: data.theme,
                createdBy: data.createdBy
            });
        }
    }, [id, data])

    return (
        <Layout>
            {isLoading && <Loader />}
            {!isLoading &&
                <div className="p-workspace">
                    <div
                        className={
                            name == "Untitled" ? "p-workspace__header--notsaved" : "p-workspace__header"
                        }
                    >
                        {isEditing ? (
                            <input
                                className="p-workspace__header-name"
                                type="text"
                                value={workspace?.title}
                                onChange={(e) => handleInputChange(e)}
                                onBlur={handleBlur}
                                autoFocus
                            />
                        ) : (
                            <span className="p-workspace__header-name">{workspace.title ? workspace.title : 'Untitled'}</span>
                        )}
                        <div className="p-workspace__header-right">
                            <img
                                className="p-workspace__header-edit"
                                src="/icons/edit-black.png"
                                onClick={handleEditClick}
                            />
                            <img
                                className="p-workspace__header-save"
                                src="/icons/tick-circle-green.png"
                                onClick={handleSaveName}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            workspace?.theme == "temp-col"
                                ? "p-workspace__body"
                                : "p-workspace__body--row"
                        }
                    >
                        {workspace?.containers?.map((container, i) => (
                            <Container
                                template={workspace?.theme}
                                width={
                                    workspace.containers.length == 4 ? 22 : workspace.containers.length == 3 ? 30 : 45
                                }
                                handleDelete={() => handleDeleteContainer(i)}
                                handleOwner={(e) => { handleOwner(e.target.value, i) }}
                                owner={container?.owner}
                                stickynotes={container.stickyNotes}
                                color={container.stickyNotes}
                                colors={colors}
                                active={active}
                                onClick={(e) => {
                                    handleColor(i, e.target.style.backgroundColor)
                                }}
                            />
                        ))}
                    </div>
                    <div className="p-workspace__footer">
                        <div className="p-workspace__header-add" onClick={() => handleAddContainer()}>
                            <img src="/icons/add-container.png" />
                            Add Container
                        </div>
                        <div className='p-workspace__profile-share' onClick={() => handleSubmit()}>
                            <img src='/icons/user-add.png' />
                            Share
                        </div>
                    </div>
                </div>
            }
        </Layout>
    );
};

export default Workspace;
