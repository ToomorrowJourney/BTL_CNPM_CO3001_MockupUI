import React from 'react';
import { Download, BookOpen, GraduationCap, Calendar, FileText, CheckCircle } from 'lucide-react';
import type { CourseSyllabus } from '../../types/syllabus';

interface SyllabusViewProps {
  syllabus: CourseSyllabus | null;
  isLoading: boolean;
}

const SyllabusView: React.FC<SyllabusViewProps> = ({ syllabus, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!syllabus) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Syllabus Available</h3>
        <p className="text-gray-500 mt-2">The syllabus for this course has not been uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Course Overview */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
          Course Overview
        </h2>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Description</h3>
          <p className="text-gray-600 leading-relaxed">{syllabus.courseDescription}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Learning Objectives</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {syllabus.courseObjectives.map((objective, index) => (
              <li key={index} className="pl-1">{objective}</li>
            ))}
          </ul>
        </div>

        {syllabus.prerequisites && syllabus.prerequisites.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Prerequisites</h3>
            <div className="flex flex-wrap gap-2">
              {syllabus.prerequisites.map((prereq, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Topics Schedule */}
      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Topics Schedule
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcomes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {syllabus.topics.map((topic) => (
                <tr key={topic.week} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Week {topic.week}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{topic.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{topic.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {topic.learningOutcomes && (
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        {topic.learningOutcomes.map((outcome, idx) => (
                          <li key={idx}>{outcome}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grading Scheme */}
      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            Grading Scheme
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {syllabus.gradingScheme.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.component}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-bold">{item.weight}%</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-3 text-sm font-bold text-gray-900">Total</td>
                <td className="px-6 py-3 text-sm font-bold text-blue-600">
                  {syllabus.gradingScheme.reduce((acc, curr) => acc + curr.weight, 0)}%
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Textbooks & References */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Textbooks
          </h2>
          <ul className="space-y-4">
            {syllabus.textbooks.map((book, index) => (
              <li key={index} className="flex flex-col p-3 bg-gray-50 rounded-md border border-gray-100">
                <span className="font-medium text-gray-900">{book.title}</span>
                <span className="text-sm text-gray-600">by {book.author}</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{book.edition || 'N/A'}</span>
                  {book.required && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Required
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            References
          </h2>
          <ul className="space-y-2 list-disc list-inside text-gray-600">
            {syllabus.references?.map((ref, index) => (
              <li key={index} className="text-sm">{ref}</li>
            ))}
            {(!syllabus.references || syllabus.references.length === 0) && (
              <li className="text-sm text-gray-400 italic list-none">No additional references listed.</li>
            )}
          </ul>
        </div>
      </section>

      {/* Documents */}
      {syllabus.syllabusDocuments && syllabus.syllabusDocuments.length > 0 && (
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Download className="w-5 h-5 mr-2 text-blue-600" />
            Syllabus Documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {syllabus.syllabusDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-center overflow-hidden">
                  <FileText className="w-8 h-8 text-red-500 mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</p>
                    <p className="text-xs text-gray-500">{(doc.fileSize / 1024).toFixed(1)} KB • {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <a 
                  href={doc.fileUrl} 
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  title="Download"
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

export default SyllabusView;