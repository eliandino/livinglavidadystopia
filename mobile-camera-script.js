let stream = null;
let usingRearCamera = false;

document.getElementById('toggleMobileCameraBtn').addEventListener('click', function() {
    const video = document.getElementById('videoElement');
    const toggleButton = document.getElementById('toggleMobileCameraBtn');
    const swapButton = document.getElementById('swapCameraButton');

    if (!stream) {
        activateCamera();
    } else {
        deactivateCamera();
    }

    function activateCamera() {
        // Checking for browser support
        if (navigator.mediaDevices.getUserMedia) {
            // Requesting access to the camera
            navigator.mediaDevices.getUserMedia({
                video: { facingMode: usingRearCamera ? 'environment' : 'user' }
            })
            .then(function (mediaStream) {
                stream = mediaStream;
                // Display the camera feed in the video element
                video.srcObject = stream;
                video.style.display = 'block';
                toggleButton.textContent = 'Deactivate Camera';
                swapButton.style.display = 'inline';
            })
            .catch(function (error) {
                console.error('Error accessing the camera:', error);
            });
        } else {
            console.error('getUserMedia not supported on your browser');
        }
    }

    function deactivateCamera() {
        // Stop all tracks in the stream to deactivate the camera
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        video.style.display = 'none';
        stream = null;
        toggleButton.textContent = 'Activate Camera';
        swapButton.style.display = 'none';
    }
});

document.getElementById('swapCameraButton').addEventListener('click', function() {
    usingRearCamera = !usingRearCamera;
    if (stream) {
        deactivateCamera();
        activateCamera();
    }

    function activateCamera() {
        // Requesting access to the camera
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: usingRearCamera ? 'environment' : 'user' }
        })
        .then(function (mediaStream) {
            stream = mediaStream;
            // Display the camera feed in the video element
            const video = document.getElementById('videoElement');
            video.srcObject = stream;
            video.style.display = 'block';
        })
        .catch(function (error) {
            console.error('Error accessing the camera:', error);
        });
    }

    function deactivateCamera() {
        // Stop all tracks in the stream to deactivate the camera
        stream.getTracks().forEach(track => track.stop());
        const video = document.getElementById('videoElement');
        video.srcObject = null;
        video.style.display = 'none';
        stream = null;
    }
});
