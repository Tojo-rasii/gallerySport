let currentPage = 1;
const imagesPerPage = 10;
let selectedLanguage = "en"; // Langue par défaut : anglais

const languageSelect = document.getElementById("languageSelect");
const searchInput = document.getElementById("searchInput");

languageSelect.addEventListener("change", function () {
  selectedLanguage = this.value;
  fetchImages(currentPage);
});

searchInput.addEventListener("input", function () {
  fetchImages(currentPage);
});

function fetchImages(page) {
  const searchQuery = searchInput.value.trim();
  const sportKeywords = ["sport", "musculation", "footing", "tennis", "football"]; // Mots-clés sportifs
  const randomKeyword = sportKeywords[Math.floor(Math.random() * sportKeywords.length)]; // Choix aléatoire d'un mot-clé

  const url = `https://api.unsplash.com/photos/random?count=${imagesPerPage}&page=${page}&query=musculation,sport&client_id=sGuihjWFVswn44KK6R7U0oq0xjEQykqjlCfP8y13JAw`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById("carousel").innerHTML = ''; // Efface les images précédentes

      data.forEach(photo => {
        const container = document.createElement("div");
        container.classList.add("photo-container");
    
        const imageLink = document.createElement("a");
        imageLink.href = `details.html?image=${encodeURIComponent(photo.urls.regular)}&title=${encodeURIComponent(photo.alt_description || "Untitled")}&description=${encodeURIComponent(photo.description || "")}&size=${encodeURIComponent(photo.width)}x${encodeURIComponent(photo.height)}`;
        imageLink.target = "_blank";
    
        const img = document.createElement("img");
        img.src = photo.urls.regular;
    
        const title = document.createElement("p");
        title.textContent = photo.alt_description || "Untitled";
    
        // Ajoutez une description si elle est disponible
        if (photo.description) {
            const description = document.createElement("p");
            description.textContent = photo.description;
            container.appendChild(description);
            description.style.display = "none";
        }
    
        const info = document.createElement("p");
        info.innerHTML = `Taille: ${photo.width}x${photo.height}`;
    
        imageLink.appendChild(img);
        container.appendChild(imageLink);
        container.appendChild(title);
        container.appendChild(info);
    
        document.getElementById("carousel").appendChild(container);
    });
    
    
    })
    .catch(error => console.log(error));
}

function formatFileSize(size) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} Mo`;
  } else {
    return `${(size / 1024).toFixed(2)} Ko`;
  }
}

function clearImages() {
  document.getElementById("carousel").innerHTML = '';
}

function nextPage() {
  clearImages();
  currentPage++;
  fetchImages(currentPage);
}

function previousPage() {
  if (currentPage > 1) {
    clearImages();
    currentPage--;
    fetchImages(currentPage);
  }
}

fetchImages(currentPage);