class Nota{
    constructor(titulo, descripcion){
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

class Interfaz{
    agregarNota(){
        let notas = JSON.parse(localStorage.getItem('notas'));
        let mostrarNotas = document.getElementById('notas');

        mostrarNotas.innerHTML = '';
        if (notas != null) {
            for (let i = 0; i < notas.length; i++) {
                let titulo = notas[i].titulo;
                let descripcion = notas[i].descripcion;
    
                mostrarNotas.innerHTML += `
                <div class = "card mb-4">
                    <div class= "card-body">
                        <strong>Titulo: </strong>${titulo}<br>
                        <strong>descripcion: </strong>${descripcion}<br><br>
                        <a href="#" class= "btn btn-danger" onclick = "new Interfaz().eliminarNota('${titulo}')">Eliminar</a>
                    </div>
                </div>`
            } 
        } 
    }

    resetear(){
        document.getElementById('formulario').reset();
    }

    eliminarNota(titulo){
        let notas = JSON.parse(localStorage.getItem('notas'));
        for (let i = 0; i < notas.length; i++) {
            if(notas[i].titulo == titulo){
                notas.splice(i,1); 
            }
        }
        localStorage.setItem('notas', JSON.stringify(notas));
        this.agregarNota();
        this.mostrarMesaje('Nota eliminada satisfactoriamente', 'info');
    }

    mostrarMesaje(mensaje, claseCss){
        const div = document.createElement('div');
        div.className =`alert mt-2 alert-${claseCss}`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    } 
}

document.getElementById('formulario').addEventListener('submit', function(e) {
    let titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value

    const interfaz = new Interfaz();
    if (titulo === "" || descripcion === "") {
        interfaz.mostrarMesaje('No se pudo crear la nota, por favor, llene los campos', 'danger');
    } else {
        let notas = JSON.parse(localStorage.getItem('notas'));

        if (notas != null) {
            for (let i = 0; i < notas.length; i++) {
                if(notas[i].titulo == titulo){
                    titulo = document.getElementById('titulo').value;
                    titulo = titulo + ' ' + (i+1);
                }
            }
        }

        const nota = new Nota(titulo, descripcion);

        if (localStorage.getItem('notas') === null) {
            let notas = [];
            notas.push(nota);
            localStorage.setItem('notas', JSON.stringify(notas))
        } else {
            let notas = JSON.parse(localStorage.getItem('notas'));
            notas.push(nota);
            localStorage.setItem('notas', JSON.stringify(notas));
        }

        interfaz.resetear();
        interfaz.agregarNota();
        interfaz.mostrarMesaje('Nota creada satisfactoriamente', 'success');
    }
    

    e.preventDefault();
});

window.addEventListener('load', function () {
    new Interfaz().agregarNota();
});
