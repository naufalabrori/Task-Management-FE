import { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderForm from "../../components/molecules/TaskHeader/header-form";
import TableDetail from "../../components/molecules/TaskDetail/table-detail";

function TaskDetail() {
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  return (
    <>
      <div className="text-2xl font-bold w-full my-3 flex justify-center">
        TASK MANAGEMENT SYSTEM
      </div>

      <HeaderForm id={id} loading={load} />

      <TableDetail headerId={id} loading={load} setLoad={setLoad} />
    </>
  );
}

export default TaskDetail;
