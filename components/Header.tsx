'use client';

import React from "react";
import LogoutButton from "@/components/LogoutButton";
import LoginButton from "@/components/LoginButton";
import { getSession } from "@auth0/nextjs-auth0";
import Workshops from "@/components/Workshops";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";


type HeaderProps = {
  user: UserProfile | undefined;
  activeTab: ActiveTabType;
  setActiveTab: (active: ActiveTabType) => void;
}
const Header = ({user, activeTab, setActiveTab}: HeaderProps) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
      <a className="navbar-brand" href="#">Workshop Wizard</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {user ? (
          <>
            <ul className="navbar-nav">
              <li className={`nav-item ${activeTab === 'Workshops' ? 'active' : ''}`}>
                <a className="nav-link" href="#" onClick={() => setActiveTab("Workshops")}>Workshops</a>
              </li>
              <li className={`nav-item ${activeTab === 'Registrations' ? 'active' : ''}`}>
                <a className="nav-link" href="#" onClick={() => setActiveTab("Registrations")}>Registrations</a>
              </li>
              <li className={`nav-item ${activeTab === 'Admin' ? 'active' : ''}`}>
                <a className="nav-link" href="#" onClick={() => setActiveTab("Admin")}>Admin</a>
              </li>
            </ul>
            <div>
              <p>{user.name}</p>
              <LogoutButton />
            </div>
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
};

export default Header;
