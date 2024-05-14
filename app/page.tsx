'use client';
import Workshops from "@/components/Workshops";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Registrations from "@/components/Registrations";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('Workshops');
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    if (!user) {
      setActiveTab('Unauthenticated')
    } else {
      setActiveTab('Workshops')
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const renderContent = (active: ActiveTabType) => {
    switch (active) {
      case 'Workshops':
        return <Workshops />;
      case 'Registrations':
        return <Registrations />;
      case 'Admin':
        return "Admin";
      case 'Unauthenticated':
        return "Unauthenticated";
      default:
        return <div>Not implemented</div>;
    }
  }

  return (
    <main>
      <div className="flex justify-center items-center">
        <Header user={user} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <div className="p-4">
          {renderContent(activeTab)}
        </div>
      </div>
    </main>
  );
}
