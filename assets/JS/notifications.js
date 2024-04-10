document.addEventListener("DOMContentLoaded", function() {
    const formularioConsulta = document.getElementById("consultForm");
    const corpoTabelaConsultas = document.querySelector("#consultations tbody");
    const formularioMedicamento = document.getElementById("medicineForm");
    const corpoTabelaMedicamentos = document.querySelector("#medications tbody");

    formularioConsulta.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nomeMedico = document.getElementById("doctorName").value;
        const dataConsulta = document.getElementById("consultDate").value;
        const horarioConsulta = document.getElementById("consultTime").value;

        adicionarConsultaNaTabela(nomeMedico, dataConsulta, horarioConsulta);
        agendarNotificacao(nomeMedico, dataConsulta, horarioConsulta);
        formularioConsulta.reset();
    });

    formularioMedicamento.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nomeMedicamento = document.getElementById("medicineName").value;
        const dataMedicamento = document.getElementById("medicineDate").value;
        const horarioMedicamento = document.getElementById("medicineTime").value;

        adicionarMedicamentoNaTabela(nomeMedicamento, dataMedicamento, horarioMedicamento);
        agendarNotificacao(nomeMedicamento, dataMedicamento, horarioMedicamento);
        formularioMedicamento.reset();
    });

    function adicionarConsultaNaTabela(nomeMedico, dataConsulta, horarioConsulta) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${nomeMedico}</td>
            <td>${dataConsulta}</td>
            <td>${horarioConsulta}</td>
        `;
        corpoTabelaConsultas.appendChild(novaLinha);
    }

    function adicionarMedicamentoNaTabela(nomeMedicamento, dataMedicamento, horarioMedicamento) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${nomeMedicamento}</td>
            <td>${dataMedicamento}</td>
            <td>${horarioMedicamento}</td>
        `;
        corpoTabelaMedicamentos.appendChild(novaLinha);
    }

    function agendarNotificacao(nome, data, horario) {
        const dataHoraConsulta = new Date(`${data}T${horario}:00`).getTime();
        const horaAtual = new Date().getTime();
        const diferencaTempo = dataHoraConsulta - horaAtual;
        
        if (diferencaTempo > 0) {
            setTimeout(() => {
                mostrarNotificacao(`Você tem uma consulta/agendamento de medicamento para ${nome} em 30 minutos!`);
            }, diferencaTempo - (30 * 60 * 1000)); // 30 minutos antes
        }
    }

    function mostrarNotificacao(mensagem) {
        if (Notification.permission === "granted") {
            new Notification("Agenda de Saúde", {
                body: mensagem
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permissao => {
                if (permissao === "granted") {
                    new Notification("Agenda de Saúde", {
                        body: mensagem
                    });
                }
            });
        }
    }
});
