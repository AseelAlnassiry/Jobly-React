import { useEffect, useState } from 'react';
import JoblyApi from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Company from '../components/Company';
import Loading from '../components/Loading';
import Job from '../components/Job';

const Companies = () => {
  const [term, setTerm] = useState('');
  const [data, setData] = useState(null);
  const [companies, setCompanies] = useState(null);
  const nav = useNavigate();

  const handleSearch = (val) => {
    // check if there's a term or not
    setCompanies(null);
    setTerm(val);
    if (val === '') {
      setCompanies(data);
    } else {
      setCompanies(null);

      const filtered = data.filter((company) => company.name.toLowerCase().includes(val.toLowerCase()));
      setCompanies(filtered);
    }
  };

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await JoblyApi.getCompanies();
        setData(res);
        setCompanies(res);
      } catch (error) {
        toast.error('unable to load companies');
        nav('/');
      }
    };
    getCompanies();
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {!companies && <Loading />}
      {companies && (
        <ul className=" grid grid-cols-6 mx-auto gap-4">
          {companies.map((company) => (
            <Company company={company} key={company.handle} />
          ))}
        </ul>
      )}
    </div>
  );
};
export default Companies;
