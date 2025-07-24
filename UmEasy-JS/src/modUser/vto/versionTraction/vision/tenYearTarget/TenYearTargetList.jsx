import DeleteSmallButton from "../../../../../components/button/DeleteSmallButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import TenYearTargetEdit from "./TenYearTargetEdit";

const TenYearTargetList = ({ id, status }) => {
	const {
		data: list,
		error,
		isLoading,
		isError,
		refetch,
	} = useGetData("userMeeting", `/TenYearsTarget/list/${id}`);

	if (isLoading) return <HashLoading />;

	if (isError) return <Error message={error.message} />;

	return (
		<div className="grid gap-2">
			{list.data.length > 0 &&
				list.data.map((item, i) => (
					<div key={i} className="flex justify-between">
						<span>{item.tenYearsTargetName} : </span>
						<div dangerouslySetInnerHTML={{ __html: item.note }}></div>
						<div className="flex space-x-2">
							{status === "Final" ? (
								<></>
							) : (
								<>
									<TenYearTargetEdit id={item.tenYearsTargetId} />
									<DeleteSmallButton
										path={`/TenYearsTarget/delete/${item.tenYearsTargetId}`}
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

export default TenYearTargetList;
