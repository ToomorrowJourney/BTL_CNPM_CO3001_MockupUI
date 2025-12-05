import React from "react";
import { Book, Users, GraduationCap } from "lucide-react";
import './CourseCard.css';

// Constants for category configurations
const CATEGORY_CONFIG = {
	Programming: {
		icon: Book,
		color: "from-blue-500 to-blue-600",
	},
	"Software Engineering": {
		icon: GraduationCap,
		color: "from-purple-500 to-purple-600",
	},
	Database: {
		icon: Book,
		color: "from-green-500 to-green-600",
	},
	"AI & Machine Learning": {
		icon: GraduationCap,
		color: "from-pink-500 to-pink-600",
	},
	Networks: {
		icon: Users,
		color: "from-orange-500 to-orange-600",
	},
	default: {
		icon: Book,
		color: "from-gray-500 to-gray-600",
	},
};



/**
 *** Component CourseCard
 *** Hiển thị thẻ khóa học với category, tiêu đề, mô tả và metadata
 **/
const CourseCard = ({
	course,
	onClick,
	userRole,
}) => {
	/**
	 * Get category icon component
	 */
	const getCategoryIcon = (category) => {
		const config =
			category && category in CATEGORY_CONFIG
				? CATEGORY_CONFIG[category]
				: CATEGORY_CONFIG.default;
		const IconComponent = config.icon;
		return <IconComponent className="w-8 h-8 text-white" />;
	};

	/**
	 * Get category gradient color
	 */
	const getCategoryColor = (category) => {
		if (category && category in CATEGORY_CONFIG) {
			return CATEGORY_CONFIG[category]
				.color;
		}
		return CATEGORY_CONFIG.default.color;
	};

	const categoryColor = getCategoryColor(course.category);

	return (
		<div
			onClick={onClick}
			className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden group"
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClick();
				}
			}}
		>
			{/* Thumbnail/Icon Header */}
			<div
				className={`aspect-video bg-gradient-to-br ${categoryColor} flex items-center justify-center`}
			>
				{getCategoryIcon(course.category)}
			</div>

			{/* Content */}
			<div className="p-4 space-y-2">
				{/* Course Code */}
				<div className="text-sm font-semibold text-hcmut-blue">
					{course.code}
				</div>

				{/* Course Name */}
				<h3 className="text-lg font-bold text-gray-900 group-hover:text-hcmut-blue transition-colors line-clamp-2">
					{course.name}
				</h3>

				{/* Description */}
				<p className="text-sm text-gray-600 mb-3 line-clamp-2">
					{course.description}
				</p>

				{/* Metadata */}
				<div className="flex items-center justify-between text-xs text-gray-500">
					<div className="flex items-center gap-1">
						<Book className="w-4 h-4" />
						<span>{course.credits || 3} Credits</span>
					</div>

					{userRole === "Tutor" && course.enrolledStudents && (
						<div className="flex items-center gap-1">
							<Users className="w-4 h-4" />
							<span>
								{course.enrolledStudents.length} Students
							</span>
						</div>
					)}
				</div>

				{/* Category Badge */}
				{course.category && (
					<div className="mt-3">
						<span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
							{course.category}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseCard;

