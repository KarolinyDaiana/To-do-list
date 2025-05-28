const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors({
  origin: '*'
}));

let tarefa = [{id: 1, title: 'Tarefa 1', status: 'pendente'}];
let idSequence = 1;

app.get('/tarefa', (req, res) => {

    const { filter } = req.query;

    if (filter) {
        const filteredTarefas = tarefa.filter(t => t.title.includes(filter));
        res.json(filteredTarefas);
        return;
    }

    res.json(tarefa);
});

app.post('/tarefa', (req, res) => {
    const { title } = req.body;

    if (!title) {
        res.status(400).json({error: "Nome é obrigatório"});
        return;
    }

    idSequence++;
    const newTarefa = {
        id: idSequence,
        title,
        status: 'pendente'
    };

    tarefa.push(newTarefa);
    res.status(201).json(newTarefa);
})

app.put('/tarefa/:id/title', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const tarefaIndex = tarefa.findIndex(t => t.id == id);

    if (tarefaIndex === -1) {
        res.status(404).json({error: "Tarefa não encontrada"});
        return;
    }

    if (!title) {
        res.status(400).json({error: "Nome é obrigatório"});
        return;
    }

    tarefa[tarefaIndex] = { id, title, status: tarefa[tarefaIndex].status }; 
    res.json(tarefa[tarefaIndex]);
});

app.patch('/tarefa/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const tarefaIndex = tarefa.findIndex(t => t.id == id);

    if (tarefaIndex === -1) {
        res.status(404).json({error: "Tarefa não encontrada"});
        return;
    }

    if (!status) {
        res.status(400).json({error: "Status é obrigatório"});
        return;
    }

    tarefa[tarefaIndex] = { id, title: tarefa[tarefaIndex].title, status };
    res.json(tarefa[tarefaIndex]);
});

app.delete('/tarefa/:id', (req, res) => {
    const { id } = req.params;
    const tarefaIndex = tarefa.findIndex(t => t.id == id);

    if (tarefaIndex === -1) {
        res.status(404).json({error: "Tarefa não encontrada"});
        return;
    }

    tarefa.splice(tarefaIndex, 1);
    res.status(204).send();
});

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});