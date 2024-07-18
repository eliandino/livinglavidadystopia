// function onScanSuccess(decodedText, decodedResult) {
//     console.log(`Code matched = ${decodedText}`, decodedResult);
//     document.getElementById('video-source').src = decodedText;
//     document.getElementById('video-container').style.display = 'block';
//     document.getElementById('video-player').load();
// }

// function onScanFailure(error) {
//     // Handle scan failure, usually better to ignore and keep scanning.
//     console.warn(`Code scan error = ${error}`);
// }

// let html5QrcodeScanner = new Html5QrcodeScanner(
//     "qr-reader", 
//     { fps: 10, qrbox: 250 },
//     /* verbose= */ false
// );
// html5QrcodeScanner.render(onScanSuccess, onScanFailure);

document.getElementById('playButton').addEventListener('click', function () {
    document.getElementById('vid').play();
});