var formulario = document.querySelector('form')

formulario.addEventListener('submit', function(e){

  // Bloqueia o refresh da pagina
  e.preventDefault()

  // Url da pesquisa
  let urlForm = "https://pokeapi.co/api/v2/pokemon/"

  // Valor do input Name
  let nome = document.getElementById('name')

  // Concatena a url com inputname
  urlForm = urlForm + this.name.value

  // Transforma os valores em minusculas
  urlForm = urlForm.toLocaleLowerCase()

  // ID Content
  let resposta = document.getElementById('content')

  // ID ImgPokemon
  let imagem = document.getElementById('imgPokemon')

  // Resposta em HTML
  let html = ''

  fetch(urlForm)
    .then(resposta => resposta.json())
    .then(function (data) {
      console.log(data)
      html = 'Nome: ' + maiuscula(data.name) + '<br>'
      html = html + 'Tipo: ' + maiuscula(data.types[0].type.name)
      resposta.innerHTML = html

      imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
    })
    .catch(function (err) {
      if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
        html = 'Pokémon não encontrado!'
      } else {
        html = 'Erro: ' + err
      }
      resposta.innerHTML = html
    })
});

function maiuscula(val){
  return val[0].toUpperCase() + val.substr(1)
}