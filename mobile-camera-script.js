// let stream = null;
// let usingRearCamera = false;

// document.getElementById('toggleMobileBtn').addEventListener('click', function() {
//     const video = document.getElementById('videoElement');
//     const toggleButton = document.getElementById('toggleMobileBtn');
//     const swapButton = document.getElementById('swapCameraBtn');

//     if (!stream) {
//         activateCamera();
//     } else {
//         deactivateCamera();
//     }

//     function activateCamera() {
//         // Checking for browser support
//         if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//             // Requesting access to the camera
//             navigator.mediaDevices.getUserMedia({
//                 video: { facingMode: usingRearCamera ? 'environment' : 'user' }
//             })
//             .then(function (mediaStream) {
//                 stream = mediaStream;
//                 // Display the camera feed in the video element
//                 video.srcObject = stream;
//                 video.style.display = 'block';
//                 toggleButton.textContent = 'Deactivate Camera';
//                 swapButton.style.display = 'inline';
//             })
//             .catch(function (error) {
//                 console.error('Error accessing the camera:', error);
//             });
//         } else {
//             console.error('getUserMedia not supported on your browser');
//         }
//     }

//     function deactivateCamera() {
//         // Stop all tracks in the stream to deactivate the camera
//         stream.getTracks().forEach(track => track.stop());
//         video.srcObject = null;
//         video.style.display = 'none';
//         stream = null;
//         toggleButton.textContent = 'Activate Mobile Camera';
//         swapButton.style.display = 'none';
//     }
// });

// document.getElementById('swapCameraBtn').addEventListener('click', function() {
//     usingRearCamera = !usingRearCamera;
//     if (stream) {
//         deactivateCamera();
//         activateCamera();
//     }
// });


document.getElementById('toggleMobileBtn').addEventListener('click', function() {
    const constraints = {
        video: {
            facingMode: { exact: "environment" }
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            const videoElement = document.getElementById('videoElement');
            videoElement.srcObject = stream;
            videoElement.style.display = 'block';
        })
        .catch(function(error) {
            console.error('Error accessing the camera: ', error);
        });
});
