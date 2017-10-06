
var form = document.getElementById('file-form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');

// Create the XHR object.
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
	// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
	// CORS not supported.
		xhr = null;
	}
	return xhr;
}

form.onsubmit = function(event) {
	event.preventDefault();

  	// Update button text.
  	uploadButton.innerHTML = 'Uploading...';

  	// Get the selected files from the input.
	var files = fileSelect.files;

	// Create a new FormData object.
	var formData = new FormData();

	var file = files[0];
	console.log(file)
	
	// Add the file to the request.
  	formData.append('image', file, file.name);

  	// Set up the request.
	//var xhr = new XMLHttpRequest();
	var url = 'http://46.39.242.114:5577/';
	var xhr = createCORSRequest('POST', url);

	// Set up a handler for when the request finishes.
	xhr.onload = function () {
	 	if (xhr.status === 200) {
	    // File(s) uploaded.
	    uploadButton.innerHTML = 'Uploaded';
	  	} else {
	    	alert('An error occurred!');
	  	}
	};

	// Send the Data.
	xhr.send(formData);
}