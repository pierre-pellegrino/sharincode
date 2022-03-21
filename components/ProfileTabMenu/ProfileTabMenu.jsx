import React, { useState } from 'react';
import { 
  profileTabMenu,
  tab,
  ownSnippetsTab,
  favSnippetsTab,
  profileSettingsTab,
  active,
} from "./profile_tab.module.scss";

const ProfileTabMenu = ({user, currentUser, isCurrentUser}) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={profileTabMenu}>
      <div className={`${ownSnippetsTab}`}>
        <h3 className={`${tab} ${activeTab === 1 && active}`} onClick={(e) => setActiveTab(1)}>Snippets créés</h3>
      </div>
      <div className={`${favSnippetsTab}`}>
        <h3 className={`${tab} ${activeTab === 2 && active}`} onClick={(e) => setActiveTab(2)}>Snippets favoris</h3>
      </div>
      {isCurrentUser && (
        <div className={`${profileSettingsTab}`}>
          <h3 className={`${tab} ${activeTab === 3 && active}`} onClick={(e) => setActiveTab(3)}>Réglages</h3>

        </div>
      )}
    </div>
  );
};

export default ProfileTabMenu;