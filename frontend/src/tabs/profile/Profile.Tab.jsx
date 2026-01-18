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
import { useAuth } from "../../contexts/AuthContext";

// Components
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";
import Card from "../../components/card/Card.Component";
import Button from "../../components/button/Button.Component";
import CmsButton from "../../components/cmsbutton/CmsButton.Component";
import ErrorMessage from "../../components/error/Error.Component";
import SectionTitle from "../../components/sectiontitle/SectionTitle.Component";
import Footer from "../../components/footer/Footer.Component";

// Styled Components
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
  SkillsGrid,
  SkillList,
  SkillBadge,
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
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
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
    fetchData();
  }, []);

  const handleDownloadCV = () => {
    if (profile?.cv_url) {
      window.open(profile.cv_url, "_blank");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return null;

  return (
    <TabWrapper>
      <ErrorMessage message={error} onClear={() => setError(null)} />

      <ProfileHero>
        <PhotoContainer>
          <img
            src={profile.profile_photo_url || "https://i.pravatar.cc/300"}
            alt={profile.name}
          />
        </PhotoContainer>

        <ProfileInfo>
          <TitleWrapper>
            <h1>{profile.name}</h1>
            {isLoggedIn && <CmsButton type="edit" onClick={() => {}} />}
          </TitleWrapper>

          <SubTitle>{profile.title}</SubTitle>

          <LocationWrapper>
            <UilMapMarker size="18" /> {profile.location}
          </LocationWrapper>

          {/* Social Links Bar (Horizontal) */}
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

          {/* Contact Details (Vertical List) */}
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

      {/* CV Download Button */}
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

      <SectionTitle icon={<UilSetting size="28" />}>Expertise</SectionTitle>

      <SkillsGrid>
        {Object.entries(skills).map(([type, skillsList]) => (
          <Card key={type} title={type}>
            <SkillList>
              {skillsList.map((skill) => (
                <SkillBadge key={skill.id}>{skill.name}</SkillBadge>
              ))}
            </SkillList>
          </Card>
        ))}
      </SkillsGrid>

      {isLoggedIn && (
        <LogoutWrapper>
          <Button onClick={logout} type="secondary">
            Logout session
          </Button>
        </LogoutWrapper>
      )}

      <Footer />
    </TabWrapper>
  );
};

export default ProfileTab;
