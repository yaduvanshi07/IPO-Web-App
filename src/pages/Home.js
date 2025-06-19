import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ipoData = {
  upcoming: [
    {
      id: 1,
      company_name: "ZomTech Solutions",
      logo: "https://via.placeholder.com/50",
      price_band: "₹100 - ₹120",
      open_date: "2025-06-20",
      close_date: "2025-06-24",
      status: "Upcoming",
    },
    {
      id: 2,
      company_name: "Finhub Pvt Ltd",
      logo: "https://via.placeholder.com/50",
      price_band: "₹150 - ₹170",
      open_date: "2025-06-22",
      close_date: "2025-06-26",
      status: "Upcoming",
    }
  ],
  ongoing: [
    {
      id: 3,
      company_name: "GreenEnergy Corp",
      logo: "https://via.placeholder.com/50",
      price_band: "₹200 - ₹230",
      open_date: "2025-06-15",
      close_date: "2025-06-19",
      status: "Ongoing",
    }
  ],
  listed: [
    {
      id: 4,
      company_name: "GrowInvest Ltd",
      logo: "https://via.placeholder.com/50",
      price_band: "₹250 - ₹270",
      open_date: "2025-05-01",
      close_date: "2025-05-05",
      status: "Listed",
    }
  ]
};

function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold text-primary"> IPO Listings</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs justify-content-center">
        {['upcoming', 'ongoing', 'listed'].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ cursor: 'pointer' }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* IPO Cards */}
      <div className="mt-4">
        {ipoData[activeTab].length > 0 ? (
          ipoData[activeTab].map((ipo) => (
            <div className="card mb-3 shadow-sm" key={ipo.id}>
              <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
              
                <div className="d-flex align-items-center mb-3 mb-md-0">
                  <img
                    src={ipo.logo}
                    alt={`${ipo.company_name} logo`}
                    width="50"
                    height="50"
                    className="me-3 border rounded"
                  />
                  <div>
                    <h5 className="mb-1">{ipo.company_name}</h5>
                    <p className="mb-1 text-muted">
                      Price Band: <strong>{ipo.price_band}</strong>
                    </p>
                    <small className="text-muted">
                      Open: {ipo.open_date} | Close: {ipo.close_date}
                    </small>
                  </div>
                </div>

                
                <div className="text-md-end">
                  <span className={`badge bg-${getBadgeColor(ipo.status)} mb-2`}>
                    {ipo.status}
                  </span>
                  <br />
                  <Link
                    to={`/ipo/${ipo.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-5">No IPOs in this category.</p>
        )}
      </div>
    </div>
  );
}

function getBadgeColor(status) {
  switch (status.toLowerCase()) {
    case 'upcoming':
      return 'info';
    case 'ongoing':
      return 'warning';
    case 'listed':
      return 'success';
    default:
      return 'secondary';
  }
}

export default Home;
