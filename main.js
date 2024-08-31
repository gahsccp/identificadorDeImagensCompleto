// Selecionar elementos do DOM
const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
const recognizeButton = document.getElementById('recognizeButton');
const resultDiv = document.getElementById('result');
let model;

// Carregar o modelo MobileNet
async function loadModel() {
    try {
        model = await mobilenet.load();
        console.log('Modelo carregado');
    } catch (error) {
        console.error('Erro ao carregar o modelo:', error);
    }
}

// Ler a imagem carregada pelo usuário
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Reconhecer a imagem
recognizeButton.addEventListener('click', async () => {
    if (uploadedImage.src && model) {
        try {
            const predictions = await model.classify(uploadedImage);
            resultDiv.innerText = `Previsão: ${predictions[0].className} \nProbabilidade: ${predictions[0].probability.toFixed(4)}`;
        } catch (error) {
            console.error('Erro ao classificar a imagem:', error);
            resultDiv.innerText = 'Erro ao classificar a imagem. Por favor, tente novamente.';
        }
    } else {
        resultDiv.innerText = 'Por favor, carregue uma imagem primeiro.';
    }
});

// Carregar o modelo ao iniciar a página
loadModel();