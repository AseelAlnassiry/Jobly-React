import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import Loading from '../components/Loading';
import Job from '../components/Job';

const CompanyPage = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      setCompany(await JoblyApi.getCompany(handle));
    };
    getCompany();
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4 items-center">
      {company && (
        <>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{company.name}</h2>
              <p>{company.description}</p>
            </div>
          </div>
          <ul className="flex gap-4 justify-center flex-wrap">
            {company.jobs.map((job) => (
              <Job key={job.id} job={job} />
            ))}
          </ul>
        </>
      )}
      {!company && <Loading />}
    </div>
  );
};
export default CompanyPage;
