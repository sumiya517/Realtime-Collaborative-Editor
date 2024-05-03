import React, { useEffect, useState } from 'react';
import './index.scss';
import WorkspaceCard from '../../components/workspaceCard';
import AddNewWorkspace from '../../components/addNewWorkspace';
import TemplateModal from '../../components/templateModal';
import Layout from '../../layouts/layout';
import { useNavigate } from 'react-router-dom';
import { useGetWorkspacesQuery } from '../../redux/workspcaeSlice/workspaceSlice';

const Dashboard = () => {
    const { data } = useGetWorkspacesQuery();
    const [isModal, setIsModal] = useState(false);
    const [allWorkspaces, setAllWorkspaces] = useState(data?.results);
    const navigate = useNavigate();
    const handleSelectTemplate = () => {
        setIsModal(true)
    }

    const handleCloseModal = () => {
        setIsModal(false)
    }
    const handleClickWorkspace = (id, template) => {
        navigate(`/workspace/${id}`);
    }

    useEffect(() => {
        if (data) {
            setAllWorkspaces(data);
        }
    }, [data]);
    console.log(data);

    return (

        <Layout>
            <div className="p-dashboard">
                <AddNewWorkspace onClick={handleSelectTemplate} />
                {isModal && <TemplateModal onClose={handleCloseModal} />}
                {allWorkspaces?.map((workspace) =>
                    <WorkspaceCard onClick={() => handleClickWorkspace(workspace._id, workspace.theme)} workspaceId={workspace._id} theme={workspace.theme}/>
                )}

                {/* <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard /> */}
            </div>
        </Layout>

    );
};

export default Dashboard;
