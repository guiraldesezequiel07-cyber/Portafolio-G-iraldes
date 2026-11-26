// 1. Año automático en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Modo oscuro / claro guardado en localStorage
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 3. Menú hamburguesa en celulares
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// 4. Simulación de envío de formulario
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que la página se recargue
  const nombre = document.getElementById('nombre').value.trim();

  formStatus.textContent = `¡Gracias, ${nombre}! Tu mensaje fue enviado correctamente.`;
  contactForm.reset();
});

// 5. descarga directa del CV sin abrirlo en el navegador
const btnDescargarCV = document.getElementById('descargar-cv');

if (btnDescargarCV) {
  btnDescargarCV.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = btnDescargarCV.getAttribute('href');
    const nombreArchivo = btnDescargarCV.getAttribute('download') || 'CV.pdf';

    try {
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error('No se encontró el archivo');

      const blob = await respuesta.blob();
      const enlaceTemporal = document.createElement('a');
      const urlBlob = URL.createObjectURL(blob);

      enlaceTemporal.href = urlBlob;
      enlaceTemporal.download = nombreArchivo;
      document.body.appendChild(enlaceTemporal);
      enlaceTemporal.click();

      enlaceTemporal.remove();
      URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error('Error al descargar el CV:', error);
      alert('No se pudo descargar el CV. Verificá que el archivo exista en la carpeta assets.');
    }
  });
}