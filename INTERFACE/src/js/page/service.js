
$(function() {
  //alert('asd')

//$('#').click(function(){

function loadTable(){
  $.ajax({
    type: 'GET',
    async: false,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: 'http://127.0.0.1:3000/cliente',
    // data: JSON.stringify({nome:'', email:'', telefone:'', endereco:'', cidade:'', estado:'', cep:''}),
    success: (response) => {
      // o response vai conter o retorno do servidor
      //aqui dentro do fazer o que quiser com o retorno
      console.log(response)

      const itens=response.clientes

      let html = ''


      itens.forEach((item, index) => {
        html+=`
        <tr>
        <td>
        <button type="button" class="button-data-table" data-edit="${item.id}">
          <img src="assets/image/icon-service/editar.png" alt="">
        </button>
      </td>
  
      <td>
        <button type="button" class="button-data-table" data-delete="${item.id}">
          <img src="assets/image/icon-service/lixo.png" alt="">
        </button>
      </td>
  
      <td>${item.nome_cliente}</td>
      <td>${item.classificacao}</td>
      <td>${item.cpf_cliente}</td>
      <td>${item.telefone_cliente}</td>
      <td>${item.cidade_cliente}</td>
      <td>Ativo</td>
      </tr>
        `
      })

      $('#data-table-body').html(html)

    },
    error: ()=> {
      //ele só caira aqui se acpnatecer algum erro na chamada
      console.log('error')
         }
      }); 
}

function loadClassificacao(){
  $.ajax({
    type: 'GET',
    async: false,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: 'http://127.0.0.1:3000/routClassicacao',
    // data: JSON.stringify({nome:'', email:'', telefone:'', endereco:'', cidade:'', estado:'', cep:''}),
    success: (response) => {
      // o response vai conter o retorno do servidor
      //aqui dentro do fazer o que quiser com o retorno
      console.log(response)

      const itens=response.classificacao

      let html="<option>selecione</option>"

      itens.forEach((item, index) => {
        html+=`<option value=${item.id}>${item.name}</option>`
      })

      $('#modal-select-class').html(html)


      // modal-select-class
    },
    error: ()=> {
      //ele só caira aqui se acpnatecer algum erro na chamada
      console.log('error')
         }
      }); 
}

$("#button-modal-save").click(function() {
  const name = $("#modal-input-name").val()
  const cpf = $("#modal-input-cpf").val()
  const phone = $("#modal-input-phone").val()
  const city = $("#modal-input-city").val()
  const select = $("#modal-select-class").val()

  const id = $("#modal-input-hidden").val()
  
  if (name == '' || cpf == '' || phone == '' || city == '' || select == '') {
    console.log('Teste')
    
    return
  }

  let data = {  
    nome_cliente: name,
    cpf_cliente: cpf,
    telefone_cliente: phone,
    cidade_cliente: city,
    fk_classificacao: select,
  }

   if (parseInt(id, 10)) {
      const status = $("#modal-select-status").val() == 'true'
      
      data.status = status

      console.log('Teste ID', id)

      $.ajax({
        type: 'PUT',
        async: false,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: `http://127.0.0.1:3000/cliente/${id}`,
        data: JSON.stringify(data),
        success: (response) => {
        },
        error: (e)=> {
          console.log(e)
          //ele só caira aqui se acpnatecer algum erro na chamada
          console.log('error  ao salvar o cliente')
             },
      complete:()=> {

        loadTable()
        $("#modal-add").removeClass('active')
        
        $("#modal-select-class option:first").prop('selected', true)
      }
        }); 
      
   }

   else{
      $.ajax({
        type: 'POST',
        async: true,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: `http://127.0.0.1:3000/cliente`,
        data: JSON.stringify(data),
        complete: (response) => {
      loadTable()
      $("#modal-add").removeClass('active')
      
      $("#modal-select-class option:first").prop('selected', true)
        },
        error: (e)=> {
          console.log(e)
          //ele só caira aqui se acpnatecer algum erro na chamada
          console.log('error  ao salvar o cliente')
             }
        }); 
   }
})

// ------------------------------------

$('#data-table-body').on('click', 'button[data-edit]', function(){
  const id = $(this).data('edit')

  $.ajax({
    type: 'GET',
    async: false,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: `http://127.0.0.1:3000/cliente/${id}`,


    // data: JSON.stringify({nome:'', email:'', telefone:'', endereco:'', cidade:'', estado:'', cep:''}),
    success: (response) => {
      console.log(response)

      const cliente = response.cliente

      $("#modal-input-name").val(cliente.nome_cliente)
      $("#modal-input-cpf").val(cliente.cpf_cliente)
      $("#modal-input-phone").val(cliente.telefone_cliente)
      $("#modal-input-city").val(cliente.cidade_cliente)
      $("#modal-select-class").val(cliente.fk_classificacao)
      $("#modal-input-hidden").val(cliente.id)
      $("#modal-select-status").val(cliente.status?'true':'false')
      
  $('#div-status').show()

      $("#modal-add").addClass('active')
      
    },
    error: ()=> {
      //ele só caira aqui se acpnatecer algum erro na chamada
      console.log('error')
         }
      }); 
})

$('#data-table-body').on('click', 'button[data-delete]', function(){
  const id = $(this).data('delete')

  $.ajax({
    type: 'DELETE',
    async: false,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: `http://127.0.0.1:3000/cliente/${id}`,


    // data: JSON.stringify({nome:'', email:'', telefone:'', endereco:'', cidade:'', estado:'', cep:''}),
    complete: (response) => {
      loadTable()
      
    },
    error: ()=> {
      //ele só caira aqui se acpnatecer algum erro na chamada
      console.log('error')
         }
      }); 
})

$('#new-client').click(function(){

  $('#form-client')[0].reset()
  $('#modal-input-hidden').val('')
  $('#div-status').hide()
  $("#modal-add").addClass('active')
})

$('#button-modal-cancel').click(function(){
  $("#modal-add").removeClass('active')
})



//})

loadTable()
loadClassificacao()

})
