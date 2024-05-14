'use client';
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";

type Registration = {
  state: string;
  workshopTitle: string;
  workshopStartTime: string;
  workshopEndTime: string;
};


const Registrations = () => {
  const [Registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("/api/backend/workshop/registration") // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
        setFilteredRegistrations(data);
      });
  }, []);

  useEffect(() => {
    setFilteredRegistrations(
      Registrations.filter(workshop =>
        workshop.workshopTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, Registrations]);

  return (
    <div className="d-flex flex-column justify-center align-items-center">
      <h1>Registrations</h1>
      <SearchBar onSearch={setSearchTerm} />
      <div className="table-responsive">
        <table className="table">
          <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">Workshop Title</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
          </tr>
          </thead>
          <tbody>
          {filteredRegistrations.map((registration) => (
            <tr key={registration.workshopTitle}>
              <td>{registration.state}</td>
              <td>{registration.workshopTitle}</td>
              <td>{registration.workshopStartTime}</td>
              <td>{registration.workshopEndTime}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registrations;
