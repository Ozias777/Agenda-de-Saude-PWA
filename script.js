document.addEventListener("DOMContentLoaded", function() {
    const consultForm = document.getElementById("consultForm");
    const consultTableBody = document.querySelector("#consultations tbody");
    const medForm = document.getElementById("medicineForm");
    const medTableBody = document.querySelector("#medications tbody");

    // Carregar dados salvos ao carregar a página
    loadSavedData();

    consultForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const doctorName = document.getElementById("doctorName").value;
        const consultDate = document.getElementById("consultDate").value;
        const consultTime = document.getElementById("consultTime").value;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${doctorName}</td>
            <td>${consultDate}</td>
            <td>${consultTime}</td>
        `;
        consultTableBody.appendChild(newRow);

        // Salvar a consulta no localStorage
        saveConsultation(doctorName, consultDate, consultTime);

        // Agendar notificação para 30 minutos antes da consulta
        scheduleNotification(doctorName, consultDate, consultTime);

        // Limpar os campos do formulário após adicionar a consulta
        consultForm.reset();
    });

    medForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const medicineName = document.getElementById("medicineName").value;
        const medDate = document.getElementById("medicineDate").value;
        const medTime = document.getElementById("medicineTime").value;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${medicineName}</td>
            <td>${medDate}</td>
            <td>${medTime}</td>
        `;
        medTableBody.appendChild(newRow);

        // Salvar o medicamento no localStorage
        saveMedication(medicineName, medDate, medTime);

        // Agendar notificação para 30 minutos antes do medicamento
        scheduleNotification(medicineName, medDate, medTime);

        // Limpar os campos do formulário após adicionar o medicamento
        medForm.reset();
    });

    function saveConsultation(doctor, date, time) {
        let consultations = JSON.parse(localStorage.getItem("consultations")) || [];
        consultations.push({ doctor, date, time });
        localStorage.setItem("consultations", JSON.stringify(consultations));
    }

    function saveMedication(medicine, date, time) {
        let medications = JSON.parse(localStorage.getItem("medications")) || [];
        medications.push({ medicine, date, time });
        localStorage.setItem("medications", JSON.stringify(medications));
    }

    function loadSavedData() {
        const savedConsultations = JSON.parse(localStorage.getItem("consultations")) || [];
        const savedMedications = JSON.parse(localStorage.getItem("medications")) || [];

        savedConsultations.forEach(consult => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${consult.doctor}</td>
                <td>${consult.date}</td>
                <td>${consult.time}</td>
            `;
            consultTableBody.appendChild(newRow);

            // Agendar notificação para consultas já salvas
            scheduleNotification(consult.doctor, consult.date, consult.time);
        });

        savedMedications.forEach(med => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${med.medicine}</td>
                <td>${med.date}</td>
                <td>${med.time}</td>
            `;
            medTableBody.appendChild(newRow);

            // Agendar notificação para medicamentos já salvos
            scheduleNotification(med.medicine, med.date, med.time);
        });
    }

    function scheduleNotification(name, date, time) {
        const dateTime = new Date(`${date}T${time}:00`).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = dateTime - currentTime;
        
        if (timeDifference > 0) {
            setTimeout(() => {
                showNotification(`Você tem uma consulta/agendamento de medicamento para ${name} em 30 minutos!`);
            }, timeDifference - (30 * 60 * 1000)); // 30 minutos antes
        }
    }

    function showNotification(message) {
        if (Notification.permission === "granted") {
            new Notification("Agenda de Saúde", {
                body: message
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Agenda de Saúde", {
                        body: message
                    });
                }
            });
        }
    }
});
