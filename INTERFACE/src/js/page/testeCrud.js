// VARIAVEIS DOS INPUTS DA MODAL

const modal_input_name = document.querySelector('#modal-input-name')
const modal_input_cpf = document.querySelector('#modal-input-cpf')
const modal_input_phone = document.querySelector('#modal-input-phone')
const modal_input_city = document.querySelector('#modal-input-city')

// VARIAVEIS DOS INPUTS DA MODAL | MENSAGENS 

// TABELA DE DADOS

const data_table = document.querySelector('#data-table-body')

// CONTAINER DA MODAL

const container_modal = document.querySelector('#modal-add')

// BOTÃO DE INTERAÇÃO

const button_modal_save = document.querySelector('#button-modal-save')
const button_modal_cancel = document.getElementById('button-modal-cancel')

const button_open_modal = document.getElementById('add-client')

// ARRAY ONDE ESTÁ ARMAZENADO O CLIENT

let itens
let id

// FUNÇÃO PARA ABRIR E FECHHAR MODAL

button_modal_cancel.addEventListener('click', function() {
  container_modal.classList.remove('active')
})

// FUNÇÃO QUE ABRE A MODAL

function openModal(edit = false, index = 0) {
  container_modal.classList.add('active')

  if (edit) {

    modal_input_name.value = itens[index].nome_cliente
    modal_input_cpf.value = itens[index].cpf_cliente
    modal_input_phone.value = itens[index].telefone_cliente
    modal_input_city.value = itens[index].cidade_cliente

    id = index

  } else {

    modal_input_name.value = ''
    modal_input_cpf.value = ''
    modal_input_phone.value = ''
    modal_input_city.value = ''

  }
  
}

// FUNÇÃO PARA EDITAR UM ITEM

function editItem(index) {
  openModal(true, index)
}

// FUNÇÃO PARA DELETAR UM ITEM

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

// FUNÇÃO PARA INSERIR UM ITEM

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>
      <button class="button-data-table" onclick="editItem(${index})">
        <img src="assets/image/icon-service/editar.png" alt="">
      </button>
    </td>

    <td>
      <button class="button-data-table" onclick="deleteItem(${index})">
        <img src="assets/image/icon-service/lixo.png" alt="">
      </button>
    </td>

    <td>${item.nome_cliente}</td>
    <td>${item.cpf_cliente}</td>
    <td>${item.telefone_cliente}</td>
    <td>${item.cidade_cliente}</td>
    <td>Ativo</td>
  `
  data_table.appendChild(tr)

}

// FUNÇÃO PARA SALVAR UM CLIENT

button_modal_save.onclick = async e => {

    e.preventDefault();

    if (modal_input_name.value === '' || modal_input_cpf.value === '' || modal_input_phone.value === '' || modal_input_city.value === '') {
      return;
    }
  
    try {
      const response = await saveOrUpdateClient();
      console.log(response);
      container_modal.classList.remove('active');
      loadItens();
      id = undefined;
    } catch (error) {
      console.error('Erro ao salvar/atualizar cliente:', error);
      // Lide com o erro de forma apropriada (exibindo uma mensagem ao usuário, por exemplo)
    }
  };
  
  async function saveOrUpdateClient() {
    const clientData = {
      nome_cliente: modal_input_name.value,
      cpf_cliente: modal_input_cpf.value,
      telefone_cliente: modal_input_phone.value,
      cidade_cliente: modal_input_city.value,
    };
  
    if (id !== undefined) {
      // Atualizar cliente existente
      const response = await $.ajax({
        contentType: 'application/json',
        type: 'PUT', // ou 'PATCH' dependendo da sua API
        url: `http://localhost:3000/cliente/${id}`, // Substitua pela rota correta
        data: JSON.stringify(clientData),
      });
  
      // Retorne a resposta para uso posterior, se necessário
      return response;
    } else {
      // Criar novo cliente
      const response = await $.ajax({
        contentType: 'application/json',
        type: 'POST',
        url: 'http://localhost:3000/cliente',
        data: JSON.stringify(clientData),
      });
  
      // Retorne a resposta para uso posterior, se necessário
      return response;
    }
}

// ------------------------------------

function loadItens() {
  itens = getItensBD()
  data_table.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
