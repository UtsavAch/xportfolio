import { useEffect, useState } from "react";
import educationService from "../../management/services/educationService";
import coursesService from "../../management/services/coursesService";
import Card from "../../components/card/Card.Component";
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
      })
    : "Present";

const EducationTab = () => {
  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [educationData, coursesData] = await Promise.all([
          educationService.getAllEducation(),
          coursesService.getAllCourses(),
        ]);

        setEducation(educationData);
        setCourses(coursesData);
      } catch (err) {
        setError("Failed to load education data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading education...</p>;
  if (error) return <p>{error}</p>;
  if (education.length === 0) return <p>No education found</p>;

  return (
    <TabWrapper>
      <h1>Education</h1>

      {education.map((edu) => (
        <Card
          key={edu.id}
          title={edu.university}
          subtitle={edu.degree}
          meta={`${formatDate(edu.start_date)} – ${formatDate(edu.end_date)}`}
          description={edu.description}
        />
      ))}

      <h2>Courses</h2>

      {courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        courses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            meta={`${formatDate(course.start_date)} – ${formatDate(
              course.end_date
            )}`}
            description={course.description}
            extra={
              course.link && (
                <a href={course.link} target="_blank" rel="noreferrer">
                  Course link
                </a>
              )
            }
          />
        ))
      )}
    </TabWrapper>
  );
};

export default EducationTab;
