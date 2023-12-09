import { Link } from 'react-router-dom';

const Company = ({ company }) => {
  return (
    <li className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{company.name}</h2>
        <p>{company.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/companies/${company.handle}`} className="btn">
            Explore
          </Link>
        </div>
      </div>
    </li>
  );
};
export default Company;
