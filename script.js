
const api_key = 'live_9XhVlg6homqJlmZHX7vaiAxF8iIASPBJ7tRjVqOcsctEntpRTgqkoji6MpaHLsFU';

const url = 'https://api.thecatapi.com/v1/images/search?has_breeds=1';


const img = document.getElementById('cat_image');
const loader = document.getElementById('loader');
const breed_name = document.getElementById('breed_name');
const breed_desc = document.getElementById('breed_desc');
const btn = document.getElementById('next_btn');


async function get_new_cat() {

  btn.disabled = true;
  btn.innerText = 'Searching...';
  img.style.opacity = '0'; 
  loader.style.display = 'block'; 

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

    
    img.onload = () => {
      loader.style.display = 'none'; 
      img.style.opacity = '1'; 
    };
    
    
    img.src = cat.url;

   
    if (cat.breeds && cat.breeds.length > 0) {
      const breed = cat.breeds[0];
      breed_name.innerText = breed.name; 
      breed_desc.innerText = breed.description; 
    } else {
      breed_name.innerText = 'Unknown Breed';
      breed_desc.innerText = 'No description available for this cutie, but it\'s still wonderful.';
    }
  } catch (error) {
    console.error('Error:', error);
    loader.style.display = 'none';
    breed_name.innerText = 'Network Error';
    breed_desc.innerText = 'Unable to load cat data. Please check your internet connection and try again.';
    img.style.opacity = '1';
    img.src = ''; 
  } finally {
    
    btn.disabled = false;
    btn.innerText = 'Show Another Cat';
  }
}


btn.addEventListener('click', get_new_cat);


get_new_cat();
