// Твій API ключ
const api_key = 'live_9XhVlg6homqJlmZHX7vaiAxF8iIASPBJ7tRjVqOcsctEntpRTgqkoji6MpaHLsFU';
// URL для отримання кота з інформацією про породу
const url = 'https://api.thecatapi.com/v1/images/search?has_breeds=1';

// Елементи DOM
const img = document.getElementById('cat_image');
const loader = document.getElementById('loader');
const breed_name = document.getElementById('breed_name');
const breed_desc = document.getElementById('breed_desc');
const btn = document.getElementById('next_btn');

// Функція для отримання нового кота
async function get_new_cat() {
  // Стан завантаження
  btn.disabled = true;
  btn.innerText = 'Searching...';
  img.style.opacity = '0'; // Ховаємо стару картинку
  loader.style.display = 'block'; // Показуємо спінер

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': api_key
      }
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const cat = data[0];

    // Коли картинка завантажиться повністю
    img.onload = () => {
      loader.style.display = 'none'; // Ховаємо спінер
      img.style.opacity = '1'; // Показуємо картинку плавним проявленням
    };
    
    // Встановлюємо джерело картинки
    img.src = cat.url;

    // Перевіряємо, чи є інформація про породу
    if (cat.breeds && cat.breeds.length > 0) {
      const breed = cat.breeds[0];
      breed_name.innerText = breed.name; // Назва породи
      breed_desc.innerText = breed.description; // Опис породи
    } else {
      // Якщо раптом прийшов кіт без породи (хоча ми просили з породою)
      breed_name.innerText = 'Unknown Breed';
      breed_desc.innerText = 'No description available for this cutie, but it\'s still wonderful.';
    }
  } catch (error) {
    console.error('Error:', error);
    loader.style.display = 'none';
    breed_name.innerText = 'Network Error';
    breed_desc.innerText = 'Unable to load cat data. Please check your internet connection and try again.';
    img.style.opacity = '1';
    img.src = ''; // Можна поставити якусь дефолтну картинку помилки
  } finally {
    // Повертаємо кнопку в робочий стан
    btn.disabled = false;
    btn.innerText = 'Show Another Cat';
  }
}

// Подія на кнопку
btn.addEventListener('click', get_new_cat);

// Завантажуємо першого кота при запуску сторінки
get_new_cat();