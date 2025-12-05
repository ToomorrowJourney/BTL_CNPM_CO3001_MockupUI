import React, { useState, useEffect } from "react";
import './FeedbackView.css';
import {
	Star,
	MessageSquare,
	Send,
	CheckCircle,
	User,
	Calendar,
} from "lucide-react";
import {
	submitCourseFeedback,
	getCourseFeedback,
} from "../../services/mockData";

// Rating labels
const RATING_LABELS = [
	"Poor",
	"Fair",
	"Good",
	"Very Good",
	"Excellent",
];

// Constants
const MOCK_STUDENT_ID = "2569004";
const RATING_SCALE = [1, 2, 3, 4, 5];



/**
 *** Component FeedbackView
 *** Hiển thị form gửi feedback cho sinh viên và tổng hợp feedback cho giáo viên
 **/
const FeedbackView = ({ courseId, userRole }) => {
	// State for Tutor view
	const [feedbacks, setFeedbacks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// State for Student view
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [hoverRating, setHoverRating] = useState(0);

	/**
	 * Load feedbacks for Tutors
	 */
	useEffect(() => {
		if (userRole === "Tutor") {
			const loadFeedbacks = async () => {
				setIsLoading(true);
				try {
					const data = await getCourseFeedback(courseId);
					setFeedbacks(data);
				} catch (error) {
					console.error("Failed to load feedback:", error);
				} finally {
					setIsLoading(false);
				}
			};
			loadFeedbacks();
		}
	}, [courseId, userRole]);

	/**
	 * Handle feedback submission
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (rating === 0) return;

		setIsSubmitting(true);
		try {
			await submitCourseFeedback(
				courseId,
				MOCK_STUDENT_ID,
				rating,
				comment
			);
			setSubmitSuccess(true);
			setRating(0);
			setComment("");
		} catch (error) {
			console.error("Failed to submit feedback:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	/**
	 * Get rating label by rating value
	 */
	const getRatingLabel = (ratingValue) => {
		return ratingValue > 0 && ratingValue <= RATING_LABELS.length
			? RATING_LABELS[ratingValue - 1]
			: "Select a rating";
	};

	/**
	 * Calculate average rating
	 */
	const averageRating =
		feedbacks.length > 0
			? (
					feedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
					feedbacks.length
			  ).toFixed(1)
			: 0;

	// ============ Student View ============
	if (userRole === "Student") {
		if (submitSuccess) {
			return (
				<div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
					<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
					<h3 className="text-xl font-semibold text-green-900 mb-2">
						Thank You!
					</h3>
					<p className="text-green-700">
						Your feedback has been submitted successfully.
					</p>
					<button
						onClick={() => setSubmitSuccess(false)}
						className="mt-6 text-green-600 hover:text-green-800 font-medium underline"
					>
						Submit another response
					</button>
				</div>
			);
		}

		return (
			<div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
					<MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
					Share Your Feedback
				</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Rating Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							How would you rate this course?
						</label>
						<div className="flex items-center gap-1">
							{RATING_SCALE.map((star) => (
								<button
									key={star}
									type="button"
									className="focus:outline-none transition-colors"
									onMouseEnter={() => setHoverRating(star)}
									onMouseLeave={() => setHoverRating(0)}
									onClick={() => setRating(star)}
									aria-label={`Rate ${star} stars`}
								>
									<Star
										className={`w-8 h-8 ${
											star <= (hoverRating || rating)
												? "fill-yellow-400 text-yellow-400"
												: "text-gray-300"
										} transition-colors`}
									/>
								</button>
							))}
							<span className="ml-2 text-sm text-gray-500 font-medium">
								{getRatingLabel(rating)}
							</span>
						</div>
					</div>

					{/* Comments Input */}
					<div>
						<label
							htmlFor="comment"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Additional Comments
						</label>
						<textarea
							id="comment"
							rows={4}
							className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
							placeholder="What did you like? What could be improved?"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							required
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting || rating === 0}
						className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
							isSubmitting || rating === 0
								? "opacity-50 cursor-not-allowed"
								: ""
						}`}
					>
						{isSubmitting ? (
							<>Processing...</>
						) : (
							<>
								<Send className="w-4 h-4 mr-2" />
								Submit Feedback
							</>
						)}
					</button>
				</form>
			</div>
		);
	}

	// ============ Tutor View ============
	if (isLoading) {
		return (
			<div className="animate-pulse space-y-4">
				<div className="h-24 bg-gray-200 rounded-lg"></div>
				<div className="h-24 bg-gray-200 rounded-lg"></div>
				<div className="h-24 bg-gray-200 rounded-lg"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Summary Stats */}
			<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold text-gray-900">
						Course Feedback Summary
					</h2>
					<p className="text-sm text-gray-500 mt-1">
						Based on {feedbacks.length} student responses
					</p>
				</div>
				<div className="text-right">
					<div className="flex items-center justify-end">
						<span className="text-3xl font-bold text-gray-900 mr-2">
							{averageRating}
						</span>
						<Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
					</div>
					<p className="text-xs text-gray-500 mt-1">Average Rating</p>
				</div>
			</div>

			{/* Feedback List */}
			<div className="space-y-4">
				{feedbacks.length === 0 ? (
					<div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
						<MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900">
							No Feedback Yet
						</h3>
						<p className="text-gray-500 mt-2">
							Students haven't submitted any feedback for this
							course yet.
						</p>
					</div>
				) : (
					feedbacks.map((fb) => (
						<div
							key={fb.id}
							className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
						>
							<div className="flex items-start justify-between mb-2">
								<div className="flex items-center">
									<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
										<User className="w-4 h-4 text-blue-600" />
									</div>
									<div>
										<p className="text-sm font-medium text-gray-900">
											Student ID: {fb.studentId}
										</p>
										<p className="text-xs text-gray-500 flex items-center">
											<Calendar className="w-3 h-3 mr-1" />
											{new Date(
												fb.createdAt
											).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
									<span className="text-sm font-bold text-yellow-700 mr-1">
										{fb.rating}
									</span>
									<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
								</div>
							</div>
							<div className="mt-3 pl-11">
								<p className="text-gray-700 text-sm leading-relaxed">
									{fb.comments}
								</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default FeedbackView;

