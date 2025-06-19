import React from 'react';
import { useParams, Link } from 'react-router-dom';

const dummyIPOs = {
  1: {
    company_name: "ZomTech Solutions",
    logo: "https://via.placeholder.com/80",
    price_band: "₹100 - ₹120",
    open_date: "2025-06-20",
    close_date: "2025-06-24",
    issue_size: "₹300 Cr",
    issue_type: "Book Built",
    listing_date: "2025-07-01",
    status: "Upcoming",
    ipo_price: 110,
    listing_price: 125,
    current_market_price: 140,
    rhp_pdf: "#",
    drhp_pdf: "#"
  }
};

function Detail() {
  const { id } = useParams();
  const ipo = dummyIPOs[id];

  if (!ipo) return <p className="text-center mt-4">IPO not found.</p>;

  const listingGain = getGain(ipo.ipo_price, ipo.listing_price);
  const currentReturn = getGain(ipo.ipo_price, ipo.current_market_price);

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">&larr; Back</Link>

      <div className="card shadow-sm p-4">
        {/* Top section: Logo + Name + Status */}
        <div className="d-flex align-items-center mb-4">
          <img src={ipo.logo} alt="logo" width="80" height="80" className="me-3 rounded border" />
          <div>
            <h3 className="mb-1">{ipo.company_name}</h3>
            <span className={`badge bg-${getBadgeColor(ipo.status)}`}>{ipo.status}</span>
          </div>
        </div>

        {/* IPO Details */}
        <div className="row">
          <DetailItem label="Price Band" value={ipo.price_band} />
          <DetailItem label="Open Date" value={ipo.open_date} />
          <DetailItem label="Close Date" value={ipo.close_date} />
          <DetailItem label="Listing Date" value={ipo.listing_date} />
          <DetailItem label="Issue Size" value={ipo.issue_size} />
          <DetailItem label="Issue Type" value={ipo.issue_type} />
        </div>

        {/* Financials Card */}
        <div className="card bg-light p-3 my-4">
          <div className="row">
            <DetailItem label="IPO Price" value={`₹${ipo.ipo_price}`} />
            <DetailItem label="Listing Price" value={`₹${ipo.listing_price}`} />
            <DetailItem label="Listing Gain" value={`${listingGain}%`} />
            <DetailItem label="CMP" value={`₹${ipo.current_market_price}`} />
            <DetailItem label="Current Return" value={`${currentReturn}%`} />
          </div>
        </div>

        {/* Downloads */}
        <div>
          <h5>Documents</h5>
          <a href={ipo.rhp_pdf} target="_blank" className="btn btn-outline-primary btn-sm me-2">Download RHP</a>
          <a href={ipo.drhp_pdf} target="_blank" className="btn btn-outline-secondary btn-sm">Download DRHP</a>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="col-md-6 col-lg-4 mb-3">
      <strong>{label}:</strong> {value}
    </div>
  );
}

function getGain(ipo, value) {
  return ipo && value ? (((value - ipo) / ipo) * 100).toFixed(2) : '-';
}

function getBadgeColor(status) {
  switch (status.toLowerCase()) {
    case 'upcoming': return 'info';
    case 'ongoing': return 'warning';
    case 'listed': return 'success';
    default: return 'secondary';
  }
}

export default Detail;
