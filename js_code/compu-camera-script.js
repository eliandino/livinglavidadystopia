let stream = null;
let usingRearCamera = false;



document.getElementById('toggleCompuBtn').addEventListener('click', function () {
    // Getting the video element by id
const video = document.getElementById('videoElement');
const button = document.getElementById('toggleCompuBtn');
const swappBtn = document.getElementById('swapCameraBtn');

if (!stream) 
    {
   
//checking for browser support
    if (navigator.mediaDevices.getUserMedia) {
        //Requesting access to the camera
        navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then(function (mediaStream) {
            stream = mediaStream;
            //Display the camera feed in the video element
            video.srcObject = stream;
            video.style.display = 'block';
            button.textContent = 'Cerrar Camara';
        })
        .catch(function (error) {
            console.error('Error accessing the camera:', error);
            });
    } else {
        console.error('getUserMedia not supported on your browser');
    } 
} else {
    //Stop all tracks inthe stream to deactivate the camera
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    video.style.display = 'none';
    stream = null;
    button.textContent = 'Activar Camara';

    }
});



