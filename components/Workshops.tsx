'use client';
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";

type Workshop = {
  id: number;
  title: string;
  description: string;
  speakers: Speaker[];
};

type Speaker = {
  name: string;
  bio: string;
  twitter: string;
};


const Workshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("/api/backend/workshop") // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setWorkshops(data);
        setFilteredWorkshops(data);
      });
  }, []);

  useEffect(() => {
    setFilteredWorkshops(
      workshops.filter(workshop =>
        workshop.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, workshops]);

  return (
    <div className="d-flex flex-column justify-center align-items-center">
      <h1>Workshops</h1>
      <SearchBar onSearch={setSearchTerm} />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {filteredWorkshops.map((workshop) => (
          <div className="col p-2" key={workshop.title}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workshop.title}</h5>
                <p className="card-text">{workshop.description}</p>
                <h6>Speakers</h6>
                <ul>
                  {workshop.speakers.map((speaker) => (
                    <li key={speaker.name}>{speaker.name}</li>
                  ))}
                </ul>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;
