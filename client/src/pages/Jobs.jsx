import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import JoblyApi from '../api/api';
import Job from '../components/Job';
const Jobs = () => {
  const [jobs, setJobs] = useState(null);
  const [term, setTerm] = useState('');
  useEffect(() => {
    const getJobs = async () => {
      setJobs(await JoblyApi.getJobs());
    };
    getJobs();
  }, []);

  const handleSearch = async (val) => {
    setTerm(val);
    if (val) setJobs(await JoblyApi.getJobs(val));
    else setJobs(await JoblyApi.getJobs());
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {!jobs && <Loading />}
      {jobs && (
        <ul className=" grid grid-cols-6 mx-auto gap-4">
          {jobs.map((job) => (
            <Job job={job} key={job.id} company={true}/>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Jobs;
