import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
const Job = ({ job, company }) => {
  const { authUser, apply } = useAuth();
  const applied = authUser.applications.includes(job.id);
  const handleApply = async () => {
    try {
      await apply(authUser.username, job.id);
    } catch (error) {
      toast.error("couldn't apply, something went wrong :(");
    }
  };
  return (
    <li className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{job.title}</h2>
        {company && <p>Company: {job.companyName}</p>}
        <p>Salary: ${job.salary}</p>
        <p>Equity: {job.equity}%</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleApply} disabled={applied ? true : false}>
            {applied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
    </li>
  );
};
export default Job;
