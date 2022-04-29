function onJson(json) {
    console.log(json);
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    const img = document.createElement('img');
    img.src = json.message;
    library.appendChild(img);
}

  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search(event)
  {
    event.preventDefault();
    rest_url = 'https://dog.ceo/api/breeds/image/random';
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse).then(onJson);
  }
  
  const button = document.querySelector('#cerca');
  button.addEventListener('click', search);

  const form = document.querySelector('#form1');
  form.addEventListener('submit', search2);

  function onTokenResponse(response)
{
  return response.json();
}

const email = 'undercover07@telegmail.com';
const password = encodeURIComponent('nogreni666');

let token_data;
fetch('https://kitsu.io/api/oauth/token',{
    method:'POST',
    body:'grant_type=password&username='+email+'&password='+password,
    headers:{ 
        'Content-Type':'application/x-www-form-urlencoded'
    }
}).then(onTokenResponse).then(getToken);

function onTokenResponse(response){
    return response.json();
}

function getToken(token){
  token_data=token;
  console.log(token);
}

function search2(event){
  event.preventDefault();
  const box = document.querySelector("#anime");
  console.log(box);
  const box_value = encodeURIComponent(box.value);
  console.log('Sto cercando: ' + box_value);
  fetch('https://kitsu.io/api/edge/anime?filter[text]'+ box_value,{
                headers: {
                    'Accept':'application/vnd.api+json',
                    'Authorization':token_data.token_type + '' + token_data.access_token,
                    'Content-Type':'application/x-wwwform-urlencoded'
                }
            }).then(onResponse).then(onJsonAnime);

}

function onJsonAnime(json) {
  console.log('JSON ricevuto');
    console.log(json);

    const library = document.querySelector('#album-view1');
    library.innerHTML = '';
    
    const results = json.data;
    let num_results = results.length;
    
    if(num_results > 10)
      num_results = 10;
    
    for(let i=0; i<num_results; i++)
    {
      
      const album_data = results[i]
      
      const title = album_data.attributes.titles.ja_jp;
      const selected_image = album_data.attributes.posterImage.tiny;
      
      const album = document.createElement('div');
      album.classList.add('album');
      
      const img = document.createElement('img');
      img.src = selected_image;
      
      const caption = document.createElement('span');
      caption.textContent = title;

      const contenitore = document.createElement('div');
      contenitore.classList.add('contenitore')

      contenitore.appendChild(img);
      contenitore.appendChild(caption);
      
      album.appendChild(contenitore);

      library.appendChild(album);
    }
  }
  