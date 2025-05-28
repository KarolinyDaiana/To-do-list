const URL = "http://localhost:8000/tarefa";

async function removerCard(id) {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const card = document.getElementById(id);
        card.remove();
        console.log('Card removido com sucesso');
    } else {
        console.error('Erro ao remover o card');
    }
}

async function adicionarCard(title) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, status: 'pendente' })
    });

    if (response.ok) {
        const converteAPromessa = await response.json()
        criarCard(converteAPromessa.id, converteAPromessa.title, converteAPromessa.status);
        console.log('Card adicionado com sucesso');
    } else {
        console.error('Erro ao adicionar o card');
    }
}

async function editarTitleCard(id, novoValor) {
    const response = await fetch(`${URL}/${id}/title`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: novoValor })
    });

    if (response.ok) {
        const converteAPromessa = await response.json();
        const card = document.getElementById(id);
        card.querySelector('p').innerHTML = converteAPromessa.title;
        console.log('Card editado com sucesso');
    } else {
        console.error('Erro ao editar o card');
    }
}

async function editarStatusCard(id, statusVelho) {

    const novoStatus = statusVelho === 'pendente' ? 'feito' : 'pendente';

    const response = await fetch(`${URL}/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
    });

    if (response.ok) {
        const card = document.getElementById(id);
        card.querySelector('.status-' + statusVelho).className = 'status-' + novoStatus;
        console.log('Status do card editado com sucesso');
    } else {
        console.error('Erro ao editar o status do card');
    }
}


async function carregarDados() {
    const retornoDaPromessa = await fetch(URL);
    const converteAPromessa = await retornoDaPromessa.json()
    console.log(converteAPromessa);
    for (let i = 0; i < converteAPromessa.length; i++) {
        criarCard(converteAPromessa[i].id, converteAPromessa[i].title, converteAPromessa[i].status);
    }
}

const botaoAdicionar = document.getElementById("botaoAdicionar");

botaoAdicionar.onclick = () => {
    let inputAdicionar = document.getElementById("inputAdicionar");

    if (!inputAdicionar.value) {
        alert("Digite um valor no campo de adição de novos itens!");
        return;
    } else {
        adicionarCard(inputAdicionar.value);
    }

    inputAdicionar.value = "";

    // const listaDePostagem = document.getElementById("listaDePostagem");
    // const divBotao = document.createElement('div');
    // const articleCard = document.createElement("li");
    // articleCard.innerHTML = inputAdicionar.value
    // articleCard.className = inputAdicionar.value
    // const botaoRemover = document.createElement("button");
    // botaoRemover.innerHTML = "REMOVER";
    // botaoRemover.onclick = () => {
    //     articleCard.remove();
    // };
    // const botaoEditar = document.createElement("button");
    // botaoEditar.innerHTML = "EDITAR";
    // botaoEditar.onclick = () => {
    //     const novoValor = prompt(`Digite o novo valor para o item: `);
    //     articleCard.innerText = novoValor;
    //     articleCard.className = novoValor;
    //     divBotao.appendChild(botaoRemover);
    //     divBotao.appendChild(botaoEditar);
    //     articleCard.appendChild(divBotao);
    // };
    // divBotao.appendChild(botaoRemover);
    // divBotao.appendChild(botaoEditar);
    // articleCard.appendChild(divBotao);
    // listaDePostagem.appendChild(articleCard)

};

const botaoFiltro = document.getElementById("botaoFiltro");

botaoFiltro.onclick = () => {
    const listaDePostagem = document.getElementById("listaDePostagem");
    for (let i = 0; i < listaDePostagem.childElementCount; i++) {
        const card = listaDePostagem.children[i];
        const pTexto = card.querySelector('p');
        if (!pTexto.className.includes(filtro.value)) {
            card.style.display = "none";
        } else {
            card.style.display = "";
        }
    }
}

const criarCard = (id, title, status) => {
    const listaDePostagem = document.getElementById("listaDePostagem");

        const articleCard = document.createElement("Article");
        articleCard.id = id;

        const statusDiv = document.createElement("div");
        statusDiv.className = 'status-' + status;
        statusDiv.onclick = () => {
            const statusAtual = statusDiv.className.split('-')[1];
            editarStatusCard(articleCard.id, statusAtual);
        }
        articleCard.appendChild(statusDiv);

        const pTexto = document.createElement("p");
        pTexto.innerHTML = title;
        pTexto.className = title;
        articleCard.appendChild(pTexto);

        const divBotao = document.createElement("div");
        divBotao.className = 'buttons';

        const botaoRemover = document.createElement("button");
        botaoRemover.className = 'remover';
        botaoRemover.innerHTML = "REMOVER";
        botaoRemover.onclick = () => {
            removerCard(articleCard.id)
        };

        const botaoEditar = document.createElement("button");
        botaoEditar.className = 'editar';
        botaoEditar.innerHTML = "EDITAR";
        botaoEditar.onclick = () => {
            const novoValor = prompt(`Digite o novo valor para o item: `);
            editarTitleCard(articleCard.id, novoValor);
        };
        divBotao.appendChild(botaoRemover);
        divBotao.appendChild(botaoEditar);
        articleCard.appendChild(divBotao);
        listaDePostagem.appendChild(articleCard);
}

carregarDados();
