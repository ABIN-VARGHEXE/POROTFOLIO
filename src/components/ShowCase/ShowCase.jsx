import  { useState, useEffect } from 'react';
import './ShowCase.css'
import { FaEye } from "react-icons/fa";

const ShowCase = () => {
  // State to store project data and filtered projects
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // State to store the selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load project data from projects.json
  useEffect(() => {
    fetch('./data/project.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(error => console.error('Error loading project data:', error));
  }, []);

  // Function to handle category filter selection
  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  return (
    <section id='projects' className="portfolio" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">PROJECTS</h2>
      </header>

      {/* Filter buttons */}
      <ul className="filter-list">
        {['All', 'Web design', 'Applications', 'Web development'].map(category => (
          <li className="filter-item" key={category}>
            <button
              className={category === selectedCategory ? 'active' : ''}
              onClick={() => handleFilterClick(category)}
              data-filter-btn
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* Portfolio items */}
      <section className="projects">
        <ul className="project-list">
          {filteredProjects.map(project => (
            <li
              className="project-item active"
              data-filter-item
              data-category={project.category}
              key={project.id}
            >
              <a>
                <figure className="project-img">
                  <a href={project.link} target="_blank" className="project-item-icon-box">
                    <FaEye />
                  </a>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default ShowCase;