import { useEffect, useState } from "react";
import profileService from "../../management/services/profileService";
import skillsService from "../../management/services/skillsService";
import Card from "../../components/card/Card.Component";

const groupSkillsByType = (skills) => {
  return skills.reduce((acc, skill) => {
    const type = skill.type || "Other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(skill);
    return acc;
  }, {});
};

const AboutTab = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <section className="about-tab">
      <h1>About me</h1>

      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Title:</strong> {profile.title}
      </p>
      <p>
        <strong>PhotoURL:</strong> {profile.profile_photo_url}
      </p>
      <p>
        <strong>CV:</strong> {profile.cv_url}
      </p>

      <Card title="Short Bio" description={profile.bio} />

      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Phone:</strong> {profile.phone}
      </p>
      <p>
        <strong>WhatsApp:</strong> {profile.whatsapp}
      </p>
      <p>
        <strong>Location:</strong> {profile.location}
      </p>
      <p>
        <strong>LinkedIn:</strong> {profile.linkedin}
      </p>
      <p>
        <strong>GitHub:</strong> {profile.github}
      </p>

      <h2>Skills</h2>

      {Object.entries(skills).map(([type, skillsList]) => (
        <Card key={type} title={type}>
          <ul>
            {skillsList.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </Card>
      ))}
    </section>
  );
};

export default AboutTab;
