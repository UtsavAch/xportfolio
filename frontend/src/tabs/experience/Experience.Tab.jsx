import { useEffect, useState } from "react";
import experienceService from "../../management/services/experienceService";
import Card from "../../components/card/Card.Component";
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";

const ExperienceTab = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experienceService.getAllExperiences();
        setExperiences(data);
      } catch (err) {
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) return <p>Loading experiences...</p>;
  if (error) return <p>{error}</p>;
  if (experiences.length === 0) return <p>No experiences found</p>;

  return (
    <TabWrapper>
      <h1>Experience</h1>

      {experiences.map((exp) => (
        <Card
          key={exp.id}
          title={exp.position}
          subtitle={exp.company}
          meta={`${exp.start_date} – ${exp.end_date || "Present"}`}
          description={exp.description}
          extra={<span>{exp.location}</span>}
        />
      ))}
    </TabWrapper>
  );
};

export default ExperienceTab;
