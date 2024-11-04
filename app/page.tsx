'use client'

import { useState } from 'react';
import { LoggedInHeader, LoggedInSectionOne, LoggedInSectionTwo } from '@/components/LoggedIn';
import { LoggedOutHeader, LoggedOutSectionOne, LoggedOutSectionTwo } from '@/components/LoggedOut';
import { SectionThree } from '@/components/SectionThree';
import { AuthProvider, RunIfLoggedIn, RunIfLoggedOut } from '@/app/api/middleware/userLoggedIn';
import React from 'react';

export default function Home() {
  const [sectionOneLoaded, setSectionOneLoaded] = useState(false);

  return (
    <>
      {/* Global Containers */}
      <main className="flex-grow mt-16">
        <div className="h-[calc(100vh-4rem)] snap-y snap-mandatory overflow-y-scroll">
          <AuthProvider>
            {/* Runs If User Is LoggedIn */}
            <RunIfLoggedIn>
              <LoggedInHeader />
              <LoggedInSectionOne onLoad={() => setSectionOneLoaded(true)} />
              {sectionOneLoaded && (
                <>
                  <LoggedInSectionTwo />
                  <SectionThree />
                </>
              )}
            </RunIfLoggedIn>

            {/* Runs If User Is LoggedOut */}
            <RunIfLoggedOut>
              <LoggedOutHeader />
              <LoggedOutSectionOne />
              <LoggedOutSectionTwo />
              <SectionThree />
            </RunIfLoggedOut>
          </AuthProvider>
        </div>
      </main>
    </>
  );
};
