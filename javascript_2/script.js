const URL = "https://jsonplaceholder.typicode.com/posts"

async function carregarDados() {
    const retornoDaPromessa = await fetch(URL);
    const converteAPromessa = await retornoDaPromessa.json()
    const listaDePostagem = document.getElementById("listaDePostagem");
    for (let i = 0; i < converteAPromessa.length; i++) {
        const tagLi = document.createElement("li");
        tagLi.innerHTML = converteAPromessa[i].title
        tagLi.className = converteAPromessa[i].title
        const botaoRemover =  document.createElement("button");
        const divBotao = document.createElement("div");
        botaoRemover.innerHTML = "REMOVER";
        botaoRemover.onclick = () => {
            tagLi.remove();
        };
        const botaoEditar =  document.createElement("button");
        botaoEditar.innerHTML = "EDITAR";
        botaoEditar.onclick = () => {
            const novoValor = prompt(`Digite o novo valor para o item: `);
            tagLi.innerText = novoValor;
            tagLi.className = novoValor;
            divBotao.appendChild(botaoRemover);
            divBotao.appendChild(botaoEditar);
            tagLi.appendChild(divBotao);
        };
        divBotao.appendChild(botaoRemover);
        divBotao.appendChild(botaoEditar);
        tagLi.appendChild(divBotao);
        listaDePostagem.appendChild(tagLi);
    }
}

const botaoAdicionar = document.getElementById("botaoAdicionar");

botaoAdicionar.onclick = () => {
    let inputAdicionar = document.getElementById("inputAdicionar");

    if (!inputAdicionar.value) {
        alert("Digite um valor no campo de adição de novos itens!");
        return;
    }

    const listaDePostagem = document.getElementById("listaDePostagem");
    const divBotao = document.createElement('div');
    const tagLi = document.createElement("li");
    tagLi.innerHTML = inputAdicionar.value
    tagLi.className = inputAdicionar.value
    const botaoRemover =  document.createElement("button");
    botaoRemover.innerHTML = "REMOVER";
    botaoRemover.onclick = () => {
        tagLi.remove();
    };
    const botaoEditar =  document.createElement("button");
    botaoEditar.innerHTML = "EDITAR";
    botaoEditar.onclick = () => {
        const novoValor = prompt(`Digite o novo valor para o item: `);
        tagLi.innerText = novoValor;
        tagLi.className = novoValor;
        divBotao.appendChild(botaoRemover);
        divBotao.appendChild(botaoEditar);
        tagLi.appendChild(divBotao);
    };
    divBotao.appendChild(botaoRemover);
    divBotao.appendChild(botaoEditar);
    tagLi.appendChild(divBotao);
    listaDePostagem.appendChild(tagLi)

};

const botaoFiltro = document.getElementById("botaoFiltro");

botaoFiltro.onclick = () => {
    const listaDePostagem = document.getElementById("listaDePostagem");
    for (let i = 0; i < listaDePostagem.childElementCount; i++) {
        const elemento = listaDePostagem.children[i];
        if (!elemento.className.includes(filtro.value)) {
            elemento.style.display = "none";
        } else {
            elemento.style.display = "flex";
        }
    }
}

carregarDados();