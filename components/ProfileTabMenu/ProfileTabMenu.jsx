import React, { useState } from "react";
import EditUserForm from "../forms/EditUserForm";
import {
  profileTabMenu,
  tab,
  ownSnippetsTab,
  favSnippetsTab,
  profileSettingsTab,
  active,
  profileTabContent,
} from "./profile_tab.module.scss";
import PostCard from "components/PostCard/PostCard";
import EditUserImportantInfos from "../forms/EditUserImportantInfos";
import EditUserEmail from "../forms/EditUserEmail";
import { useTranslation } from "next-i18next";

const ProfileTabMenu = ({
  user,
  currentUser,
  userAvatar,
  isCurrentUser,
  mutate,
  posts,
  favoritePosts,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const { t } = useTranslation("profile");

  return (
    <>
      <div className={profileTabMenu}>
        <div className={`${ownSnippetsTab}`}>
          <h3
            className={`${tab} ${activeTab === 1 && active}`}
            onClick={(e) => setActiveTab(1)}
          >
            {t("createdSnippets")} ({posts.length})
          </h3>
        </div>
        <div className={`${favSnippetsTab}`}>
          <h3
            className={`${tab} ${activeTab === 2 && active}`}
            onClick={(e) => setActiveTab(2)}
          >
            {t("favoriteSnippets")} ({favoritePosts.length})
          </h3>
        </div>
        {isCurrentUser && (
          <div className={`${profileSettingsTab}`}>
            <h3
              className={`${tab} ${activeTab === 3 && active}`}
              onClick={(e) => setActiveTab(3)}
            >
              {t("settings")}
            </h3>
          </div>
        )}
      </div>

      <div className={profileTabContent}>
        {activeTab === 1 &&
          (posts.length === 0 ? (
            <p>
              {user?.username ?? t("userPlaceholder")} {t("noCreatedSnippets")}
            </p>
          ) : (
            posts.map((post) => {
              return <PostCard post={post.post} key={post.post.id} />;
            })
          ))}

        {activeTab === 2 &&
          (favoritePosts.length === 0 ? (
            <p>{t("noFavoriteSnippets")}</p>
          ) : (
            favoritePosts.map((post) => (
              <PostCard post={post.post} mutate={mutate} key={post.post.id} />
            ))
          ))}
        {activeTab === 3 && (
          <>
          <EditUserForm
            user={currentUser}
            mutate={mutate}
            userAvatar={userAvatar}
            userId={user?.id}
          />
          <EditUserImportantInfos user={user}/>
          <EditUserEmail />
          </>
        )}
      </div>
    </>
  );
};

export default ProfileTabMenu;
