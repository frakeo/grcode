const wrapper = document.querySelector(".wrapper"),
      patrimonioInput = wrapper.querySelector("#patrimonio"),
      descricaoInput = wrapper.querySelector("#descricao"),
      localInput = wrapper.querySelector("#local"),
      responsavelInput = wrapper.querySelector("#responsavel"),
      generateBtn = wrapper.querySelector(".form button"),
      qrImg = wrapper.querySelector(".qr-code img"),
      downloadBtn = document.createElement("button"),
      patrimonioLabel = document.createElement("p");

// Configuração do botão de download
downloadBtn.innerText = "Baixar QR Code";
downloadBtn.style.display = "none";
downloadBtn.addEventListener("click", () => {
    window.open(qrImg.src, "_blank");
});

// Configuração do texto do patrimônio
patrimonioLabel.style.display = "none";
patrimonioLabel.style.textAlign = "center";
patrimonioLabel.style.fontWeight = "bold";
patrimonioLabel.style.marginTop = "10px";

wrapper.appendChild(qrImg);
wrapper.appendChild(patrimonioLabel);
wrapper.appendChild(downloadBtn);

function removeAccents(str) {
    const accentsMap = {
        'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a', 'á': 'a', 'å': 'a', 'æ': 'ae',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ç': 'c', 'ñ': 'n', 'ý': 'y', 'ÿ': 'y'
    };
    return str.split('').map(char => accentsMap[char] || char).join('');
}

generateBtn.addEventListener("click", () => {
    // Coleta os valores dos campos
    let patrimonio = removeAccents(patrimonioInput.value),
        descricao = removeAccents(descricaoInput.value),
        local = removeAccents(localInput.value),
        responsavel = removeAccents(responsavelInput.value);

    // Verifica se todos os campos foram preenchidos
    if (!patrimonio || !descricao || !local || !responsavel) return alert("Preencha todos os campos!");

    // Concatena as informações
    let qrValue = `Patrimonio: ${patrimonio} | Descricao: ${descricao} | Local: ${local} | Responsavel: ${responsavel}`;

    // Altera o texto do botão enquanto o QR Code está sendo gerado
    generateBtn.innerText = "Gerando Qr Code...";

    // Gera o QR Code com as informações concatenadas
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(qrValue)}&color=1e0ec0`;

    qrImg.addEventListener("load", () => {
        generateBtn.innerText = "Gerar Qr Code";
        wrapper.classList.add("active");
        downloadBtn.style.display = "block";
        patrimonioLabel.innerText = `Patrimônio: ${patrimonio}`;
        patrimonioLabel.style.display = "block";

        // Limpa os campos após gerar o QR Code
        patrimonioInput.value = "";
        descricaoInput.value = "";
        localInput.value = "";
        responsavelInput.value = "";
    });
});

patrimonioInput.addEventListener("keyup", checkInputs);
descricaoInput.addEventListener("keyup", checkInputs);
localInput.addEventListener("keyup", checkInputs);
responsavelInput.addEventListener("keyup", checkInputs);

function checkInputs() {
    if (!patrimonioInput.value || !descricaoInput.value || !localInput.value || !responsavelInput.value) {
        wrapper.classList.remove("active");
        downloadBtn.style.display = "none";
        patrimonioLabel.style.display = "none";
    }
}