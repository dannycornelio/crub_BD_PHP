const formulario = document.querySelector('form')
const tablaCLientes = document.getElementById('tablaCLientes');
const btnBuscar = document.getElementById('btnBuscar');
const btnModificar = document.getElementById('btnModificar');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const divTabla = document.getElementById('divTabla');

btnModificar.disabled = true
btnModificar.parentElement.style.display = 'none'
btnCancelar.disabled = true
btnCancelar.parentElement.style.display = 'none'

const guardar = async (evento) => {
    evento.preventDefault();
    if(!validarFormulario(formulario, ['cliente_id'])){
        alert('Debe llenar todos los campos');
        return 
    }

    const body = new FormData(formulario)
    body.append('tipo', 1)
    body.delete('cliente_id')
    const url = '/crudphp18may2023/controladores/clientes/index.php';
    const config = {
        method : 'POST',
        body
    }

    try {
        const respuesta = await fetch(url, config)
        const data = await respuesta.json();
        
        const {codigo, mensaje,detalle} = data;

        switch (codigo) {
            case 1:
                formulario.reset();
                buscar();
                break;
        
            case 0:
                console.log(detalle)
                break;
        
            default:
                break;
        }

        alert(mensaje);

    } catch (error) {
        console.log(error);
    }
}

const buscar = async () => {

    let cliente_nombre = formulario.cliente_nombre.value;
    let cliente_nit = formulario.cliente_nit.value;
    const url = `/crudphp18may2023/controladores/clientes/index.php?cliente_nombre=${cliente_nombre}&cliente_nit=${cliente_nit}`;
    const config = {
        method : 'GET'
    }

    try {
        const respuesta = await fetch(url, config)
        const data = await respuesta.json();
        
        tablaCLientes.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment();
        console.log(data);
        if(data.length > 0){
            let contador = 1;
            data.forEach( cliente => {
                // CREAMOS ELEMENTOS
                const tr = document.createElement('tr');
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                const td3 = document.createElement('td')
                const td4 = document.createElement('td')
                const td5 = document.createElement('td')
                const buttonModificar = document.createElement('button')
                const buttonEliminar = document.createElement('button')

                // CARACTERISTICAS A LOS ELEMENTOS
                buttonModificar.classList.add('btn', 'btn-warning')
                buttonEliminar.classList.add('btn', 'btn-danger')
                buttonModificar.textContent = 'Modificar'
                buttonEliminar.textContent = 'Eliminar'

                buttonModificar.addEventListener('click', () => colocarDatos(cliente))
                buttonEliminar.addEventListener('click', () => eliminar(cliente.CLIENTE_ID))
                console.log(cliente.cliente_id);

                td1.innerText = contador;
                td2.innerText = cliente.CLIENTE_NOMBRE;
                td3.innerText = cliente.CLIENTE_NIT;
                
                
                // ESTRUCTURANDO DOM
                td4.appendChild(buttonModificar)
                td5.appendChild(buttonEliminar)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)

                fragment.appendChild(tr);

                contador++;
            })
        }else{
            const tr = document.createElement('tr');
            const td = document.createElement('td')
            td.innerText = 'No existen registros'
            td.colSpan = 5
            tr.appendChild(td)
            fragment.appendChild(tr);
        }

        tablaCLientes.tBodies[0].appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}

const colocarDatos = (datos) => {
    formulario.cliente_nombre.value = datos.CLIENTE_NOMBRE
    formulario.cliente_nit.value = datos.CLIENTE_NIT
    formulario.cliente_id.value = datos.CLIENTE_ID

    btnGuardar.disabled = true
    btnGuardar.parentElement.style.display = 'none'
    btnBuscar.disabled = true
    btnBuscar.parentElement.style.display = 'none'
    btnModificar.disabled = false
    btnModificar.parentElement.style.display = ''
    btnCancelar.disabled = false
    btnCancelar.parentElement.style.display = ''
    divTabla.style.display = 'none'
}

const cancelarAccion = () => {
    btnGuardar.disabled = false
    btnGuardar.parentElement.style.display = ''
    btnBuscar.disabled = false
    btnBuscar.parentElement.style.display = ''
    btnModificar.disabled = true
    btnModificar.parentElement.style.display = 'none'
    btnCancelar.disabled = true
    btnCancelar.parentElement.style.display = 'none'
    divTabla.style.display = ''
}


const eliminar = async (id) => {
    if(confirm("¿Desea eliminar este cliente?")){
        
        const url = `/crudphp18may2023/controladores/clientes/index.php?tipo=1&cliente_id=${id}`;
        const config = {
            method : 'GET'
        }

        try {
            const respuesta = await fetch(url, config)
            const data = await respuesta.json();
            
            const {codigo, mensaje, detalle} = data;

            switch (codigo) {
                case 1:
                    buscar();
                    break;
            
                case 0:
                    console.log(detalle, mensaje)
                    break;
            
                default:
                    break;
            }

            alert(mensaje);

            } catch (error) {
                console.log(error);
            }
        }
    }


    const modificar = async (e) => {
        e.preventDefault();
        if(!validarFormulario(formulario)){
            alert('Debe llenar todos los campos');
            return 
        }
    
        const body = new FormData(formulario)
        body.append('tipo', 2)
        const url = '/crudphp18may2023/controladores/clientes/index.php';
        const config = {
            method : 'POST',
            body
        }
    
        try {
            const respuesta = await fetch(url, config)
            const data = await respuesta.json();
            
            const {codigo, mensaje, detalle} = data;
    
            switch (codigo) {
                case 1:
                    formulario.reset();
                    buscar();
                    break;
            
                case 0:
                    console.log(detalle)
                    break;
            
                default:
                    break;
            }
    
            alert(mensaje);
    
        } catch (error) {
            console.log(error);
        }
    }


buscar();

formulario.addEventListener('submit', guardar )
btnModificar.addEventListener('click', modificar)
btnBuscar.addEventListener('click', buscar)
btnCancelar.addEventListener('click', cancelarAccion)