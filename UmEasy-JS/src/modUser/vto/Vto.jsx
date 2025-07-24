import { FaFolderPlus } from "react-icons/fa6";
import FolderAdd from "./folder/FolderAdd";
import FileList from "./file/FileList";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import FileAdd from "./file/FileAdd";
// import TopMenu from "../dashboard/TopMenu";
// import FileCreatePop from "./vtoFile/FileCreatePop";

const Vto = (openModal) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userlist", "/vtofile/List");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Vision/Trasction Organizer
        </h1>
        <div className="flex space-x-2">
          <FolderAdd btn="Save" />
          <FileAdd btn="Save" />
        </div>
      </div>
      {list.data.length === 0 ? (
        <div
          onClick={openModal}
          className=" flex flex-col items-center justify-center h-screen mt-1"
        >
          <div className="flex flex-col items-center p-6 rounded-lg">
            <div className="bg-gray-100 rounded-full p-8 mb-4 flex items-center justify-center">
              <FaFolderPlus className="text-gray-400 text-6xl" />
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Create Your First Folder
            </h2>

            <div className="text-gray-500 text-center">
              Within this folder, you can create your first Vision and Traction
              Organizer.
            </div>
          </div>
        </div>
      ) : (
        <FileList data={list.data} refetch={refetch} />
      )}
    </div>
  );
};

export default Vto;
