import { useEffect, useState } from "react";
import {
  UilGithub,
  UilLinkedin,
  UilEnvelope,
  UilWhatsapp,
  UilPhone,
  UilMapMarker,
  UilDownloadAlt,
  UilSetting,
} from "@iconscout/react-unicons";

import profileService from "../../management/services/profileService";
import skillsService from "../../management/services/skillsService";
import {
  uploadProfilePicture,
  uploadCV,
} from "../../management/storage/storageProvider";
import { useAuth } from "../../contexts/AuthContext";

// Components
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";
import Card from "../../components/card/Card.Component";
import Button from "../../components/button/Button.Component";
import CmsButton from "../../components/cmsbutton/CmsButton.Component";
import CmsOverlay from "../../components/cmsoverlay/CmsOverlay.component"; // Import Overlay
import ErrorMessage from "../../components/error/Error.Component";
import SectionTitle from "../../components/sectiontitle/SectionTitle.Component";
import Footer from "../../components/footer/Footer.Component";
import GridWrapper from "../../components/gridwrapper/GridWrapper.Component";
import Confirm from "../../components/confirm/Confirm.Component";
import Spinner from "../../components/spinner/Spinner.Component";

import {
  ProfileHero,
  PhotoContainer,
  ProfileInfo,
  TitleWrapper,
  SubTitle,
  SocialBar,
  ContactInfoList,
  ContactItem,
  CVButtonWrapper,
  LocationWrapper,
  BioText,
  LogoutWrapper,
} from "./Profile.Style";

