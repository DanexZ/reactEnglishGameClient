export const checkPermissions = () => {
    navigator.mediaDevices.getUserMedia({audio: true, video: false});
}