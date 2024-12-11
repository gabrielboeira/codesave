document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const projectForm = document.getElementById('project-form');
  
    // Carregar projetos do localStorage ou usar padrões
    const getStoredProjects = () => {
      const storedProjects = localStorage.getItem('projects');
      return storedProjects ? JSON.parse(storedProjects) : [
        {
          name: 'Projeto 1',
          image: './images/image.png',
          link: 'https://github.com/seu-usuario/projeto1',
        },
        {
          name: 'Projeto 2',
          image: './images/image.png',
          link: 'https://github.com/seu-usuario/projeto2',
        },
      ];
    };
  
    const saveProjectsToStorage = (projects) => {
      localStorage.setItem('projects', JSON.stringify(projects));
    };
  
    const renderProjects = (projects) => {
      projectsGrid.innerHTML = '';
      projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
          <img src="${project.image}" alt="${project.name}">
          <h3>${project.name}</h3>
          <a href="${project.link}" target="_blank">Ver no GitHub</a>
          <button class="btn-delete" data-index="${index}">Excluir</button>
        `;
        projectsGrid.appendChild(projectCard);
      });
  
      // Adicionar evento para botões "Excluir"
      const deleteButtons = document.querySelectorAll('.btn-delete');
      deleteButtons.forEach((button) =>
        button.addEventListener('click', (event) => {
          const index = event.target.dataset.index;
          deleteProject(index);
        })
      );
    };
  
    const addProject = (event) => {
      event.preventDefault();
  
      const name = document.getElementById('project-name').value;
      const imageInput = document.getElementById('project-image');
      const link = document.getElementById('project-link').value;
  
      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const newProject = {
            name,
            image: e.target.result, // Base64 da imagem carregada
            link,
          };
  
          const projects = getStoredProjects();
          projects.push(newProject);
          saveProjectsToStorage(projects);
          renderProjects(projects);
  
          projectForm.reset();
        };
  
        reader.readAsDataURL(imageInput.files[0]); // Lê o arquivo de imagem como Base64
      }
    };
  
    const deleteProject = (index) => {
      const projects = getStoredProjects();
      projects.splice(index, 1); // Remove o projeto do array pelo índice
      saveProjectsToStorage(projects);
      renderProjects(projects); // Re-renderiza os projetos atualizados
    };
  
    projectForm.addEventListener('submit', addProject);
  
    renderProjects(getStoredProjects());
  });
  
  // Função de logout
  // home.js
function logout() {
  localStorage.removeItem('user');  // Remove as informações de login do localStorage
  window.location.href = "login.html";  // Redireciona para a página de login
}

  