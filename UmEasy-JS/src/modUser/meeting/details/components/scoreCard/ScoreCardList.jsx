import { useState } from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import ScoreCardAdd from "./ScoreCardAdd";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import RamdomButton from "../../../../../components/button/RamdomButton";
import ScoreCardEdit from "./ScoreCardEdit";

const ScoreCardList = ({ id, issues, refetch }) => {
  const [query, setQuery] = useState("");

  const departmentName = [...new Set(issues.map((x) => x.departmentName))];

  const { mutateAsync } = usePostData();

  const displayData =
    issues.length > 0
      ? issues.filter((item) =>
        query
          ? item.departmentName.toLowerCase() === query.toLowerCase()
          : true
      )
      : [];

  const InputCell = ({ item, columnName, placeholder }) => {
  const initialValue = item[columnName] || "";
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (newValue) => {
    console.log("Updating cell...");
    const data = new FormData();
    data.append("scoreCardId", item.scoreCardId);
    data.append("columnName", columnName);
    data.append("newValue", newValue);

    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const { status } = await mutateAsync({
        path: "ScoreCard/update",
        formData: data,
      });
      if (status === 201) toast.success("Saved successfully!");
      if (status === 204) toast.success("Update successful!");
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error : " + error.message);
      }
    }
  };

  if (
    columnName === "departmentName" ||
    columnName === "particular" ||
    columnName.toLowerCase().includes("variance")
  ) {
    return (
      <h6 className="w-full min-w-[100px] p-1 mt-2 text-black bg-transparent text-wrap">
        {value === 0
          ? "0"
          : typeof value === "number"
            ? value.toLocaleString(undefined, { minimumFractionDigits: 2 })
            : value || "0"}
      </h6>
    );
  }

  return (
    <input
      type="text"
      value={
        isEditing
          ? value
          : value === ""
            ? ""
            : Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })
      }
      onFocus={() => setIsEditing(true)}
      onBlur={() => {
        setIsEditing(false);
        const numericValue = parseFloat(value.toString().replace(/,/g, ""));
        if (!isNaN(numericValue) && numericValue !== Number(initialValue)) {
          setValue(numericValue);
          handleUpdate(numericValue);
        }
      }}
      onChange={(e) => {
        const raw = e.target.value.replace(/,/g, "");
        if (/^\d*\.?\d*$/.test(raw)) {
          setValue(raw);
        }
      }}
      className="w-full min-w-[130px] min-h-[40px] p-2 text-center text-black bg-transparent border border-transparent hover:border-gray-400 focus:border-blue-500 rounded-md outline-none"
      placeholder={`Enter ${placeholder}`}
      inputMode="decimal"
      onWheel={(e) => e.target.blur()}
    />
  );
};
  // console.log(displayData, "DD");

  return (
    <>
      <div className="">
        <div className="flex justify-between px-0 py-2 items-center">
          <h1 className="text-xl lg:text-base font-bold lg:text-semibold text-gray-600 capitalize">
            ScoreCard List
          </h1>
          <ScoreCardAdd id={id} refetch={refetch} />
        </div>

        <div className="flex gap-2 flex-wrap">
          <RamdomButton data={departmentName} action={setQuery} />
        </div>
        <div className="overflow-auto h-80 border-2 border-gray-300 mt-4">
          <table className="table-auto border-collapse rounded-md text-xs w-full">
            <thead className="bg-gray-300 text-primary sticky top-0 z-20">
              <tr className="text-center">
                <th className="p-4 transform whitespace-nowrap text-center flex w-20 sticky left-0 bg-gray-300 z-30"></th>

                <th className="p-2 transform whitespace-nowrap text-center sticky left-20 bg-gray-300 z-30 w-28">
                  Department
                </th>
                <th className="p-2 transform whitespace-nowrap text-center sticky left-48 bg-gray-300 z-30 w-28">
                  Particular
                </th>
                <th className="p-2 text-center whitespace-nowrap">Q1 Budget</th>
                <th className="p-2 text-center whitespace-nowrap">Q1 Actual</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Q1 Variance
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jan Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jan Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jan Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  Feb Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Feb Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Feb Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  Mar Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Mar Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Mar Variance
                </th>
                <th className="p-2 text-center whitespace-nowrap">Q2 Budget</th>
                <th className="p-2 text-center whitespace-nowrap">Q2 Actual</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Q2 Variance
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Apr Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Apr Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Apr Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  May Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  May Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  May Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  Jun Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jun Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jun Variance
                </th>
                <th className="p-2 text-center whitespace-nowrap">Q3 Budget</th>
                <th className="p-2 text-center whitespace-nowrap">Q3 Actual</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Q3 Variance
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jul Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jul Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Jul Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  Aug Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Aug Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Aug Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  Sep Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Sep Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Sep Variance
                </th>
                <th className="p-2 text-center whitespace-nowrap">Q4 Budget</th>
                <th className="p-2 text-center whitespace-nowrap">Q4 Actual</th>
                <th className="p-2 text-center whitespace-nowrap">
                  Q4 Variance
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Oct Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Oct Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Oct Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  Nov Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Nov Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Nov Variance
                </th>

                <th className="p-2 text-center whitespace-nowrap">
                  Dec Budget
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Dec Actual
                </th>
                <th className="p-2 text-center whitespace-nowrap">
                  Dec Variance
                </th>

                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, i) => (
                <tr key={i} className="odd:bg-gray-100 even:bg-gray-200">
                  <td className="p-2 flex justify-between space-x-2 align-top text-center sticky left-0 z-10 bg-[inherit] w-20">
                    <DeleteButton
                      action={refetch}
                      path={`/ScoreCard/delete/${item.scoreCardId}`}
                      btnClass="btn-danger w-8 h-8"
                    />
                    <ScoreCardEdit
                      item={item}
                      refetch={refetch}
                      btnClass="btn-sky w-8 h-8"
                    />
                  </td>

                  <td className="p-2 align-top text-center sticky left-20 z-10 w-28 bg-[inherit] overflow-hidden">
                    <InputCell
                      item={item}
                      columnName="departmentName"
                      placeholder="Department"
                    />
                  </td>
                  <td className="p-2 align-top text-center sticky left-48 z-10 w-28 bg-[inherit] overflow-hidden">
                    <InputCell
                      item={item}
                      columnName="particular"
                      placeholder="Particular"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q1Budget"
                      placeholder="Q1 Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q1Actual"
                      placeholder="Q1 Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q1Variance"
                      placeholder="Q1 Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="janBudget"
                      placeholder="Jan Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="janActual"
                      placeholder="Jan Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="janVariance"
                      placeholder="Jan Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="febBudget"
                      placeholder="Feb Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="febActual"
                      placeholder="Feb Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="febVariance"
                      placeholder="Feb Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="marBudget"
                      placeholder="Mar Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="marActual"
                      placeholder="Mar Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="marVariance"
                      placeholder="Mar Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q2Budget"
                      placeholder="Q2 Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q2Actual"
                      placeholder="Q2 Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q2Variance"
                      placeholder="Q2 Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="aprBudget"
                      placeholder="Apr Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="aprActual"
                      placeholder="Apr Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="aprVariance"
                      placeholder="Apr Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="mayBudget"
                      placeholder="May Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="mayActual"
                      placeholder="May Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="mayVariance"
                      placeholder="May Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="junBudget"
                      placeholder="Jun Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="junActual"
                      placeholder="Jun Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="junVariance"
                      placeholder="Jun Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q3Budget"
                      placeholder="Q3 Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q3Actual"
                      placeholder="Q3 Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q3Variance"
                      placeholder="Q3 Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="julBudget"
                      placeholder="Jul Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="julActual"
                      placeholder="Jul Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="julVariance"
                      placeholder="Jul Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="augBudget"
                      placeholder="Aug Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="augActual"
                      placeholder="Aug Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="augVariance"
                      placeholder="Aug Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="sepBudget"
                      placeholder="Sep Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="sepActual"
                      placeholder="Sep Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="sepVariance"
                      placeholder="Sep Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q4Budget"
                      placeholder="Q4 Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q4Actual"
                      placeholder="Q4 Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="q4Variance"
                      placeholder="Q4 Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="octBudget"
                      placeholder="Oct Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="octActual"
                      placeholder="Oct Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="octVariance"
                      placeholder="Oct Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="novBudget"
                      placeholder="Nov Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="novActual"
                      placeholder="Nov Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="novVariance"
                      placeholder="Nov Variance"
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="decBudget"
                      placeholder="Dec Budget"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="decActual"
                      placeholder="Dec Actual"
                    />
                  </td>
                  <td className="p-2 align-top text-center">
                    <InputCell
                      item={item}
                      columnName="decVariance"
                      placeholder="Dec Variance"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ScoreCardList;
