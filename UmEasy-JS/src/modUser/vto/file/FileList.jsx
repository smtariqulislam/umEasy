/* eslint-disable react/prop-types */
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import DeleteButton from "../../../components/button/DeleteButton";
import TaskButton from "../../../components/button/TaskButton";
import FolderEdit from "../folder/FolderEdit";

const FileList = ({ data, refetch }) => {
  return (
    <div className="list-wrapper mt-1">
      <div className="md:grid grid-cols-5 list-header">
        <ListHeader label="Folder Name" />
        <ListHeader label="File Name" />
        <ListHeader label="Status" />
        <ListHeader label="Name" />
        <ListHeader label="" />
      </div>

      {data.length > 0 ? (
        data.map((item, i) => (
          <div key={i}>
            <div className="grid grid-cols-1 md:grid-cols-5 list-body">
              <ListCol label="Folder Name:" value={item.folderName} />
              <ListCol label="File Name:" value={item.fileName} />
              <ListCol label="Status:" value={item.status} />
              <ListCol label="Name:" value={item.fullName} />
              <div className="flex justify-end space-x-2">
                {item.fileId !== null &&
                  item.fileId !== 0 &&
                  item.fileId !== "" && (
                    <TaskButton path={`/vto/file/${item.fileId}`} />
                  )}
                <FolderEdit id={item.folderId} />
                <DeleteButton
                  action={refetch}
                  path={`/vtoFolder/Delete/${item.folderId}`}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-4">No folder and file available</div>
      )}

      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">TOTAL: {data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default FileList;
