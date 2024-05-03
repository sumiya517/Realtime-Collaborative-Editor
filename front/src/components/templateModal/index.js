import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useAddWorkspaceMutation } from "../../redux/workspcaeSlice/workspaceSlice";

const TemplateModal = ({ onClose }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const [addWorkspace, isSuccess] = useAddWorkspaceMutation();
  const [workspace,setWorkspace] =useState({});
  const templates = [
    {
      value: 'temp-col',
      img: '/icons/template-col.png',
      imgActive: '/icons/template-col-active.png'
    },
    {
      value: 'temp-row',
      img: '/icons/template-row.png',
      imgActive: '/icons/template-row-active.png'
    }
  ]
  const [template, setTemplate] = useState();

  const handleCreateWorkshop = async (tem) => {
    setTemplate(tem)
    const form = {
      'theme': tem,
      'createdBy': JSON.parse(user).id
    };
    setWorkspace(await addWorkspace(form));
  }

  console.log(workspace);
  // useEffect(() => {
  //   if (template) {
  //     setTimeout(() => {
  //       navigate('/workspace/create', { state: { template: template.value } });
  //     }, 300);
  //   }
  // }, [template, navigate]);

  useEffect(()=>{
    if (isSuccess && workspace?.data?._id){
      navigate(`/workspace/${workspace.data._id}`, { state: { template: workspace.data.theme }})
    }
  },[isSuccess, workspace]);

  return (
    <div className="c-modal">
      <div className="c-modal__section">
        <div className="c-modal__header">
          <span className="c-modal__header-text">Add a template</span>
          <img
            src="/icons/close.png"
            className="c-modal__close-button"
            onClick={onClose}
          />
        </div>
        <div className="c-modal__layouts">
          <span className="c-modal__layout-text">Choose Layout</span>
          <div className="c-modal__options">
            {templates?.map((tem) =>
              <div className="c-modal__option" onClick={() => handleCreateWorkshop(tem.value)}>
                <img src={template?.value === tem?.value ? tem?.imgActive : tem?.img} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
