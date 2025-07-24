import DeleteSmallButton from "../../../../../components/button/DeleteSmallButton";
import Error from "../../../../../components/Error";

import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";

import MarketingStrageEdit from "./MarketingStrageEdit";

const MarketingStrageList = ({ id, status }) => {
	const {
		data: list,
		error,
		isLoading,
		isError,
		refetch,
	} = useGetData("userMeeting", `/MarketingStrategy/list/${id}`);

	if (isLoading) return <HashLoading />;

	if (isError) return <Error message={error.message} />;

	return (
		<div className="grid gap-10">
			{list.data.length > 0 &&
				list.data.map((item, i) => (
					<div
						key={i}
						className="flex justify-between items-center rounded-md cursor-pointer"
					>
						<div className="grid gap-2">
							<div>
								<div className="font-bold">Target Market/"The List":</div>
								<div
									dangerouslySetInnerHTML={{ __html: item.targetMarketName }}
								></div>
							</div>
							{/* <div>
                <span className="font-bold">Uniques1:</span> {item.uniques1}
              </div>
              <div>
                <span className="font-bold">Uniques2:</span> {item.uniques2}
              </div>
              <div>
                <span className="font-bold">Uniques3:</span> {item.uniques3}
              </div> */}
							<div>
								<span className="font-bold">3 Uniques:</span>
								<ol className="list-decimal ml-5">
									<li>{item.uniques1}</li>
									<li>{item.uniques2}</li>
									<li>{item.uniques3}</li>
								</ol>
							</div>
							<div>
								<span className="font-bold">Proven Process:</span>{" "}
								{item.provenProcess}
							</div>
							<div>
								<span className="font-bold">Guarantee:</span>{" "}
								{item.systemPromise}
							</div>
						</div>
						<div className="flex space-x-2">
							{status === "Final" ? (
								<></>
							) : (
								<>
									<MarketingStrageEdit id={item.marketingStrategyId} />
									<DeleteSmallButton
										path={`/MarketingStrategy/delete/${item.marketingStrategyId}`}
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

export default MarketingStrageList;
