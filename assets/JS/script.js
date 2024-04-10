document.addEventListener("DOMContentLoaded", function() {
    const formularioConsulta = document.getElementById("consultForm");
    const corpoTabelaConsultas = document.querySelector("#consultations tbody");
    const formularioMedicamento = document.getElementById("medicineForm");
    const corpoTabelaMedicamentos = document.querySelector("#medications tbody");

    // Carregar dados salvos ao carregar a página
    carregarDadosSalvos();

    formularioConsulta.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nomeMedico = document.getElementById("doctorName").value;
        const dataConsulta = document.getElementById("consultDate").value;
        const horaConsulta = document.getElementById("consultTime").value;

        // Salvar a consulta no localStorage
        salvarConsulta(nomeMedico, dataConsulta, horaConsulta);

        // Atualizar a tabela de consultas
        atualizarTabelaConsultas();

        // Limpar os campos do formulário após adicionar a consulta
        formularioConsulta.reset();
    });

    formularioMedicamento.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nomeMedicamento = document.getElementById("medicineName").value;
        const dataMedicamento = document.getElementById("medicineDate").value;
        const horaMedicamento = document.getElementById("medicineTime").value;

        // Salvar o medicamento no localStorage
        salvarMedicamento(nomeMedicamento, dataMedicamento, horaMedicamento);

        // Atualizar a tabela de medicamentos
        atualizarTabelaMedicamentos();

        // Limpar os campos do formulário após adicionar o medicamento
        formularioMedicamento.reset();
    });

    function salvarConsulta(medico, data, hora) {
        let consultas = JSON.parse(localStorage.getItem("consultas")) || [];
        consultas.push({ medico, data, hora });
        localStorage.setItem("consultas", JSON.stringify(consultas));
    }

    function salvarMedicamento(medicamento, data, hora) {
        let medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
        medicamentos.push({ medicamento, data, hora });
        localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
    }

    function carregarDadosSalvos() {
        atualizarTabelaConsultas();
        atualizarTabelaMedicamentos();
    }

    function atualizarTabelaConsultas() {
        corpoTabelaConsultas.innerHTML = ""; // Limpar a tabela antes de atualizar

        const consultasSalvas = JSON.parse(localStorage.getItem("consultas")) || [];
        consultasSalvas.forEach(consulta => {
            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${consulta.medico}</td>
                <td>${consulta.data}</td>
                <td>${consulta.hora}</td>
            `;
            corpoTabelaConsultas.appendChild(novaLinha);
        });
    }

    function atualizarTabelaMedicamentos() {
        corpoTabelaMedicamentos.innerHTML = ""; // Limpar a tabela antes de atualizar

        const medicamentosSalvos = JSON.parse(localStorage.getItem("medicamentos")) || [];
        medicamentosSalvos.forEach(medicamento => {
            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${medicamento.medicamento}</td>
                <td>${medicamento.data}</td>
                <td>${medicamento.hora}</td>
            `;
            corpoTabelaMedicamentos.appendChild(novaLinha);
        });
    }
});
