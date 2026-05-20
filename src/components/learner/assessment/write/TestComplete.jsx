import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { assessmentService } from '@/components/facilitator/unit_standards/unit_standard/assessment/services/AssessmentService';

export default function TestComplete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    loadSubmission();
  }, [id]);

  const loadSubmission = async () => {
    try {
      const response = await assessmentService.getUserSubmission(id);
      const data = response?.payload || response;
      if (data?.id) setSubmission(data);
    } catch (err) {
      console.error('Error loading submission:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-6 shadow-xl border-0">
        <div className="mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FaCheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Test Submitted!</h3>
        <p className="text-gray-600 mb-4">
          Your test has been successfully submitted.
        </p>
        
        {submission && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">
              Submitted on: {new Date(submission.submittedAt).toLocaleString()}
            </p>
            {submission.status === 'GRADED' && (
              <>
                <p className="text-sm text-gray-600 mt-2">
                  Score: {submission.obtainedMarks}/{submission.assessment?.totalMarks}
                </p>
                {submission.feedback && (
                  <p className="text-sm text-gray-600 mt-2">
                    Feedback: {submission.feedback}
                  </p>
                )}
              </>
            )}
          </div>
        )}
        
        <Button 
          variant="primary" 
          onClick={() => navigate('/learner/assessments')}
          className="flex items-center justify-center gap-2"
        >
          <FaHome /> Back to Assessments
        </Button>
      </Card>
    </div>
  );
}