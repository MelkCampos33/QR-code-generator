const download = document.querySelector('.download')
const dark = document.querySelector('.dark')
const light = document.querySelector('.light')
const qrContainer = document.querySelector('#qr-code')
const qrText = document.querySelector('.qr-text')
const shareButton = document.querySelector('.share-button')
const sizes = document.querySelector('.sizes')


// eventos de criação
dark.addEventListener('input', handleDarkColor)
light.addEventListener('input', handleLightColor)
qrText.addEventListener('input', handleQRText)
sizes.addEventListener('change', handleSize)
shareButton.addEventListener("click", handleShare);

// link padrao do QRcode
const defaultUrl = 'https://github.com/MelkCampos33'

// cores e tamanhos
let colorLight = '#fff',
    colorDark = '#000',
    text = defaultUrl,
    size = 300


// renderiza a cor preta do codigo
function handleDarkColor(event) {
    colorDark = event.target.value
    generateQRCode()
}

// renderiza a cor branca do codigo
function handleLightColor(event) {
    colorLight = event.target.value
    generateQRCode()
}

// renderiza a cor branca do codigo
function handleSize(event) {
    size = event.target.value
    generateQRCode()
}


// renderiza codigo de acordo com o texto
function handleQRText(event) {

    const value = event.target.value

    text = value

    // se caso nao for alterado usar o link padrão
    if(!value) {
        text = defaultUrl
    }

    generateQRCode()
}


async function handleShare() {
    setTimeout(async () => {

        try {
            const base64url = await resolveDataUrl()
            const blob = await (await fetch(base64url)).blob()
            const file = new File([blob], 'QRCode.png', {
                type: blob.type,
            })

            await navigator.share({
                files: [file],
                title: text,
            })
        } catch (error) {
            alert("Your browser doesn't support sharing.")
        }
    }, 100)
}


// gerando o QR code
async function generateQRCode() {

    qrContainer.innerHTML = ''

    new QRCode('qr-code', {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark
    })

    download.href = await resolveDataUrl()
}

function resolveDataUrl() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const img = document.querySelector('#qr-code img')
            if (img.currentSrc) {
                resolve(img.currentSrc)
                return
            }

            const canvas = document.querySelector('canvas')
            resolve(canvas.toDataURL())
        }, 50)
    })
}

generateQRCode()









