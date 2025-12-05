import React from "react";
import './TeachingPlanView.css';
import {
	Calendar,
	Download,
	FileText,
	CheckCircle,
	Clock,
	XCircle,
} from "lucide-react";
// Status badge configuration
const STATUS_CONFIG = {
	completed: {
		icon: CheckCircle,
		colors: "bg-green-100 text-green-800",
		label: "Completed",
	},
	scheduled: {
		icon: Clock,
		colors: "bg-blue-100 text-blue-800",
		label: "Scheduled",
	},
	cancelled: {
		icon: XCircle,
		colors: "bg-red-100 text-red-800",
		label: "Cancelled",
	},
};



/**
 *** Component Loading Skeleton
 **/
const TeachingPlanLoadingSkeleton = () => (
	<div className="animate-pulse space-y-6">
		<div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
		<div className="h-96 bg-gray-200 rounded-lg"></div>
	</div>
);

/**
 *** Component Trạng thái trống
 **/
const EmptyTeachingPlan = () => (
	<div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
		<Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
		<h3 className="text-lg font-medium text-gray-900">
			No Teaching Plan Available
		</h3>
		<p className="text-gray-500 mt-2">
			The teaching plan for this semester has not been uploaded yet.
		</p>
	</div>
);

/**
 *** Component Status Badge
 **/


const StatusBadge = ({ status }) => {
	const config =
		status in STATUS_CONFIG
			? STATUS_CONFIG[status]
			: null;

	if (!config) {
		return (
			<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
				{status}
			</span>
		);
	}

	const IconComponent = config.icon;
	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.colors}`}
		>
			<IconComponent className="w-3 h-3 mr-1" />
			{config.label}
		</span>
	);
};

/**
 *** Component TeachingPlanView
 *** Hiển thị kế hoạch giảng dạy với lịch trình buổi học và tài liệu
 **/
const TeachingPlanView = ({
	teachingPlan,
	isLoading,
}) => {
	if (isLoading) {
		return <TeachingPlanLoadingSkeleton />;
	}

	if (!teachingPlan) {
		return <EmptyTeachingPlan />;
	}

	return (
		<div className="space-y-8">
			{/* Semester Header */}
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900">
					Semester: {teachingPlan.semester}
				</h2>
				<span className="text-sm text-gray-500">
					Last Updated:{" "}
					{new Date(teachingPlan.lastUpdated).toLocaleDateString()}
				</span>
			</div>

			{/* Sessions Table */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Session / Week
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Date
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Topic
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Activities
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Materials / Assignments
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{teachingPlan.sessions.map((session) => (
								<tr
									key={session.sessionNumber}
									className="hover:bg-gray-50 transition-colors"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										#{session.sessionNumber}
										<span className="text-gray-400 mx-1">
											/
										</span>
										W{session.week}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{new Date(
											session.date
										).toLocaleDateString(undefined, {
											weekday: "short",
											month: "short",
											day: "numeric",
										})}
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs">
										{session.topic}
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">
										<div className="flex flex-wrap gap-1">
											{session.activities.map(
												(activity, idx) => (
													<span
														key={idx}
														className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
													>
														{activity}
													</span>
												)
											)}
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">
										<div className="space-y-1">
											{session.materials &&
												session.materials.length >
													0 && (
													<div className="text-xs">
														<span className="font-semibold text-gray-700">
															Materials:
														</span>
														<ul className="list-disc list-inside text-gray-600">
															{session.materials.map(
																(mat, idx) => (
																	<li
																		key={
																			idx
																		}
																		className="truncate max-w-[150px]"
																	>
																		{mat}
																	</li>
																)
															)}
														</ul>
													</div>
												)}
											{session.assignments &&
												session.assignments.length >
													0 && (
													<div className="text-xs mt-1">
														<span className="font-semibold text-orange-700">
															Assignments:
														</span>
														<ul className="list-disc list-inside text-orange-600">
															{session.assignments.map(
																(
																	assign,
																	idx
																) => (
																	<li
																		key={
																			idx
																		}
																		className="truncate max-w-[150px]"
																	>
																		{assign}
																	</li>
																)
															)}
														</ul>
													</div>
												)}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<StatusBadge status={session.status} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Plan Documents Section */}
			{teachingPlan.planDocuments &&
				teachingPlan.planDocuments.length > 0 && (
					<section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
						<h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
							<Download className="w-5 h-5 mr-2 text-blue-600" />
							Plan Documents
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{teachingPlan.planDocuments.map((doc) => (
								<div
									key={doc.id}
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
								>
									<div className="flex items-center overflow-hidden">
										<FileText className="w-8 h-8 text-blue-500 mr-3 flex-shrink-0" />
										<div className="min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate">
												{doc.fileName}
											</p>
											<p className="text-xs text-gray-500">
												{(doc.fileSize / 1024).toFixed(
													1
												)}{" "}
												KB •{" "}
												{new Date(
													doc.uploadedAt
												).toLocaleDateString()}
											</p>
										</div>
									</div>
									<a
										href={doc.fileUrl}
										className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-100 transition-colors flex-shrink-0"
										title="Download"
										download
									>
										<Download className="w-5 h-5" />
									</a>
								</div>
							))}
						</div>
					</section>
				)}
		</div>
	);
};

export default TeachingPlanView;

