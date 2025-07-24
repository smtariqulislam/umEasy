import DeleteTitleButton from "../../../../../components/button/DeleteTitleButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import { format } from "date-fns";
import ThreeYearTargetEdit from "./ThreeYearTargetEdit";

const ThreeYearTargetList = ({ id, status }) => {
	const {
		data: list,
		error,
		isLoading,
		isError,
		refetch,
	} = useGetData("userMeeting", `/threeYearTarget/list/${id}`);

	if (isLoading) return <HashLoading />;

	if (isError) return <Error message={error.message} />;

	return (
		<div className="grid gap-2">
			{list.data.length > 0 &&
				list.data.map((item, i) => (
					<div key={i} className="grid gap-2 text-sm text-gray-700">
						<div>
							<span className="font-bold">Future Date:</span>{" "}
							{format(new Date(item.futureDate), "dd/MMM/yyyy")}
						</div>
						<div>
							<span className="font-bold">Revenue:</span> {item.revenue}
						</div>
						<div>
							<span className="font-bold">Profit:</span> {item.profit}
						</div>
						<div>
							<span className="font-bold">Measurables:</span>{" "}
							<div dangerouslySetInnerHTML={{ __html: item.measurable }}></div>
						</div>
						<div>
							<span className="font-bold">What Does It Look Like:</span>{" "}
							<div
								dangerouslySetInnerHTML={{ __html: item.whatDoesItLookLike }}
							></div>
						</div>
						<div className="flex space-x-2">
							{status === "Final" ? (
								<></>
							) : (
								<>
									<ThreeYearTargetEdit id={item.threeYearId} />
									<DeleteTitleButton
										path={`/threeYearTarget/delete/${item.threeYearId}`}
										action={refetch}
									/>
								</>
							)}
						</div>
					</div>
				))}
		</div>
	);
};

export default ThreeYearTargetList;
