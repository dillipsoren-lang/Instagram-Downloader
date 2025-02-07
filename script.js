function fetchMedia() {
    const url = document.getElementById('instaUrl').value;
    if (!url) {
        alert("Please enter a valid Instagram URL");
        return;
    }

    fetch(`http://localhost:5000/download?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            if (data.mediaUrl) {
                document.getElementById('mediaPreview').innerHTML = `<img src="${data.mediaUrl}" alt="Media Preview">`;
                document.getElementById('downloadBtn').href = data.mediaUrl;
                document.getElementById('downloadBtn').style.display = 'inline-block';
            } else {
                alert("No media found.");
            }
        })
        .catch(error => console.error("Error fetching media:", error));
}

function refreshPage() {
    document.getElementById('instaUrl').value = '';
    document.getElementById('mediaPreview').innerHTML = '';
    document.getElementById('downloadBtn').style.display = 'none';
}
