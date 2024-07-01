/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TableDetail({ headerId, loading, setLoad }) {
  const [taskDetail, setTaskDetail] = useState([]);
  const [headerData, setHeaderData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTicked, setIsModalTicked] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const listDetail = () => {
    axios
      .get(
        `http://localhost:8000/api/TaskDetail?task_header_id=${headerId}&is_active=1`
      )
      .then((response) => {
        setTaskDetail(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const headerDataAPI = () => {
    axios
      .get(`http://localhost:8000/api/TaskHeader/${headerId}`)
      .then((response) => {
        setHeaderData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    listDetail();
    headerDataAPI();
  }, [loading]);

  const deleteTaskDetail = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };

  const toggleModal = (confirm) => {
    if (confirm) {
      axios
        .delete(`http://localhost:8000/api/TaskDetail/${idDelete}`)
        .then(() => {
          setLoad(!loading);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsModalOpen(false);
  };

  const tickedTask = (id) => {
    setIdDelete(id);
    setIsModalTicked(true);
  };

  const toggleTicked = (confirm) => {
    if (confirm) {
      axios
        .post(`http://localhost:8000/api/TaskDetail/ticked/${idDelete}`, {
          _method: "PUT",
        })
        .then(() => {
          setLoad(!loading);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsModalTicked(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this sub task?
                </h3>
                <button
                  onClick={() => toggleModal(true)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {"Yes, I'm sure"}
                </button>
                <button
                  onClick={() => toggleModal(false)}
                  type="button"
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalTicked && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => toggleTicked(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure to complete this sub task?
                </h3>
                <button
                  onClick={() => toggleTicked(true)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes
                </button>
                <button
                  onClick={() => toggleTicked(false)}
                  type="button"
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {headerData?.status === "Complete" ? null : (
        <Link to={`/detail/${headerId}/new`}>
          <button
            type="button"
            className="px-4 ml-20 mb-2 py-1 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm"
          >
            New Sub Task
          </button>
        </Link>
      )}
      <div className="relative overflow-x-auto">
        <table className="w-11/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white font-bold uppercase bg-blue-600">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/12">
                Check
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Task
              </th>
              <th scope="col" className="px-6 py-3 w-1/6 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskDetail &&
              taskDetail.map((detail) => (
                <tr
                  key={detail?.id}
                  className="bg-blue-white hover:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 text-black"
                >
                  <td className="px-6 py-2">
                    <input
                      checked={detail.is_ticked}
                      id="checked-checkbox"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onClick={
                        !detail.is_ticked ? () => tickedTask(detail.id) : null
                      }
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {detail?.sub_task_name}
                  </th>
                  <td>
                    {detail.is_ticked ? (
                      ""
                    ) : (
                      <div className="flex justify-between mx-8">
                        <div className="hover:cursor-pointer ml-4 mt-1">
                          <Link to={`/detail/${headerId}/edit/${detail.id}`}>
                            <button
                              type="button"
                              className="w-16 mb-2 py-1 px-2 focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 font-medium rounded-lg text-sm"
                            >
                              Update
                            </button>
                          </Link>
                        </div>
                        <div className="hover:cursor-pointer ml-4 mt-1">
                          <button
                            type="button"
                            className="w-16 mb-2 py-1 px-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm"
                            onClick={() => deleteTaskDetail(detail.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link to={"/"}>
          <button
            type="button"
            className="w-20 mt-4 ml-16 py-2 px-4 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 font-medium rounded-md text-sm"
          >
            Back
          </button>
        </Link>
      </div>
    </>
  );
}

export default TableDetail;
