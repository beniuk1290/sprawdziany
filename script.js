async function loadData() {
  const content = document.getElementById("content");
  content.innerHTML = "Ładowanie...";
  
  try {
    const res = await fetch("files.json");
    if (!res.ok) throw new Error();
    
    const data = await res.json();
    showFiles(data, "");
  } catch {
    content.innerHTML = "<p>Zasoby już wkrótce</p>";
  }
}

function showFiles(files, path) {
  const content = document.getElementById("content");
  content.innerHTML = "";
  
  let current = files;
  
  if (path !== "") {
    const parts = path.split("/");
    for (let p of parts) {
      current = current[p];
    }
    
    const backBtn = document.createElement("button");
    backBtn.textContent = "⬅ Powrót";
    backBtn.onclick = () => {
      const newPath = parts.slice(0, -1).join("/");
      showFiles(files, newPath);
    };
    content.appendChild(backBtn);
  }
  
  for (let key in current) {
    const div = document.createElement("div");
    div.className = "file";
    
    const name = document.createElement("span");
    name.textContent = key;
    
    if (typeof current[key] === "object") {
      div.onclick = () => {
        const newPath = path ? path + "/" + key : key;
        showFiles(files, newPath);
      };
    } else {
      const btn = document.createElement("button");
      btn.textContent = "Pobierz";
      
      btn.onclick = (e) => {
        e.stopPropagation();
        startDownload(current[key], btn);
      };
      
      div.appendChild(btn);
    }
    
    div.prepend(name);
    content.appendChild(div);
  }
}

function startDownload(url, btn) {
  let time = 5;
  btn.disabled = true;
  
  const interval = setInterval(() => {
    btn.textContent = `Pobieranie za ${time}s`;
    time--;
    
    if (time < 0) {
      clearInterval(interval);
      window.location.href = url;
      btn.textContent = "Pobrano";
    }
  }, 1000);
}