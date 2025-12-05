/**
 *** Các hàm tiện ích
 *** Các hàm helper được sử dụng trong toàn bộ ứng dụng
 **/

import { RATING_LABELS } from '../constants/appConstants';

/**
 *** Định dạng kích thước file từ bytes sang dạng dễ đọc
 *** @param bytes - Kích thước file tính bằng bytes
 *** @returns Chuỗi kích thước file đã format (ví dụ: "2.5 KB")
 **/
export const formatFileSize = (bytes) => {
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} KB`;
};

/**
 *** Lấy nhãn đánh giá theo giá trị rating
 *** @param rating - Giá trị rating (1-5)
 *** @returns Nhãn đánh giá hoặc "Select a rating"
 **/
export const getRatingLabel = (rating) => {
  return rating > 0 && rating <= RATING_LABELS.length
    ? RATING_LABELS[rating - 1]
    : 'Select a rating';
};

/**
 *** Định dạng ngày tháng sang chuỗi ngày địa phương
 *** @param date - Đối tượng Date hoặc chuỗi
 *** @param options - Tùy chọn Intl.DateTimeFormat
 *** @returns Chuỗi ngày đã format
 **/
export const formatDate = (
  date,
  options = { year: 'numeric', month: 'long', day: 'numeric' }
) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, options);
};

/**
 *** Định dạng ngày cho hiển thị bảng (ví dụ: "Mon, Dec 2")
 *** @param date - Đối tượng Date hoặc chuỗi
 *** @returns Chuỗi ngày đã format
 **/
export const formatDateForTable = (date) => {
  return formatDate(date, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 *** Tính giá trị trung bình từ mảng số
 *** @param numbers - Mảng các số
 *** @returns Giá trị trung bình làm tròn 1 chữ số thập phân
 **/
export const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  return parseFloat(
    (numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length).toFixed(1)
  );
};

/**
 *** Tạo ID ngẫu nhiên cho dữ liệu mock
 *** @returns Chuỗi ID ngẫu nhiên
 **/
export const generateMockId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 *** Kiểm tra chuỗi có phải email hợp lệ không
 *** @param email - Chuỗi email cần kiểm tra
 *** @returns True nếu định dạng email hợp lệ
 **/
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 *** Cắt ngắn chuỗi theo độ dài chỉ định với dấu ba chấm
 *** @param str - Chuỗi cần cắt ngắn
 *** @param maxLength - Độ dài tối đa
 *** @returns Chuỗi đã cắt ngắn
 **/
export const truncateString = (str, maxLength) => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

/**
 *** Mô phỏng trễ bất đồng bộ
 *** @param ms - Số mili giây chờ
 *** @returns Promise phân giải sau khi trễ
 **/
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 *** Phân tích JSON an toàn với giá trị dự phòng
 *** @param json - Chuỗi JSON cần phân tích
 *** @param fallback - Giá trị dự phòng nếu phân tích thất bại
 *** @returns Đối tượng đã phân tích hoặc giá trị dự phòng
 **/
export const safeJsonParse = (json, fallback) => {
  try {
    return JSON.parse(json);
  } catch {
    console.error('Failed to parse JSON:', json);
    return fallback;
  }
};

/**
 *** Gộp các class name có điều kiện
 *** @param classes - Đối tượng với tên class và điều kiện boolean
 *** @returns Chuỗi các class name đã gộp
 **/
export const classNames = (classes) => {
  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(' ');
};

