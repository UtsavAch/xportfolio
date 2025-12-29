import { useEffect, useState } from "react";
import experienceService from "../../management/services/experienceService";

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
    <section className="experience-tab">
      <h1>Experience</h1>
      {experiences.map((exp) => (
        <div key={exp.id} className="experience-item">
          <h2>
            {exp.position} at {exp.company}
          </h2>
          <p>
            <strong>Duration:</strong> {exp.start_date} -{" "}
            {exp.end_date || "Present"}
          </p>
          <p>
            <strong>Location:</strong> {exp.location}
          </p>
          <p>
            <strong>Description:</strong> {exp.description}
          </p>
        </div>
      ))}
      <br />
    </section>
  );
};

export default ExperienceTab;