const groupSkillsByType = (skills) => {
  return skills.reduce((acc, skill) => {
    const type = skill.type || "Other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(skill);
    return acc;
  }, {});
};

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CMS States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const [skillToDelete, setSkillToDelete] = useState(null); // Tracks the skill object
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Controls the modal

  const { isLoggedIn, logout } = useAuth();

  const fetchData = async () => {
    try {
      const [profileData, skillsData] = await Promise.all([
        profileService.getProfile(),
        skillsService.getAllSkills(),
      ]);
      setProfile(profileData);
      setSkills(groupSkillsByType(skillsData));
    } catch (err) {
      setError("Failed to load profile information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handlers ---

  const handleProfileUpdate = async (formData) => {
    try {
      let updatedData = { ...formData };
      // --- FILE UPLOADS ---
      if (formData.profile_photo_file instanceof File) {
        const photoUrl = await uploadProfilePicture(
          formData.profile_photo_file,
        );
        updatedData.profile_photo_url = photoUrl;
      }

      if (formData.cv_file instanceof File) {
        const cvUrl = await uploadCV(formData.cv_file);
        updatedData.cv_url = cvUrl;
      }

      // --- CLEANUP ---
      // 1. Remove file objects
      delete updatedData.profile_photo_file;
      delete updatedData.cv_file;
      // Remove Metadata fields that backend doesn't need
      delete updatedData.id; // remove id
      delete updatedData.created_at; // remove timestamp
      delete updatedData.updated_at; // remove timestamp
      // Handle empty strings
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] === "") {
          updatedData[key] = null;
        }
      });

      await profileService.updateProfile(updatedData);

      await fetchData();
      setIsProfileModalOpen(false);
      setError(null);
    } catch (err) {
      console.error("Full Error Object:", err);
      const serverMessage =
        err.response?.data?.error || "Failed to update profile";
      setError(serverMessage);
    }
  };

  const handleCreateSkill = async (formData) => {
    try {
      await skillsService.createSkill(formData);
      await fetchData();
      setIsSkillModalOpen(false);
    } catch (err) {
      setError("Failed to create skill");
    }
  };

  const handleDownloadCV = () => {
    if (profile?.cv_url) {
      window.open(profile.cv_url, "_blank");
    }
  };

  const handleDeleteClick = (skill) => {
    setSkillToDelete(skill);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!skillToDelete) return;

    const skillId = skillToDelete.id;

    try {
      await skillsService.deleteSkill(skillId);
      await fetchData();
      setIsConfirmOpen(false);
      setSkillToDelete(null);
    } catch (err) {
      setError("Failed to delete skill");
      setIsConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setSkillToDelete(null);
  };

  // --- Field Configs ---

  const profileFields = [
    { name: "name", label: "Full Name" },
    { name: "title", label: "Job Title" },
    { name: "location", label: "Location" },
    { name: "bio", label: "Biography" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "whatsapp", label: "WhatsApp" },
    { name: "linkedin", label: "LinkedIn URL" },
    { name: "github", label: "GitHub URL" },
    { name: "profile_photo_file", label: "Profile Photo", type: "file" },
    { name: "cv_file", label: "CV (PDF)", type: "file" },
  ];

  const skillFields = [
    { name: "type", label: "Skill Type (e.g., Languages, Frameworks)" },
    { name: "name", label: "Skill Name (e.g., React, Python)" },
  ];
  if (loading) {
    return (
      <TabWrapper>
        <Spinner message="Loading profile and skills..." />
      </TabWrapper>
    );
  }
  if (!profile) return null;

  return (
    <TabWrapper>
      <ErrorMessage message={error} onClear={() => setError(null)} />

      <ProfileHero>
        <PhotoContainer>
          <img src={profile.profile_photo_url} alt={profile.name} />
        </PhotoContainer>

        <ProfileInfo>
          <TitleWrapper>
            <h1>{profile.name}</h1>
            {isLoggedIn && (
              <CmsButton
                type="edit"
                onClick={() => setIsProfileModalOpen(true)}
              />
            )}
          </TitleWrapper>

          <SubTitle>{profile.title}</SubTitle>

          <LocationWrapper>
            <UilMapMarker size="18" /> {profile.location}
          </LocationWrapper>

          <SocialBar>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <UilLinkedin size="24" />
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer">
                <UilGithub size="24" />
              </a>
            )}
          </SocialBar>

          <ContactInfoList>
            {profile.email && (
              <ContactItem>
                <UilEnvelope size="20" /> {profile.email}
              </ContactItem>
            )}
            {profile.phone && (
              <ContactItem>
                <UilPhone size="20" /> {profile.phone}
              </ContactItem>
            )}
            {profile.whatsapp && (
              <ContactItem>
                <UilWhatsapp size="20" /> {profile.whatsapp}
              </ContactItem>
            )}
          </ContactInfoList>

          <BioText>{profile.bio}</BioText>
        </ProfileInfo>
      </ProfileHero>

      {profile.cv_url && (
        <CVButtonWrapper>
          <Button
            type="primary"
            onClick={handleDownloadCV}
            icon={<UilDownloadAlt size="20" />}
          >
            Download CV
          </Button>
        </CVButtonWrapper>
      )}

      {/* Expertise Section with Add Button */}
      <TitleWrapper style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        <SectionTitle icon={<UilSetting size="28" />}>Expertise</SectionTitle>
        {isLoggedIn && (
          <CmsButton type="add" onClick={() => setIsSkillModalOpen(true)} />
        )}
      </TitleWrapper>

      <GridWrapper>
        {Object.entries(skills).map(([type, skillsList]) => (
          <Card
            key={type}
            title={type}
            tags={skillsList}
            onTagDelete={isLoggedIn ? handleDeleteClick : null}
          />
        ))}
      </GridWrapper>

      {isLoggedIn && (
        <LogoutWrapper>
          <Button onClick={logout} type="secondary">
            Logout session
          </Button>
        </LogoutWrapper>
      )}

      <Footer />

      {/* CMS Overlays */}
      <CmsOverlay
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleProfileUpdate}
        initialData={profile}
        fields={profileFields}
        mode="update"
        resourceName="Profile"
      />

      <CmsOverlay
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        onSubmit={handleCreateSkill}
        fields={skillFields}
        mode="create"
        resourceName="Skill"
      />

      <Confirm
        isOpen={isConfirmOpen}
        title="Delete Skill"
        message={`Are you sure you want to delete "${skillToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        variant="danger"
      />
    </TabWrapper>
  );
};

export default ProfileTab;
