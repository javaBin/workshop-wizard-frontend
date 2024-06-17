import React, { useState, useEffect, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import { Toast } from 'bootstrap';

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
  const successToastRef = useRef<HTMLDivElement>(null);
  const dangerToastRef = useRef<HTMLDivElement>(null);

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

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

  const onRegister = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
  }

  const confirmRegistration = () => {
    if (selectedWorkshop) {
      fetch(`/api/backend/workshop/${selectedWorkshop.id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (response.ok && typeof window !== "undefined") {
            console.log("Registered for workshop");
            const toastBootstrap = Toast.getOrCreateInstance(successToastRef.current!)
            toastBootstrap.show()
          } else {
            throw new Error("Error registering for workshop");
          }
        })
        .catch((error) => {
          console.error("Error registering for workshop", error);
          setRegistrationError("Error registering for workshop");
          if(typeof window !== "undefined"){
            const toastBootstrap = Toast.getOrCreateInstance(dangerToastRef.current!)
            toastBootstrap.show()

          }
        });
    }
  }

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
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal"
                        onClick={() => onRegister(workshop)}>Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="modal fade"  id="modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Registration</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to register for this workshop?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={confirmRegistration}>Confirm</button>
            </div>
          </div>
        </div>
      </div>


      <ToastComponent toastRef={successToastRef} registrationError={registrationError} selectedWorkshop={selectedWorkshop} typeOfToast="success" />
      <ToastComponent toastRef={dangerToastRef} registrationError={registrationError} selectedWorkshop={selectedWorkshop} typeOfToast="danger" />

    </div>


  );
};

type ToastProps = {
  registrationError: string | null;
  selectedWorkshop: Workshop | null;
  toastRef: React.RefObject<HTMLDivElement>;
  typeOfToast: "success" | "danger";
}
const ToastComponent = ({toastRef, registrationError, selectedWorkshop, typeOfToast }  : ToastProps) => {
  const toastClassname= `toast text-bg-${typeOfToast}`
  return (
  <div className="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="toast" ref={toastRef} className={toastClassname}
         role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="me-auto">Workshop-Wizard</strong>
        <small>Just now</small>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div className="toast-body">
        {
          registrationError ? <>
            <strong>Error:</strong> {registrationError}
          </> : `Successfully registered for ${selectedWorkshop?.title}`
        }
      </div>
    </div>
  </div>
  )
}

export default Workshops;
