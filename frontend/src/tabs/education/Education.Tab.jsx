import { useEffect, useState } from "react";
import educationService from "../../management/services/educationService";
import coursesService from "../../management/services/coursesService";
import Card from "../../components/card/Card.Component";

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
    <section className="education-tab">
      <h1>Education</h1>

      {education.map((edu) => (
        <Card key={edu.id} title={edu.university}>
          <p>
            <strong>Degree:</strong> {edu.degree}
          </p>
          <p>
            <strong>Start Date:</strong> {edu.start_date}
          </p>
          <p>
            <strong>End Date:</strong> {edu.end_date}
          </p>
          <p>{edu.description}</p>
        </Card>
      ))}

      <h2>Courses</h2>

      {courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        courses.map((course) => (
          <Card key={course.id} title={course.title}>
            <p>
              <strong>Duration:</strong>{" "}
              {new Date(course.start_date).getFullYear()} –{" "}
              {new Date(course.end_date).getFullYear()}
            </p>
            <p>{course.description}</p>

            {course.link && (
              <a href={course.link} target="_blank" rel="noreferrer">
                Course Link
              </a>
            )}
          </Card>
        ))
      )}
    </section>
  );
};

export default EducationTab;
